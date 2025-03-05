import {Form, Nav} from '@/components/form.jsx';

// Log the reactive data object
console.log("Loaded State:", data);

// Define a Goober component
let Goober = () => (
    <div style={{ color: "red" }} data-bind="linked">{State.get('linked')}</div>
);



// Main App Component
let App = () => (
    <Fragment>
        <h1>Reactive State with Persistent Storage</h1>
        <Form/>
        <Nav/>
        <h2>Binding Input</h2>
        <input 
            type="text" 
            data-bind="linked" 
            value={State.get('linked') || ""}
            onInput={(e) => State.set({ linked: e.target.value })}
        />
        <div className="binder" data-bind="linked">{State.get('linked')}</div>
        <button onClick={() => console.log(State.get('linked'))}>Check linked</button>
        <button onClick={() => console.log(State.get('newProperty'))}>Check newProperty</button>
        <Goober />

        <h2>Toggle Visibility</h2>
        <button onClick={() => State.set({ isVisible: true })}>Show</button>
        <button onClick={() => State.set({ isVisible: false })}>Hide</button>
        <div show-if="isVisible">This is visible when `isVisible` is **true**.</div>
        <div show-if="!isVisible">This is visible when `isVisible` is **false**.</div>

        <h2>Step-based Visibility</h2>
        <button onClick={() => State.set({ step: 1 })}>Step 1</button>
        <button onClick={() => State.set({ step: 2 })}>Step 2</button>
        <div show-if="step=1">This is visible when `step` is 1.</div>
        <div show-if="step=2">This is visible when `step` is 2.</div>
        <div show-if="step!=1">This is visible when `step` is **not** 1.</div>

        <h2>Partial Matching</h2>
        <button onClick={() => State.set({ tags: 'react, javascript' })}>Set Tags</button>
        <div show-if="tags~=react">This is visible when `tags` contains "react".</div>

        <h2>Numeric Comparison</h2>
        <button onClick={() => State.set({ age: 25 })}>Set Age to 25</button>
        <div show-if="age>21">This is visible when `age` is **greater than** `21`.</div>

        <h2>Combining Conditions</h2>
        <button onClick={() => State.set({ step: 1, isVisible: true })}>Step 1 + Visible</button>
        <button onClick={() => State.set({ step: 2, isVisible: false })}>Step 2 + Hidden</button>
        <div show-if="step=1 && isVisible">This shows when `step` is 1 AND `isVisible` is true.</div>
        <div show-if="step=1 || isVisible">This shows when `step` is 1 OR `isVisible` is true.</div>
    </Fragment>
);

// Apply styles dynamically using jssLite
let styles = jssLite({
    ".binder": {
        color: "Orange"
    }
});

// Remove styles after 2 seconds
setTimeout(() => {
    styles.remove();
}, 2000);

// Mount the JSX component to the DOM
document.body.appendChild(<App />);