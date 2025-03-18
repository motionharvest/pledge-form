import { Form } from '@/components/form.jsx';
import { Intro } from '@/components/Intro.jsx';

// Log the reactive data object
console.log("Loaded State:", data);

const version = 1;

if (!State.get("version") || State.get("version") != version) {
	State.reset({
		"version": version,
		"step": 0,
		"helping": true,
		"firstView": true
	})
} else {

}



// Main App Component
let App = () => (
	<div id="app">
		<Intro />
		<Form />
	</div>
);


// Mount the JSX component to the DOM
document.body.appendChild(<App />);