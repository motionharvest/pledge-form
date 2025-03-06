export function reactive(obj, callback) {
  return new Proxy(obj, {
    set(target, key, value) {
      if (target[key] === value) return true;
      target[key] = value;
      callback(key, value);
      return true;
    }
  });
}

export function updateDOM(key, value) {
  const elements = document.querySelectorAll(`[data-bind="${key}"]`);
  elements.forEach(element => {
    if (
      element.tagName === 'INPUT' ||
      element.tagName === 'TEXTAREA' ||
      element.tagName === 'SELECT'
    ) {
      if (element.type === 'checkbox') {
        element.checked = Boolean(value);
      } else if (element.type === 'radio') {
        element.checked = (element.value === value);
      } else {
        element.value = value || '';
      }
    } else {
      element.textContent = value;
    }
  });

  requestAnimationFrame(updateVisibility);
  requestAnimationFrame(updateClasses);
}

function updateVisibility() {
  document.querySelectorAll('[show-if]').forEach(element => {
    const condition = element.getAttribute('show-if').trim();
    element.style.display = evaluateCondition(condition) ? '' : 'none';
  });

  // Trigger `onShow` checks after visibility updates
  requestAnimationFrame(trackOnShowElements);
}

function updateClasses() {
  document.querySelectorAll('[class-if]').forEach(element => {
    const classRules = element
      .getAttribute('class-if')
      .split(';')
      .map(rule => rule.trim());

    classRules.forEach(rule => {
      let match;
      if (rule.includes(':')) {
        const [stateKey, className] = rule.split(':').map(s => s.trim());
        match = instance.get(stateKey);
        element.classList.toggle(className, !!match);
      } else if (rule.includes('?')) {
        const [condition, classes] = rule.split('?').map(s => s.trim());
        const [trueClass, falseClass] = classes.split(':').map(s => s.trim());
        match = evaluateCondition(condition);
        element.classList.toggle(trueClass, match);
        if (falseClass) {
          element.classList.toggle(falseClass, !match);
        }
      }
    });
  });
}

function evaluateCondition(condition) {
  return condition.split(/\s*\|\|\s*/).some(orPart =>
    orPart.split(/\s*&&\s*/).every(andPart =>
      evaluateSingleCondition(andPart.trim())
    )
  );
}

function evaluateSingleCondition(condition) {
  let match = false;
  let stateKey, operator, expectedValue;
  if (condition.startsWith('!')) {
    stateKey = condition.substring(1).trim();
    match = !instance.get(stateKey);
  } else if (!/[=<>!~]/.test(condition)) {
    stateKey = condition;
    match = !!instance.get(stateKey);
  } else {
    [stateKey, operator, expectedValue] = parseCondition(condition);
    const stateValue = instance.get(stateKey.trim());
    switch (operator) {
      case '=':
        match = stateValue == expectedValue.trim();
        break;
      case '!=':
        match = stateValue != expectedValue.trim();
        break;
      case '~=':
        match =
          typeof stateValue === 'string' &&
          stateValue.includes(expectedValue.trim());
        break;
      case '>':
        match = parseFloat(stateValue) > parseFloat(expectedValue);
        break;
      case '<':
        match = parseFloat(stateValue) < parseFloat(expectedValue);
        break;
    }
  }
  return match;
}

function parseCondition(condition) {
  const match = condition.match(/([a-zA-Z0-9_]+)\s*(=|!=|~=|>|<)?\s*(.*)/);
  return match ? [match[1], match[2] || '', match[3] || ''] : [condition, '', ''];
}

function bindInputs(data) {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.type === 'radio' && target.hasAttribute('data-bind')) {
      const key = target.getAttribute('data-bind');
      data[key] = target.value;
      updateDOM(key, target.value);
      updateVisibility();
      updateClasses();
    }
  });

  document.addEventListener('change', (event) => {
    const target = event.target;
    const key = target.getAttribute('data-bind');
    if (key && target.type !== 'radio') {
      if (target.type === 'checkbox') {
        data[key] = target.checked;
      } else {
        data[key] = target.value;
      }
      updateDOM(key, target.value);
      updateVisibility();
      updateClasses();
    }
  });
}

class State {
  constructor() {
    if (!State.instance) {
      let storedData = JSON.parse(localStorage.getItem('state')) || {};
      if (!sessionStorage.getItem('initialized')) {
        storedData = {}; 
        sessionStorage.setItem('initialized', 'true');
      }
      this.data = reactive(storedData, this.updateLocalStorage.bind(this));
      bindInputs(this.data);
      State.instance = this;
      requestAnimationFrame(() => {
        Object.keys(this.data).forEach(key => updateDOM(key, this.data[key]));
        updateVisibility();
        updateClasses();
        trackOnShowElements(); // Ensure `onShow` starts tracking immediately
      });
    }
    return State.instance;
  }
  updateLocalStorage(key, value) {
    const data = { ...this.data, [key]: value };
    localStorage.setItem('state', JSON.stringify(data));
    updateDOM(key, value);
    updateVisibility();
    updateClasses();
  }
  set(properties) {
    Object.entries(properties).forEach(([key, value]) => {
      this.data[key] = value;
    });
    updateVisibility();
    updateClasses();
  }
  get(key) {
    return this.data[key];
  }
  getData() {
    return this.data;
  }
}

const instance = new State();
export default instance;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { 
      const element = entry.target;
      const onShowFn = element.getAttribute('data-onshow'); // Get function as string

      console.log(`[data-onshow] Element Became Visible:`, element);

      if (onShowFn) {
        try {
          // Convert string into function and bind to the correct scope (e.g., instance)
          const fn = new Function("element", `return (${onShowFn})(element)`).bind(instance);
          fn(element); // Call function with element as argument
        } catch (error) {
          console.error(`Error executing data-onshow function:`, error);
        }
      }
    }
  });
}, { threshold: 0.1 });




// ✅ Debugging: Ensure Elements Are Observed
function trackOnShowElements() {
  const elements = document.querySelectorAll('[data-onshow]');
  console.log(`[data-onshow] Found ${elements.length} elements to observe.`);

  elements.forEach(element => observer.observe(element));
}

// ✅ Run Tracking on Page Load
trackOnShowElements();

// ✅ Run Tracking Whenever DOM Updates
new MutationObserver(trackOnShowElements).observe(document.body, { childList: true, subtree: true });
