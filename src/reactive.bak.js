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
    // Select all elements that share the same data-bind value
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
          // Update checked state based solely on data-bind and value,
          // ignoring the native grouping via the name attribute.
          element.checked = (element.value === value);
        } else {
          element.value = value || '';
        }
      } else {
        element.textContent = value;
      }
    });
    // Update conditional elements
    requestAnimationFrame(updateVisibility);
    requestAnimationFrame(updateClasses);
  }
  
  function updateVisibility() {
    document.querySelectorAll('[show-if]').forEach(element => {
      const condition = element.getAttribute('show-if').trim();
      element.style.display = evaluateCondition(condition) ? '' : 'none';
    });
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
    // For radio buttons, listen for the "click" event.
    // This captures selection immediately.
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
    // For all other input types, use the "change" event.
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
          storedData = {}; // Reset state on first load
          sessionStorage.setItem('initialized', 'true');
        }
        this.data = reactive(storedData, this.updateLocalStorage.bind(this));
        bindInputs(this.data);
        State.instance = this;
        requestAnimationFrame(() => {
          Object.keys(this.data).forEach(key => updateDOM(key, this.data[key]));
          updateVisibility();
          updateClasses();
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
  