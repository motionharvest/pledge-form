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

export function updateVisibility() {
  document.querySelectorAll("[show-if]").forEach((element) => {
    const condition = element.getAttribute("show-if").trim();
    element.style.display = evaluateCondition(condition) ? "" : "none";
  });

  requestAnimationFrame(trackOnShowElements);
}

function updateClasses() {
  document.querySelectorAll("[class-if]").forEach((element) => {
    const classRules = element.getAttribute("class-if").split(";").map(rule => rule.trim());

    classRules.forEach(rule => {
      let match;
      if (rule.includes("?")) {
        const [condition, classes] = rule.split("?").map(s => s.trim());
        const [trueClass, falseClass] = classes.split(":").map(s => s.trim());
        match = evaluateCondition(condition);
        element.classList.toggle(trueClass, match);
        if (falseClass) {
          element.classList.toggle(falseClass, !match);
        }
      } else if (rule.includes(":")) {
        const [stateKey, className] = rule.split(":").map(s => s.trim());
        match = instance.get(stateKey);
        element.classList.toggle(className, !!match);
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

  // ✅ Keep Route Logic
  if (condition.startsWith("route~=")) {
    return instance.get("route").startsWith(condition.replace("route~=", "").trim());
  }
  if (condition.startsWith("route==")) {
    return instance.get("route") === condition.replace("route==", "").trim();
  }
  if (condition.startsWith("route!=")) {
    return instance.get("route") !== condition.replace("route!=", "").trim();
  }

  // ✅ Boolean/Exists check
  if (!/[=<>!~]|matches/.test(condition)) {
    return !!instance.get(condition);
  }

  // ✅ Parse Condition into { key, operator, value }
  [stateKey, operator, expectedValue] = parseCondition(condition);
  const stateValue = instance.get(stateKey.trim());

  if (operator === "matches") {
    try {
      const regexPattern = expectedValue.trim().replace(/^\/|\/$/g, ""); // Remove slashes
      const regex = new RegExp(regexPattern);
      match = regex.test(stateValue);
    } catch (e) {
      console.error("Invalid regex in class-if condition:", expectedValue, e);
    }
  } else {
    switch (operator) {
      case "==": match = stateValue == expectedValue.trim(); break;
      case "!=": match = stateValue != expectedValue.trim(); break;
      case "~=": match = typeof stateValue === "string" && stateValue.includes(expectedValue.trim()); break;
      case ">": match = parseFloat(stateValue) > parseFloat(expectedValue); break;
      case "<": match = parseFloat(stateValue) < parseFloat(expectedValue); break;
      case ">=": match = parseFloat(stateValue) >= parseFloat(expectedValue); break;
      case "<=": match = parseFloat(stateValue) <= parseFloat(expectedValue); break;
    }
  }

  return match;
}

function parseCondition(condition) {
  const match = condition.match(/([a-zA-Z0-9_]+)\s*(==|!=|~=|>=|<=|>|<|matches)\s*(\/.*\/|.+)/);
  return match ? [match[1], match[2], match[3]] : [condition, '', ''];
}


function bindInputs(data) {
  document.addEventListener("change", (event) => {
    const target = event.target;
    const key = target.getAttribute("data-bind");

    if (key) {
      if (target.type === "checkbox") {
        data[key] = target.checked;
        updateDOM(key, target.checked);
      } else {
        data[key] = target.value;
        updateDOM(key, target.value);
      }
      updateVisibility();
      updateClasses();
    }
  });
}

class State {
  constructor() {
    if (!State.instance) {
      let storedData = JSON.parse(localStorage.getItem("state")) || {};
      this.data = reactive(storedData, this.updateLocalStorage.bind(this));
      bindInputs(this.data);
      State.instance = this;

      // Initialize route state
      this.data.route = window.location.pathname;

      requestAnimationFrame(() => {
        Object.keys(this.data).forEach((key) => updateDOM(key, this.data[key]));
        updateVisibility();
        updateClasses();
      });
    }
    return State.instance;
  }

  updateLocalStorage(key, value) {
    localStorage.setItem("state", JSON.stringify(this.data));
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
    return this.data; // ✅ Now returns the full reactive state
  }
}


const instance = new State();
export default instance;

function trackOnShowElements() {
  const elements = document.querySelectorAll("[onShow]");

  elements.forEach((element) => {
    if (!element.__onShowObserver) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const onShowFn = element.getAttribute("onShow");
            if (onShowFn) {
              try {
                new Function("element", onShowFn)(element);
              } catch (e) {
                console.error("Error executing onShow function:", e);
              }
            }
          }
        });
      });

      observer.observe(element);
      element.__onShowObserver = observer;
    }
  });
}

export function validate(groupName) {
  // ✅ Select all elements inside a wrapper group="signup"
  const wrapper = document.querySelector(`[group="${groupName}"]`);
  const wrapperFields = wrapper ? [...wrapper.querySelectorAll("input, select, textarea")] : [];

  // ✅ Select all elements that have group="signup" directly (even if outside the wrapper)
  const directFields = [...document.querySelectorAll(`[group="${groupName}"]:is(input, select, textarea)`)];

  // ✅ Select all elements that are inside a group wrapper but are not inputs
  const extraFieldsInsideGroups = [...document.querySelectorAll(`[group="${groupName}"] input, select, textarea`)];

  // ✅ Merge all the fields into one array
  const fields = [...new Set([...wrapperFields, ...directFields, ...extraFieldsInsideGroups])].filter(
    field => typeof field.validIf === "function"
  );

  console.log("Validating fields:", fields); // Debugging log

  let allValid = true;
  let validationStates = {};

  fields.forEach((field) => {
    let validationFn = field.validIf;
    let bindKey = field.getAttribute("data-bind");

    if (typeof validationFn === "function" && bindKey) {
      try {
        const isValid = validationFn();

        field.classList.toggle("valid", isValid);
        field.classList.toggle("invalid", !isValid);

        validationStates[`${bindKey}_valid`] = isValid;
        validationStates[`${bindKey}_invalid`] = !isValid;

        if (!isValid) allValid = false;
      } catch (e) {
        console.error("Error executing valid-if function:", validationFn, e);
        allValid = false;
      }
    }
  });

  // ✅ Update per-field validation state
  instance.set(validationStates);

  // ✅ Also track group-wide validation state
  instance.set({ [`${groupName}_valid`]: allValid, [`${groupName}_invalid`]: !allValid });
}






export function resetValidation(groupName) {
  // ✅ Select all elements inside a wrapper group="signup"
  const wrapper = document.querySelector(`[group="${groupName}"]`);
  const wrapperFields = wrapper ? [...wrapper.querySelectorAll("input, select, textarea")] : [];

  // ✅ Select all elements that have group="signup" directly (even if outside the wrapper)
  const directFields = [...document.querySelectorAll(`[group="${groupName}"]:is(input, select, textarea)`)];

  // ✅ Select all elements that are inside a group wrapper but are not inputs
  const extraFieldsInsideGroups = [...document.querySelectorAll(`[group="${groupName}"] input, select, textarea`)];

  // ✅ Merge all the fields into one array
  const fields = [...new Set([...wrapperFields, ...directFields, ...extraFieldsInsideGroups])];

  console.log("Resetting validation for fields:", fields); // Debugging log

  let validationStates = {};

  fields.forEach((field) => {
    let bindKey = field.getAttribute("data-bind");

    if (bindKey) {
      // ✅ Clear valid & invalid states
      validationStates[`${bindKey}_valid`] = undefined;
      validationStates[`${bindKey}_invalid`] = undefined;

      // ✅ Remove visual classes
      field.classList.remove("valid", "invalid");
    }
  });

  // ✅ Reset per-field validation state
  instance.set(validationStates);

  // ✅ Reset group-wide validation state
  instance.set({ [`${groupName}_valid`]: undefined, [`${groupName}_invalid`]: undefined });
}

