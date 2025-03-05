function reactive(obj, callback) {
    return new Proxy(obj, {
        set(target, key, value) {
            target[key] = value;
            callback(key, value);
            return true;
        }
    });
}

function updateDOM(key, value) {
    const elements = document.querySelectorAll(`[data-bind=${key}]`);
    elements.forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
            element.value = value || '';
        } else {
            element.textContent = value;
        }
    });
}

function bindInputs(data) {
    document.addEventListener('input', (event) => {
        const target = event.target;
        const key = target.getAttribute('data-bind');
        if (key && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
            data[key] = target.value;
        }
    });
}

class State {
    constructor() {
        if (!State.instance) {
            const storedData = JSON.parse(localStorage.getItem('data')) || {};
            this.data = reactive(storedData, this.updateLocalStorage.bind(this));
            bindInputs(this.data); // Bind input events to reactive state
            State.instance = this;
        }
        return State.instance;
    }

    updateLocalStorage(key, value) {
        const data = JSON.parse(localStorage.getItem('data')) || {};
        data[key] = value;
        localStorage.setItem('data', JSON.stringify(data));
        updateDOM(key, value); // Ensure DOM is updated when localStorage is updated
    }

    getData() {
        return this.data;
    }

    set(properties) {
        Object.entries(properties).forEach(([key, value]) => {
            this.data[key] = value;
        });
    }

    get(key) {
        return this.data[key];
    }
}

const instance = new State();
Object.freeze(instance);

export default instance;
export { updateDOM };