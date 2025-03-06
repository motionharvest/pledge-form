export let Step3 = () => (
    <div class="container bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 class="text-xl font-semibold">Annual Campaign</h2>
        <p class="text-gray-700 mt-1">
            Your dedication sustains Elm Shakespeare, ensuring the artistry, education, and community programs 
            that make Shakespeare accessible and impactful year after year.
        </p>

        <div class="mt-6">
            <p class="font-semibold">I pledge to support <span class="font-bold">Elm Shakespeare’s 2025 Annual Campaign</span> with a gift of:</p>

            <div class="flex items-center mt-3">
                <span class="text-xl font-bold">$</span>
                <input type="text" data-bind="totalPledgeCommitment" 
                    class="ml-2 w-20 px-3 py-2 border border-gray-300 rounded-lg text-lg focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
        </div>

        <div class="mt-6">
            <p class="font-semibold">I will fulfill my pledge as follows</p>

            <div class="mt-3 space-y-3">
                <label class="flex items-center space-x-2">
                    <input type="checkbox" data-bind="oneTimeGiftToday" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" />
                    <span class="text-gray-700 text-sm">Pay today</span>
                </label>

                <label class="flex items-center space-x-2">
                    <input type="checkbox" data-bind="oneTimeGift" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" />
                    <span class="text-gray-700 text-sm">One-time gift on</span>
                    <input type="date" data-bind="oneTimeGiftDate" 
                        class="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                </label>

                <label class="flex items-center space-x-2">
                    <input type="checkbox" data-bind="monthlyPayments" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                    <span class="text-gray-700 text-sm">Monthly payments of: $</span>
                    <input type="text" data-bind="monthlyPaymentAmount" 
                        class="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    <span class="text-gray-700 text-sm">beginning</span>
                    <input type="date" data-bind="monthlyPaymentStartDate" 
                        class="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                </label>

                <label class="flex items-center space-x-2">
                    <input type="checkbox" data-bind="quarterlyPayments" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                    <span class="text-gray-700 text-sm">Quarterly payments of: $</span>
                    <input type="text" data-bind="quarterlyPaymentAmount" 
                        class="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    <span class="text-gray-700 text-sm">beginning</span>
                    <input type="date" data-bind="quarterlyPaymentStartDate" 
                        class="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                </label>

                <label class="flex items-center space-x-2">
                    <input type="checkbox" data-bind="otherPaymentSchedule" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                    <span class="text-gray-700 text-sm">Other payment schedule:</span>
                    <input type="text" data-bind="otherPaymentDetails" 
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                </label>
                
            </div>
            
        </div>
    </div>      
)