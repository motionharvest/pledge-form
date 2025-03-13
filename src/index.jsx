import {Form, Shield} from '@/components/form.jsx';

// Log the reactive data object
console.log("Loaded State:", data);


// Main App Component
let App = () => (
    <div id="app">
        <Shield/>
        <Form/>
    </div>
);


// Mount the JSX component to the DOM
document.body.appendChild(<App />);