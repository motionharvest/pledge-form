export const Fragment = Symbol("Fragment");

export const h = (tag, props, ...children) => {
    if (tag === Fragment) {
        const fragment = document.createDocumentFragment();
        children.forEach(child => {
            if (Array.isArray(child)) {
                child.forEach(nestedChild => fragment.append(nestedChild));
            } else {
                fragment.append(child);
            }
        });
        return fragment;
    }

    if (typeof tag === 'function') {
        return tag({ ...props }, children);
    }

    const el = document.createElement(tag);

    if (props) {
        Object.entries(props).forEach(([key, val]) => {
            if (key === 'className') {
                el.classList.add(...(val || '').trim().split(' '));
            } else if (key.startsWith('on') && typeof val === 'function') {
                if (key === 'onShow') {
                    // ✅ IntersectionObserver that triggers every time element is shown
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
                } else {
                    el.addEventListener(key.slice(2).toLowerCase(), val);
                }
            } else {
                el.setAttribute(key, val);
            }
        });
    }

    children.forEach(child => {
        if (Array.isArray(child)) {
            child.forEach(nestedChild => el.append(nestedChild));
        } else {
            el.append(child);
        }
    });

    return el;
};
