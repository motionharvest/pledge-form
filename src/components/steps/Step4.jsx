export let Step4 = () => (
    <div class="container bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 class="text-xl font-semibold">Support for Fundraising Events</h2>
        <p class="text-gray-700 mt-1">
            Contribute bottles of wine or gift cards to support our Masquerade Ball and Elm’s Fundraising
        </p>

        <div class="mt-6">
            <p class="font-semibold">Yes! I will contribute:</p>

            <div class="mt-3 space-y-4">
                <div>
                    <label class="flex items-center space-x-2 font-semibold">
                        <input type="checkbox" data-bind="wineContribution" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                        <span class="text-gray-900">Wine for the Masquerade Ball ($30 minimum per bottle)</span>
                    </label>
                    <p class="text-gray-700 text-sm mt-1">
                        Your generosity fuels the success of our Masquerade Ball! Contribute to the excitement by donating a bottle 
                        (or more!) of wine valued at $30 or higher—if you have a 30-year-old bottle, even better! 
                        What’s a Wine Pull? A wine pull is a fundraising activity where guests purchase a chance to pull a 
                        mystery bottle of wine from a curated selection. Our goal is a minimum of 30 bottles for the event.
                    </p>

                    <div class="flex items-center space-x-3 mt-2">
                        <span class="text-gray-700 text-sm">Number of bottles:</span>
                        <input type="text" data-bind="wineBottleCount" 
                            class="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                        <span class="text-gray-700 text-sm">I will deliver my Wine by:</span>
                        <input type="date" data-bind="wineDeliveryDate" 
                            class="w-36 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                </div>

                <div>
                    <label class="flex items-center space-x-2 font-semibold">
                        <input type="checkbox" data-bind="giftCardContribution" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                        <span class="text-gray-900">Restaurant Gift Card(s)</span>
                    </label>
                    <p class="text-gray-700 text-sm mt-1">
                        Your generosity drives the success of Elm’s fundraising! By donating restaurant gift cards, you provide 
                        sought-after prizes and experiences that will inspire giving at our events throughout the celebratory season.
                    </p>

                    <div class="mt-2">
                        <span class="text-gray-700 text-sm">Restaurant Name(s) (if known):</span>
                        <input type="text" data-bind="restaurantNames" 
                            class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>

                    <div class="flex items-center space-x-3 mt-2">
                        <span class="text-gray-700 text-sm">I will deliver my Gift Card donation by:</span>
                        <input type="date" data-bind="giftCardDeliveryDate" 
                            class="w-36 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                        <span class="text-gray-500 text-xs">(deadline: May 1)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
)