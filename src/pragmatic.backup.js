/**
 * Pragmatic.js - A lightweight state management and UI rendering library.
 *
 * Provides reactive state management, JSX-like rendering, routing, and form validation.
 * State is stored in localStorage for persistence across sessions.
 */

/**
 * Singleton class for state management.
 * Manages reactive data, subscriptions, and automatic updates to the DOM.
 */
class StateSingleton {
	constructor() {
		if (!StateSingleton.instance) {
			let storedData = JSON.parse(localStorage.getItem("state")) || {};
			this.data = reactive(storedData, this.updateLocalStorage.bind(this));
			bindInputs(this.data);
			this.subscribers = {};
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

  /**
     * Updates localStorage when state changes.
     * @param {string} key - The state key that changed.
     * @param {*} value - The new value of the state key.
     */
	updateLocalStorage(key, value) {
		localStorage.setItem("state", JSON.stringify(this.data));
		updateDOM(key, value);
		updateVisibility();
		updateClasses();
	}

	set(properties) {
		Object.entries(properties).forEach(([key, value]) => {
			this.data[key] = value;

			if (this.subscribers[key]) {
				this.subscribers[key].forEach(callback => callback(value));
			}
		});

		requestAnimationFrame(updateVisibility);
		requestAnimationFrame(updateClasses);
	}

	get(key) {
		return this.data[key];
	}

	getData() {
		return this.data;
	}

	
	subscribe(key, callback) {
		if (!this.subscribers[key]) {
			this.subscribers[key] = [];
		}
		this.subscribers[key].push(callback);
		callback(this.data[key]);

		return () => {
			this.subscribers[key] = this.subscribers[key].filter(cb => cb !== callback);
		};
	}

	reset(initialState = {}) {
		Object.keys(this.data).forEach(key => delete this.data[key]);
		this.subscribers = {};
		Object.assign(this.data, initialState);

		document.querySelectorAll("[data-bind], [show-if], [class-if]").forEach(el => {
			const bindKey = el.getAttribute("data-bind");
			const showIf = el.getAttribute("show-if");
			const classIf = el.getAttribute("class-if");

			if (bindKey) {
				if (el.tagName === "INPUT") {
					if (el.type === "checkbox" || el.type === "radio") {
						el.checked = !!initialState[bindKey];
					} else {
						el.value = initialState[bindKey] || "";
					}
				} else if (el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
					el.value = initialState[bindKey] || "";
				} else {
					el.textContent = initialState[bindKey] || "";
				}
			}

			// Handle `show-if`
			if (showIf && typeof this.data[showIf] === "function") {
				el.style.display = this.data[showIf]() ? "" : "none";
			}

			// Handle `class-if`
			if (classIf && typeof this.data[classIf] === "function") {
				el.className = this.data[classIf]() || "";
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

		if (typeof element.showIf === "function") {
			shouldShow = element.showIf();
		} else if (condition) {
			shouldShow = evaluateCondition(condition.trim());
		}
		element.style.display = shouldShow ? "" : "none";
	});

	requestAnimationFrame(trackOnShowElements)
}

/**
 * Evaluates complex conditional expressions for `show-if` and `class-if` attributes.
 * @param {string} condition - The conditional expression to evaluate.
 * @returns {boolean} - Whether the condition evaluates to true or false.
 */
function evaluateCondition(condition) {
	return condition.split(/\s*\|\|\s*/).some(orPart =>
		orPart.split(/\s*&&\s*/).every(andPart =>
			evaluateSingleCondition(andPart.trim())
		)
	);
}

/**
 * Evaluates a single condition expression.
 * @param {string} condition - The condition to evaluate.
 * @returns {boolean} - The result of the condition.
 */
function evaluateSingleCondition(condition) {
	let match = false;
	let stateKey, operator, expectedValue;

	if (condition.startsWith("!")) {
		return !State.get(condition.substring(1).trim());
	}

	if (condition.startsWith("route~=")) {
		return State.get("route").startsWith(condition.replace("route~=", "").trim());
	}
	if (condition.startsWith("route==")) {
		return State.get("route") === condition.replace("route==", "").trim();
	}
	if (condition.startsWith("route!=")) {
		return State.get("route") !== condition.replace("route!=", "").trim();
	}

	if (!/[=<>!~]|matches/.test(condition)) {
		return !!State.get(condition);
	}

	[stateKey, operator, expectedValue] = parseCondition(condition);
	const stateValue = State.get(stateKey.trim());

	if (operator === "matches") {
		try {
			const regexPattern = expectedValue.trim().replace(/^\/|\/$/g, "");
			const regex = new RegExp(regexPattern);
			match = regex.test(stateValue);
		} catch (e) {
			console.error("Invalid regex in class-if condition:", expectedValue, e);
		}
	} else {
		switch (operator) {
			case "==":
				match = stateValue == expectedValue.trim();
				break;
			case "!=":
				match = stateValue != expectedValue.trim();
				break;
			case "~=":
				match = typeof stateValue === "string" && stateValue.includes(expectedValue.trim());
				break;
			case ">":
				match = parseFloat(stateValue) > parseFloat(expectedValue);
				break;
			case "<":
				match = parseFloat(stateValue) < parseFloat(expectedValue);
				break;
			case ">=":
				match = parseFloat(stateValue) >= parseFloat(expectedValue);
				break;
			case "<=":
				match = parseFloat(stateValue) <= parseFloat(expectedValue);
				break;
		}
	}
	return match;
}

function parseCondition(condition) {
	const match = condition.match(/([a-zA-Z0-9_]+)\s*(==|!=|~=|>=|<=|>|<|matches)\s*(\/.*\/|.+)/);
	return match ? [match[1], match[2], match[3]] : [condition, '', ''];
}

/**
 * Creates and returns a DOM element or component using JSX-like syntax.
 * @param {string|Function} tag - The tag name or component function.
 * @param {Object} props - The properties to set on the element.
 * @param {...any} children - The child elements or components.
 * @returns {Node} - The generated DOM node.
 */
export const h = (tag, props = {}, ...children) => {

	if (typeof tag === "function") {
		return tag({
			...props,
			children,
			route: State.get("route")
		});
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
				const observer = new IntersectionObserver((entries) => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							val(el);
						}
					});
				}, {
					threshold: 0.1
				});

				requestAnimationFrame(() => {
					if (document.contains(el)) {
						observer.observe(el);
					}
				});

				el.onShow = val;
			} else {
				el.addEventListener(key.slice(2).toLowerCase(), val);
			}
		} else if (key === "class-if" && typeof val === "function") {
			const updateVisibility = () => {
				el.style.display = val() ? "" : "none";
			};

			updateVisibility();

			const boundKey = val.toString().match(/State\.get\(["'](.+?)["']\)/);
			if (boundKey && boundKey[1]) {
				State.subscribe(boundKey[1], updateVisibility);
			}

			const updateClass = () => {
				const className = val();
				el.className = className || "";
			};
			updateClass();
			State.set({
				[`__update_${tag}`]: updateClass
			});
			window.addEventListener("popstate", updateClass);
		} else if (key === "show-if" && typeof val === "function") {
			if (typeof val === "function") {
				//
				const updateVisibility = () => {
					el.style.display = val() ? "" : "none";
				}

				updateVisibility()

				//
				const boundKey = val.toString().match(/State\.get\(["'](.+?)["']\)/);
				if (boundKey && boundKey[1]) {
					State.subscribe(boundKey[1], updateVisibility);
				}
			}
		} else if (key === "valid-if" && typeof val === "function") {
			el.validIf = val;
		} else {
			el.setAttribute(key, val);
		}
	});


	if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
		const bindKey = props["data-bind"];
		if (bindKey) {
			const clearInvalidState = () => {
				if (State.get(`${bindKey}_invalid`)) {
					State.set({
						[`${bindKey}_invalid`]: undefined
					});
					State.set({
						[`${bindKey}_valid`]: true
					});
					el.classList.remove('invalid');
				}
			};
			el.addEventListener("input", clearInvalidState);
			el.addEventListener("change", clearInvalidState);
			el.addEventListener("focus", clearInvalidState);
		}
	}

	children.flat().forEach((child) => {
		if (typeof child === "function") {
			const placeholder = document.createTextNode("");
			el.appendChild(placeholder);

			const render = () => {
				const result = child();

				if (Array.isArray(result)) {
					while (placeholder.nextSibling && placeholder.nextSibling.nodeType !== 8) {
						placeholder.nextSibling.remove();
					}

					const fragment = document.createDocumentFragment();
					result.forEach(item => {
						if (item instanceof Node) {
							fragment.appendChild(item);
						} else {
							fragment.appendChild(document.createTextNode(String(item)));
						}
					});

					placeholder.after(fragment);
				}

				else if (typeof result === "string" || typeof result === "number") {
					if (placeholder.nextSibling && placeholder.nextSibling.nodeType === 3) {
						placeholder.nextSibling.textContent = String(result);
					} else {
						placeholder.after(document.createTextNode(String(result)));
					}
				}	else if (result instanceof Node) {
					placeholder.after(result);
				}
			};

			const usedKeys = child.toString().match(/State\.get\(["'](.+?)["']\)/g);
			if (usedKeys) {
				usedKeys.forEach((match) => {
					const key = match.match(/State\.get\(["'](.+?)["']\)/)[1];
					State.subscribe(key, render);
				});
			}

			render();
		}	else if (Array.isArray(child)) {
			child.forEach(item => {
				if (item instanceof Node) {
					el.appendChild(item);
				} else {
					el.appendChild(document.createTextNode(String(item)));
				}
			});
		}	else if (typeof child === "string" || typeof child === "number") {
			el.appendChild(document.createTextNode(child));
		} else if (child instanceof Node) {
			el.appendChild(child);
		}
	});

	return el;
};




export const routes = {
	'/404': () => h("div", "404 Page not found")
};

/**
 * Navigates to a new route and updates the view accordingly.
 * @param {string} path - The target route path.
 * @param {boolean} replace - Whether to replace the current history state.
 */
export const navigate = (path, replace = false) => {
	if (path === route) return;

	const oldView = document.body.querySelector("[data-active-route]");
	const newView = routes[path] ? routes[path]() : routes["/404"]();

	const swapView = () => {
		State.set({
			route: path
		});
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
		history.replaceState({
			path
		}, "", path);
	} else {
		history.pushState({
			path
		}, "", path);
	}
};

window.addEventListener("popstate", (event) => {
	navigate(event.state?.path || "/", true);
});

document.addEventListener("DOMContentLoaded", () => {
	navigate(route, true);
});

/**
 * Validates all fields within a specified validation group.
 *
 * This function iterates over all form fields within the given `groupName`,
 * checking their `valid-if` attributes (if present). If a field fails validation,
 * an error class is applied, and the function returns `false`. If all fields pass,
 * it returns `true`.
 *
 * @param {string} groupName - The validation group name.
 * @returns {boolean} - `true` if all fields pass validation, otherwise `false`.
 *
 * @example
 * // HTML:
 * <form group-name="signup">
 *     <input type="text" data-bind="email" valid-if="() => State.get('email').includes('@')">
 *     <input type="password" data-bind="password">
 * </form>
 * <button onClick="validate('signup')">Submit</button>
 *
 * // JavaScript:
 * if (validate("signup")) {
 *     console.log("Form is valid!");
 * } else {
 *     console.log("Validation failed.");
 * }
 */
export function validate(groupName) {
	const wrapper = document.querySelector(`[group="${groupName}"]`);
	const wrapperFields = wrapper ? [...wrapper.querySelectorAll("input, select, textarea")] : [];
	const directFields = [...document.querySelectorAll(`[group="${groupName}"]:is(input, select, textarea)`)];
	const extraFieldsInsideGroups = [...document.querySelectorAll(`[group="${groupName}"] input, select, textarea`)];
	const fields = [...new Set([...wrapperFields, ...directFields, ...extraFieldsInsideGroups])].filter(
		field => typeof field.validIf === "function"
	);

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
	State.set({
		[`${groupName}_valid`]: allValid,
		[`${groupName}_invalid`]: !allValid
	});

	return allValid;
}

/**
 * Resets validation errors within a specified validation group.
 *
 * This function removes any error indicators from fields within the
 * given `groupName`, effectively resetting their validation state.
 *
 * @param {string} groupName - The validation group name.
 *
 * @example
 * resetValidation("signup");
 */
export function resetValidation(groupName) {
	const wrapper = document.querySelector(`[group="${groupName}"]`);
	const wrapperFields = wrapper ? [...wrapper.querySelectorAll("input, select, textarea")] : [];
	const directFields = [...document.querySelectorAll(`[group="${groupName}"]:is(input, select, textarea)`)];
	const extraFieldsInsideGroups = [...document.querySelectorAll(`[group="${groupName}"] input, select, textarea`)];
	const fields = [...new Set([...wrapperFields, ...directFields, ...extraFieldsInsideGroups])];

	let validationStates = {};

	fields.forEach((field) => {
		let bindKey = field.getAttribute("data-bind");

		if (bindKey) {
			validationStates[`${bindKey}_valid`] = undefined;
			validationStates[`${bindKey}_invalid`] = undefined;

			field.classList.remove("valid", "invalid");
		}
	});

	State.set(validationStates);

	State.set({
		[`${groupName}_valid`]: undefined,
		[`${groupName}_invalid`]: undefined
	});
}

/**
 * Creates a reactive object that triggers updates when properties change.
 * @param {Object} obj - The initial state object.
 * @param {Function} callback - Function to call on state updates.
 * @returns {Proxy} - A proxy object with reactive behavior.
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

/**
 * Updates DOM elements bound to a specific state key by setting their text content.
 * Also ensures `data-bind` elements remain in sync with state changes.
 * @param {string} key - The state key.
 * @param {*} value - The new value.
 */
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

/**
 * Updates elements with `class-if` attributes based on conditions.
 * Dynamically toggles CSS classes based on state values.
 * @example <div class-if="isActive ? 'active' : 'inactive'"></div>
 */
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

/**
 * Binds input elements with `data-bind` attributes to state.
 * Ensures two-way data binding between form elements and state.
 * Works with input, textarea, and select elements.
 * @example <input type="text" data-bind="username">
 */
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

/**
 * Tracks elements with `on-show` attributes and executes callbacks when they appear in the viewport.
 * Useful for lazy-loading elements or triggering animations when elements become visible.
 * @example <div on-show="() => console.log('Element is now visible')"></div>
 */
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
								element.onShow();
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