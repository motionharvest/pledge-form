
/**
 * Pragma.js 
 */

class StateSingleton {
    constructor() {
      if (!StateSingleton.instance) {
        let storedData = JSON.parse(localStorage.getItem("state")) || {};
        this.data = reactive(storedData, this.updateLocalStorage.bind(this));
        bindInputs(this.data);
        this.subscribers = {}; // ✅ Pub-sub storage
        StateSingleton.instance = this;
  
        // Initialize route state
        this.data.route = window.location.pathname;
  
        requestAnimationFrame(() => {
          Object.keys(this.data).forEach((key) => updateDOM(key, this.data[key]));
          updateVisibility();
          updateClasses();
        });
      }
      return StateSingleton.instance;
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
  
        // ✅ Notify subscribers
        if (this.subscribers[key]) {
          this.subscribers[key].forEach(callback => callback(value));
        }
      });
  
      // ✅ Ensure `show-if` elements update after state changes
      requestAnimationFrame(updateVisibility);
      requestAnimationFrame(updateClasses);
    }
  
    get(key) {
      return this.data[key];
    }
  
    getData() {
      return this.data; // ✅ Now returns the full reactive state
    }
  
    // ✅ Subscribe to state changes
    subscribe(key, callback) {
      if (!this.subscribers[key]) {
        this.subscribers[key] = [];
      }
      this.subscribers[key].push(callback);
  
      // ✅ Immediately call with current value
      callback(this.data[key]);
  
      // ✅ Return unsubscribe function
      return () => {
        this.subscribers[key] = this.subscribers[key].filter(cb => cb !== callback);
      };
    }
    
    reset(initialState = {}) {
      // Clear all existing state properties
      Object.keys(this.data).forEach(key => delete this.data[key]);
  
      // Reset subscribers
      this.subscribers = {};
  
      // Restore initial state
      Object.assign(this.data, initialState);
  
      // Find all elements with `data-bind`, `show-if`, or `class-if` and reset them
      document.querySelectorAll("[data-bind], [show-if], [class-if]").forEach(el => {
          const bindKey = el.getAttribute("data-bind");
          const showIf = el.getAttribute("show-if");
          const classIf = el.getAttribute("class-if");
  
          // Handle `data-bind`
          if (bindKey) {
              if (el.tagName === "INPUT") {
                  if (el.type === "checkbox" || el.type === "radio") {
                      el.checked = !!initialState[bindKey]; // ✅ Check/uncheck based on state
                  } else {
                      el.value = initialState[bindKey] || ""; // ✅ Reset text inputs
                  }
              } else if (el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
                  el.value = initialState[bindKey] || ""; // ✅ Reset textarea and select fields
              } else {
                  el.textContent = initialState[bindKey] || ""; // ✅ Reset non-input elements
              }
          }
  
          // Handle `show-if`
          if (showIf && typeof this.data[showIf] === "function") {
              el.style.display = this.data[showIf]() ? "" : "none"; // ✅ Show/hide element
          }
  
          // Handle `class-if`
          if (classIf && typeof this.data[classIf] === "function") {
              el.className = this.data[classIf]() || ""; // ✅ Apply correct class
          }
      });
  }
}

//------------------------------------------------ END STATE

const State = new StateSingleton();
window.State = State;
export default State;
export const Fragment = Symbol("Fragment");
export let route = State.get("route");

//------------------------------------------------ END USE STATE

function updateVisibility() {
    document.querySelectorAll("[show-if]").forEach((element) => {
      const condition = element.getAttribute("show-if");

      let shouldShow = false;

      if(typeof element.showIf === "function") {
        shouldShow = element.showIf();
      }

      else if(condition) {
        shouldShow = evaluateCondition(condition.trim());
      }
      element.style.display = shouldShow ? "" : "none";
    });

    requestAnimationFrame(trackOnShowElements)
  }


//------------------------------------------------- END UPDATE VISIBILITY

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
  
    if (condition.startsWith("!")) {
      return !State.get(condition.substring(1).trim()); // ✅ Properly negate the state value
    }
    
    // ✅ Keep Route Logic
    if (condition.startsWith("route~=")) {
      return State.get("route").startsWith(condition.replace("route~=", "").trim());
    }
    if (condition.startsWith("route==")) {
      return State.get("route") === condition.replace("route==", "").trim();
    }
    if (condition.startsWith("route!=")) {
      return State.get("route") !== condition.replace("route!=", "").trim();
    }
    
  
    // ✅ Boolean/Exists check
    if (!/[=<>!~]|matches/.test(condition)) {
      return !!State.get(condition);
    }
  
    // ✅ Parse Condition into { key, operator, value }
    [stateKey, operator, expectedValue] = parseCondition(condition);
    const stateValue = State.get(stateKey.trim());
  
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




//----------------------------------------------- End evaluate Conditions




export const h = (tag, props = {}, ...children) => {
    
    if (typeof tag === "function") {
        return tag({ ...props, children, route: State.get("route") });
    }

    if (typeof tag === "symbol" && tag.toString() === "Symbol(Fragment)") {
        const fragment = document.createDocumentFragment();
        children.flat().forEach(child => fragment.append(child));
        return fragment;
    }

    if (typeof tag !== "string") {
        console.error("Invalid tag passed to h():", tag);
        return document.createComment("Invalid component");
    }
    
    const el = document.createElement(tag);
    
    Object.entries(props || {}).forEach(([key, val]) => {
        if (key.startsWith("on") && typeof val === "function") {
            if (key === "onShow") {
                // ✅ IntersectionObserver to trigger when element is shown
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            val(el); // Call onShow function
                        }
                    });
                }, { threshold: 0.1 });

                requestAnimationFrame(() => {
                    if (document.contains(el)) {
                        observer.observe(el);
                    }
                });

                el.onShow = val; // ✅ Store function as a property
            } else {
                el.addEventListener(key.slice(2).toLowerCase(), val);
            }
        } else if (key === "class-if" && typeof val === "function") {
            const updateVisibility = () => {
                el.style.display = val() ? "" : "none"; // ✅ Show/hide based on function return
            };

            updateVisibility(); // ✅ Run once on creation

            // ✅ Subscribe to state changes to ensure updates
            const boundKey = val.toString().match(/State\.get\(["'](.+?)["']\)/);
            if (boundKey && boundKey[1]) {
                State.subscribe(boundKey[1], updateVisibility);
            }

            const updateClass = () => {
                const className = val();
                el.className = className || ""; // Set the class name dynamically
            };
            updateClass(); // ✅ Run once on creation
            State.set({ [`__update_${tag}`]: updateClass }); // ✅ Store for reactive updates
            window.addEventListener("popstate", updateClass); // ✅ Update on navigation
        } else if (key === "show-if" && typeof val === "function") {
            if(typeof val === "function") {
              //
              const updateVisibility = () => {
                el.style.display = val() ? "" : "none";
              }

              updateVisibility()

              //
              const boundKey = val.toString().match(/State\.get\(["'](.+?)["']\)/);
              if(boundKey && boundKey[1]) {
                State.subscribe(boundKey[1], updateVisibility);
              }
            }
        } else if (key === "valid-if" && typeof val === "function") {
            el.validIf = val; // ✅ Store as a property, not an attribute
        } else {
            el.setAttribute(key, val);
        }
    });


    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
        const bindKey = props["data-bind"];
        if (bindKey) {
            const clearInvalidState = () => {
                if (State.get(`${bindKey}_invalid`)) {
                    State.set({ [`${bindKey}_invalid`]: undefined });
                    State.set({ [`${bindKey}_valid`]: true });
                    el.classList.remove('invalid');
                }
            };
            el.addEventListener("input", clearInvalidState);
            el.addEventListener("change", clearInvalidState);
            el.addEventListener("focus", clearInvalidState);
        }
    }

    children.flat().forEach(child => el.append(child));

    return el;
};




export const routes = {
    '/404': () => h("div", {}, "Page Not Found")
};

// Routing System
export const navigate = (path, replace = false) => {
    if (path === route) return;

    const oldView = document.body.querySelector("[data-active-route]");
    const newView = routes[path] ? routes[path]() : routes["/404"]();

    const swapView = () => {
        State.set({ route: path });
        oldView?.removeAttribute("data-active-route");
        newView.setAttribute("data-active-route", "true");
        oldView?.replaceWith(newView);
        updateVisibility();

        if (newView.props?.onEnter) {
            requestAnimationFrame(() => newView.props.onEnter(newView));
        }
    };

    if (oldView?.props?.onLeave) {
        oldView.props.onLeave(oldView, swapView);
    } else {
        swapView();
    }

    if (replace) {
        history.replaceState({ path }, "", path);
    } else {
        history.pushState({ path }, "", path);
    }
};

window.addEventListener("popstate", (event) => {
    navigate(event.state?.path || "/", true);
});

document.addEventListener("DOMContentLoaded", () => {
    navigate(route, true);
});

// Validation System
export function validate(groupName) {
  const wrapper = document.querySelector(`[group="${groupName}"]`);
  const wrapperFields = wrapper ? [...wrapper.querySelectorAll("input, select, textarea")] : [];

  const directFields = [...document.querySelectorAll(`[group="${groupName}"]:is(input, select, textarea)`)];

  const extraFieldsInsideGroups = [...document.querySelectorAll(`[group="${groupName}"] input, select, textarea`)];

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

  State.set(validationStates);
  State.set({ [`${groupName}_valid`]: allValid, [`${groupName}_invalid`]: !allValid });

  return allValid; // ✅ Return true if all fields are valid, false otherwise
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
  State.set(validationStates);

  // ✅ Reset group-wide validation state
  State.set({ [`${groupName}_valid`]: undefined, [`${groupName}_invalid`]: undefined });
}

/**
 * reactive.js
 */
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
          match = State.get(stateKey);
          element.classList.toggle(className, !!match);
        }
      });
    });
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
                  element.onShow(); // ✅ Call stored function
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
  