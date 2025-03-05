export function reactive(obj, callback) {
    return new Proxy(obj, {
        set(target, key, value) {
            target[key] = value;
            callback(key, value);
            return true;
        }
    });
}

export function updateDOM(key, value) {
    const elements = document.querySelectorAll(`[data-bind=${key}]`);
    elements.forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
            if (element.type === 'checkbox') {
                element.checked = Boolean(value); // ✅ Correctly restore checkboxes
            } else {
                element.value = value || ''; // ✅ Restore other input types
            }
        } else {
            element.textContent = value;
        }
    });

    requestAnimationFrame(updateVisibility);
}

function updateVisibility() {
    document.querySelectorAll('[show-if]').forEach(element => {
        const condition = element.getAttribute('show-if').trim();
        const match = evaluateCondition(condition);
        element.style.display = match ? '' : 'none';
    });
}

function evaluateCondition(condition) {
    return condition.split(/\s*\|\|\s*/).some(orPart => {
        return orPart.split(/\s*&&\s*/).every(andPart => evaluateSingleCondition(andPart.trim()));
    });
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
                match = typeof stateValue === 'string' && stateValue.includes(expectedValue.trim());
                break;
            case '>':  
                match = parseFloat(stateValue) > parseFloat(expectedValue);
                break;
            case '<':  
                match = parseFloat(stateValue) < parseFloat(expectedValue);
                break;
            default:
                console.warn('Unsupported operator in show-if condition:', condition);
        }
    }

    return match;
}

function parseCondition(condition) {
    const match = condition.match(/([a-zA-Z0-9_]+)\s*(=|!=|~=|>|<)\s*(.*)/);
    if (match) {
        return [match[1], match[2], match[3]];
    }
    return [condition, '=', ''];
}

function bindInputs(data) {
    document.addEventListener('input', (event) => {
        const target = event.target;
        const key = target.getAttribute('data-bind');
        if (key) {
            if (target.type === 'checkbox') {
                data[key] = target.checked; // ✅ Store boolean for checkboxes
            } else {
                data[key] = target.value;
            }
        }
    });
}

class State {
    constructor() {
        if (!State.instance) {
            let storedData = JSON.parse(localStorage.getItem('state')) || {};
            
            if (!sessionStorage.getItem('initialized')) {
                storedData = {}; // Reset state on first load
                sessionStorage.setItem('initialized', 'true'); // Mark that state has initialized
            }

            this.data = reactive(storedData, this.updateLocalStorage.bind(this));
            bindInputs(this.data);
            State.instance = this;

            requestAnimationFrame(() => {
                Object.keys(this.data).forEach(key => updateDOM(key, this.data[key]));
                updateVisibility();
            });
        }
        return State.instance;
    }

    updateLocalStorage(key, value) {
        const data = { ...this.data, [key]: value };
        localStorage.setItem('state', JSON.stringify(data));
        updateDOM(key, value);
    }

    set(properties) {
        Object.entries(properties).forEach(([key, value]) => {
            this.data[key] = value;
        });
        updateVisibility();
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