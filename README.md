Pragmatic.js

🚀 Introduction

Pragmatic.js is a lightweight, reactive UI library that enables dynamic interactivity based on state-driven rendering. Unlike traditional frameworks, Pragmatic stores state in localStorage, ensuring your app remembers user interactions even after a refresh.

✨ Key Features

State Management: Store, retrieve, and react to state changes effortlessly.

Auto UI Updates: Components re-render automatically when state changes.

JSX-Compatible Rendering: Use JSX-like syntax with h().

Built-in Routing: Client-side navigation with navigate().

Conditional Rendering: show-if, class-if, valid-if attributes for dynamic visibility.

Form Binding: Auto-sync inputs with state using data-bind.

📦 Installation

Simply include Pragmatic.js in your project:

<script type="module" src="pragmatic.js"></script>

Or use it with Vite/Webpack:

import State, { h, navigate } from './pragmatic.js';

🛠️ Basic Usage

Defining State

State.set({ count: 0 });
console.log(State.get("count")); // 0

Creating a UI Component

const Counter = () => (
    <button onClick={() => State.set({ count: State.get("count") + 1 })}>
        Clicked {() => State.get("count")} times
    </button>
);

document.body.appendChild(<Counter />);

🎛️ State Management

Get & Set State

State.set({ name: "Alice" });
console.log(State.get("name")); // "Alice"

Subscribing to Changes

State.subscribe("name", (newValue) => {
    console.log("Name changed to:", newValue);
});

**Auto-Updated UI with **data-bind

<input type="text" data-bind="name">
<p>Your name is: <span data-bind="name"></span></p>

🎨 JSX & Components

**Rendering Elements with **h()

const Hello = () => h("h1", {}, "Hello World");
document.body.appendChild(<Hello />);

Handling Dynamic Values

const DynamicText = () => <p>Count: {() => State.get("count")}</p>;

Rendering Lists

const TodoList = () => (
    <ul>
        {() => State.get("todos").map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
);

🔄 Conditional Rendering

**Show/Hide Elements with **show-if

<p show-if="loggedIn">Welcome back!</p>

**Dynamic Class Binding with **class-if

<button class-if="loggedIn ? 'btn-primary' : 'btn-secondary'">Login</button>

Validation Rules

<input type="text" data-bind="email" valid-if="() => State.get('email').includes('@')">

🛤️ Routing
# Pragmatic.js

## 🚀 Introduction

Pragmatic.js is a lightweight, **reactive UI library** that enables dynamic interactivity based on **state-driven rendering**. Unlike traditional frameworks, Pragmatic stores state in **localStorage**, ensuring your app **remembers user interactions** even after a refresh.

### **✨ Key Features**

- **State Management**: Store, retrieve, and react to state changes effortlessly.
- **Auto UI Updates**: Components re-render automatically when state changes.
- **JSX-Compatible Rendering**: Use JSX-like syntax with `h()`.
- **Built-in Routing**: Client-side navigation with `navigate()`.
- **Conditional Rendering**: `show-if`, `class-if`, `valid-if` attributes for dynamic visibility.
- **Form Binding**: Auto-sync inputs with state using `data-bind`.

---

## 📦 Installation

Simply include Pragmatic.js in your project:

```html
<script type="module" src="pragmatic.js"></script>
```

Or use it with **Vite/Webpack**:

```js
import State, { h, navigate } from './pragmatic.js';
```

---

## 🛠️ Basic Usage

### **Defining State**

```js
State.set({ count: 0 });
console.log(State.get("count")); // 0
```

### **Creating a UI Component**

```jsx
const Counter = () => (
    <button onClick={() => State.set({ count: State.get("count") + 1 })}>
        Clicked {() => State.get("count")} times
    </button>
);

document.body.appendChild(<Counter />);
```

---

## 🎛️ State Management

### **Get & Set State**

```js
State.set({ name: "Alice" });
console.log(State.get("name")); // "Alice"
```

### **Subscribing to Changes**

```js
State.subscribe("name", (newValue) => {
    console.log("Name changed to:", newValue);
});
```

### \*\*Auto-Updated UI with \*\***`data-bind`**

```html
<input type="text" data-bind="name">
<p>Your name is: <span data-bind="name"></span></p>
```

---

## 🎨 JSX & Components

### \*\*Rendering Elements with \*\***`h()`**

```js
const Hello = () => h("h1", {}, "Hello World");
document.body.appendChild(<Hello />);
```

### **Handling Dynamic Values**

```jsx
const DynamicText = () => <p>Count: {() => State.get("count")}</p>;
```

### **Rendering Lists**

```jsx
const TodoList = () => (
    <ul>
        {() => State.get("todos").map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
);
```

---

## 🔄 Conditional Rendering

### \*\*Show/Hide Elements with \*\***`show-if`**

```html
<p show-if="loggedIn">Welcome back!</p>
```

### \*\*Dynamic Class Binding with \*\***`class-if`**

```html
<button class-if="loggedIn ? 'btn-primary' : 'btn-secondary'">Login</button>
```

### **Validation Rules**

```html
<input type="text" data-bind="email" valid-if="() => State.get('email').includes('@')">
```

---

## 🛤️ Routing

### **Defining Routes**

```js
export const routes = {
    "/": () => <h1>Home</h1>,
    "/about": () => <h1>About Us</h1>,
};
```

### **Navigating Pages**

```js
navigate("/about");
```

---

## ✅ Form Validation

### **Validating Forms**

Validation works by assigning a containing element with a `group-name` attribute, or by giving each element a `group-name` attribute. Then call `validate(group-name)` to validate all fields in that group.

```html
<form group-name="signup">
    <input type="text" data-bind="email" valid-if="() => State.get('email').includes('@')">
    <input type="password" data-bind="password">
</form>
<button onClick="validate('signup')">Submit</button>
```

### **Reset Validation**

```js
resetValidation("signup");
```

---

## 🎯 Conclusion

Pragmatic.js makes **state-driven UI simple** while staying **lightweight and efficient**. Try it today and **build reactive UIs with ease!** 🚀


Defining Routes

export const routes = {
    "/": () => <h1>Home</h1>,
    "/about": () => <h1>About Us</h1>,
};

Navigating Pages

navigate("/about");

✅ Form Validation

Validating Forms

Validation works by assigning a containing element with a group-name attribute, or by giving each element a group-name attribute. Then call validate(group-name) to validate all fields in that group.

<form group-name="signup">
    <input type="text" data-bind="email" valid-if="() => State.get('email').includes('@')">
    <input type="password" data-bind="password">
</form>
<button onClick="validate('signup')">Submit</button>

Reset Validation

resetValidation("signup");

🎯 Conclusion

Pragmatic.js makes state-driven UI simple while staying lightweight and efficient. Try it today and build reactive UIs with ease! 🚀

