import "./confetti.css";

// Log the reactive data object
console.log("Loaded State:", data);

// Define a Goober component
let Goober = ({children}) => (
    <Fragment>
        <div style={{ color: "red" }} data-bind="linked">{State.get('linked')}</div>
        <div style="color: salmon; border: solid 1px salmon">
            {children}
        </div>
    </Fragment>
);

const list = [
    {id: 0, name: "Monkey"},
    {id: 1, name: "Kangaroo"},
    {id: 2, name: "Walrus"}
];

routes["/404"] = () => h("div", {}, "Page Not Found");

// Main App Component
let App = () => (
    <>  
        <h1>Validation</h1>
        <div group="signup" style="display: flex; flex-direction: column; gap: 10px; max-width: 300px;">
            <label>Username:</label>
            <input
                type="text"
                data-bind="username"
                valid-if={() => State.get("username").length >= 3}
            />
            <div show-if="username_invalid" class="bad">Username must be at least 3 characters</div>

            <label>Password:</label>
            <input
                type="password"
                data-bind="password"
                valid-if={() => State.get("password").length >= 6}
            />
            <div show-if="password_invalid" class="bad">Password must be at least 6 characters</div>

            <label>Email:</label>
            <input
                type="email"
                data-bind="email"
                group="signup"
                valid-if={() => State.get("email").includes('@')}
            />
            <div show-if="email_invalid" class="bad">Email must include '@'</div>
            <label>
                <input
                    type="checkbox"
                    data-bind="accept_terms"
                    valid-if={() => State.get("accept_terms") == true}
                />
                I agree to the terms and conditions
            </label>
            <div show-if="accept_terms_invalid" class="bad">You must accept the terms to proceed</div>
        </div>


        
        <br/>

        <span show-if="signup_invalid">Please correct the errors above.</span>

        <button
            onClick={() => validate("signup")}
            class-if="signup_invalid?button-error"
        >
            Submit
        </button>

        <button onClick={() => resetValidation("signup")}>
            Reset
        </button>


        <h1>Routing</h1>
        <div show-if="route==/">Home</div>
        <div show-if="route==/about">About</div>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/about")}>About</button>
        <h1>Looping</h1>
        <ul>
            {list.map((item) => {
                return (<li key={item.id}>{item.name}</li>)
            })}
        </ul>
        <h1>Reactive State with Persistent Storage</h1>
        <h2>Binding Input</h2>
        
        <input 
            type="text" 
            data-bind="linked" 
            value={State.get('linked') || ""}
            onInput={(e) => State.set({ linked: e.target.value })}
        />
        <br/>
        <h1>Conditions</h1>
        <input 
            type="text" 
            data-bind="required" 
            value={State.get('required') || ""}
            onBlur={(e) => console.log("onBlur worked! somehow.")}
            onInput={(e) => State.set({ required: e.target.value })}
        />
        <p class-if="required matches /^[^\s@]+@[^\s@]+\.[^\s@]+$/ || required==john? good: bad">Is this an email or john?</p>
        <p class-if="required==aaron?good:bad"><span data-bind="required">{State.get("required")}</span> == aaron</p>
        <p class-if="required>10?good:bad"><span data-bind="required">{State.get("required")}</span> &gt; 10</p>
        <p class-if="required>=20?good:bad"><span data-bind="required">{State.get("required")}</span> {'>= 20'}</p>
        <p class-if="required<5?good:bad"><span data-bind="required">{State.get("required")}</span> &lt; 5</p>
        <p class-if="required<=0?good:bad"><span data-bind="required">{State.get("required")}</span> {'<= 0'}</p>



        <br/>--<br/><br/><br/>
        <input type="checkbox" id="trigger"/>
        <div class="confetti-container">
            <div class="confetti red"></div>
            <div class="confetti green"></div>
            <div class="confetti blue"></div>
            <div class="confetti gray"></div>
            <div class="confetti salmon"></div>
            <div class="confetti red"></div>
            <div class="confetti green"></div>
            <div class="confetti blue"></div>
            <div class="confetti gray"></div>
            <div class="confetti salmon"></div>
        </div>
        <label for="trigger">Trigger Confetti</label>
        <br />--<br /><br /><br />
        <div className="binder" data-bind="linked">{State.get('linked')}</div>
        <button onClick={() => console.log(State.get('linked'))}>Check linked</button>
        <button onClick={() => console.log(State.get('newProperty'))}>Check newProperty</button>
        <Goober>There is no way it was that easy! </Goober>
    
        <h2>Toggle Visibility</h2>
        <button onClick={() => State.set({ isVisible: true })}>Show</button>
        <button onClick={() => State.set({ isVisible: false })}>Hide</button>
        <div show-if="isVisible">This is visible when `isVisible` is **true**.</div>
        <div show-if="!isVisible">This is visible when `isVisible` is **false**.</div>

        <h2>Step-based Visibility</h2>
        <button onClick={() => State.set({ step: 1 })}>Step 1</button>
        <button onClick={() => State.set({ step: 2 })}>Step 2</button>
        <div show-if="step==1">This is visible when `step` is 1.</div>
        <div show-if="step==2">This is visible when `step` is 2.</div>
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
        <div show-if="step==1 && isVisible">This shows when `step` is 1 AND `isVisible` is true.</div>
        <div show-if="step==1 || isVisible">This shows when `step` is 1 OR `isVisible` is true.</div>
    </>
);

jssLite({
    ".blue": {
        color: "blue"
    },
    ".good" : {
        color: "green"
    },
    ".bad": {
        color: "red"
    },
    "input.invalid": {
        border: "solid 2px red"
    }
})

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
const app = h(App);
console.log("App Render Output:", app);
document.body.appendChild(app);