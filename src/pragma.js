import State from "./reactive.js";
import { updateVisibility } from "./reactive.js";

export const Fragment = Symbol("Fragment");
export let route = State.get("route");

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
            const updateVisibility = () => {
                el.style.display = val() ? "" : "none"; // ✅ Show/hide based on function return
            };
            updateVisibility(); // ✅ Run once on creation
            State.set({ [`__update_show_${tag}`]: updateVisibility }); // ✅ Store for reactive updates
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
export function validate(groupName, validSuffix, invalidSuffix) {
    const wrapper = document.querySelector(`[group="${groupName}"]`);
    const wrapperFields = wrapper ? wrapper.querySelectorAll("[valid-if]") : [];
    const directFields = document.querySelectorAll(`[group="${groupName}"][valid-if]`);

    const fields = [...wrapperFields, ...directFields];
    let allValid = true;

    fields.forEach((field) => {
        const validationFn = field.getAttribute("valid-if");

        if (validationFn) {
            try {
                const isValid = new Function("state", `return (${validationFn})()`)(State.getData());

                field.classList.toggle(validSuffix, isValid);
                field.classList.toggle(invalidSuffix, !isValid);

                if (!isValid) allValid = false;
            } catch (e) {
                console.error("Invalid valid-if function:", validationFn);
                allValid = false;
            }
        }
    });

    State.set({ [`${groupName}_${validSuffix}`]: allValid, [`${groupName}_${invalidSuffix}`]: !allValid });
}

export function resetValidation(groupName) {
    const stateKeys = Object.keys(State.getData()).filter(key => key.startsWith(`${groupName}_`));
    const resetState = {};
    stateKeys.forEach(key => (resetState[key] = false));
    State.set(resetState);

    const wrapper = document.querySelector(`[group="${groupName}"]`);
    const wrapperFields = wrapper ? wrapper.querySelectorAll("[valid-if]") : [];
    const directFields = document.querySelectorAll(`[group="${groupName}"][valid-if]`);

    [...wrapperFields, ...directFields].forEach(field => field.classList.remove("valid", "invalid"));
}
