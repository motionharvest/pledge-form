import {Form, Nav} from '@/components/form.jsx';
import { TodoList } from './components/todo.jsx';

// Log the reactive data object
console.log("Loaded State:", data);


// Main App Component
let App = () => (
    <div id="app">
        <TodoList/>
        <Form/>
        <Nav/>
    </div>
);


// Mount the JSX component to the DOM
document.body.appendChild(<App />);