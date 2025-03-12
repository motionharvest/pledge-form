
export let Step0 = (props) => (
    <>

<div class="container bg-white p-6 rounded-lg shadow-lg w-96" group="intro">
        <h2 class="text-center text-lg font-semibold mb-4">2025 Board of Directors Pledge</h2>

        <div class="mt-4 items-start">
            <label for="name" class="text-sm font-medium text-gray-700">Name:</label>
            <input type="text" id="name" placeholder="Enter your first and last name"
                   class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500" data-bind="step0_name" valid-if={()=>State.get("step0_name")}></input>
            <div show-if="step0_name_invalid" class="red">Please enter your name</div>      
        </div>

        <div class="mt-3">
            <label for="email" class="text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" placeholder="Enter your email" valid-if={()=>(State.get("step0_email") || "").includes("@")}
                   class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500" data-bind="step0_email"></input>
            <div show-if="step0_email_invalid" class="red">Please enter a valid email address</div>
        </div>

        <div class="mt-3">
            <label for="phone" class="text-sm font-medium text-gray-700">Phone:</label>
            <input type="tel" id="phone" placeholder="Enter your phone number"
                   class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500" data-bind="step0_phone" valid-if={()=>State.get("step0_phone")}></input>
            <div show-if="step0_phone_invalid" class="red">Please enter your phone number</div> 
        </div>

        <div class="flex mt-3 space-x-2">
            <input type="checkbox" id="pledge" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" valid-if={()=>State.get("step0_agree")} data-bind="step0_agree"></input>
            <label for="pledge" class="text-sm w-full text-gray-700 leading-tight">
                As a Board Member of Elm Shakespeare Company, I commit to strengthening and sustaining the organization 
                in its 30th Anniversary year. I recognize that my leadership helps ensure the company’s impact in our 
                community and that my actions inspire others to support Elm Shakespeare’s mission.
                <div show-if="step0_agree_invalid" class="red">Your participation is appreciated</div> 
            </label>
        </div>

        
    </div>

        <div class="control-ui shadow-lg flex justify-center gap-4 mt-2 mb-2">
            <button show-if="step<10" onClick={() => validate("intro") && props.setStep(1)} class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 mt-5 rounded-lg text-sm font-medium transition">Sign and Continue</button>
        </div>
    
</>
)

jssLite({
    ".invalid": {
        "border-color": "red"
    },
    ".red": {
        "color": "red"
    }
})