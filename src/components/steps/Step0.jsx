function test() {
    alert("shown")
}

export let Step0 = () => (

<div class="container bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-center text-lg font-semibold mb-4">2025 Board of Directors Pledge</h2>

        <div class="mt-4 items-start">
            <label for="name" class="text-sm font-medium text-gray-700">Name:</label>
            <input type="text" id="name" placeholder="Enter your name"
                   class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500" data-bind="step0_name"></input>
        </div>

        <div class="mt-3">
            <label for="email" class="text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" placeholder="Enter your email"
                   class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500" data-bind="step0_email"></input>
        </div>

        <div class="mt-3">
            <label for="phone" class="text-sm font-medium text-gray-700">Phone:</label>
            <input type="tel" id="phone" placeholder="Enter your phone number"
                   class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500" data-bind="step0_phone"></input>
        </div>

        <div class="flex mt-3 space-x-2" data-onshow={()=>alert('done')}>
            <input type="checkbox" id="pledge" checked class="w-5 h-5 text-indigo-600 border-gray-300 rounded" data-bind="step0_agree"></input>
            <label for="pledge" class="text-sm text-gray-700 leading-tight">
                As a Board Member of Elm Shakespeare Company, I commit to strengthening and sustaining the organization 
                in its 30th Anniversary year. I recognize that my leadership helps ensure the company’s impact in our 
                community and that my actions inspire others to support Elm Shakespeare’s mission.
            </label>
        </div>
    </div>

    

)

