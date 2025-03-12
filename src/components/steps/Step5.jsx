export let Step5 = (props) => (
  <>
    <div class="container bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 class="text-xl font-semibold">Host a Gathering</h2>
        <p class="text-gray-700 mt-1">
            As a board member, you can play a vital role in building support for Elm’s 30th Anniversary season by 
            hosting or attending a special gathering. Hosts curate the guest list and cover catering and venue 
            costs, creating an intimate opportunity to cultivate new supporters and inspire fundraising. Elm staff 
            will provide guidance and materials to ensure a meaningful and successful event.
        </p>

        <div class="mt-6 space-y-4">
            <div>
                <label class="flex items-center space-x-2 font-semibold">
                    <input type="checkbox" data-bind="hostFundraisingGathering" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                    <span class="text-gray-900">Yes! I will host a fundraising gathering at my home.</span>
                </label>

                <div class="mt-2">
                    <span class="text-gray-700 text-sm">Preferred dates/months:</span>
                    <input type="text" data-bind="preferredDates" 
                        class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
            </div>

            <div>
                <label class="flex items-center space-x-2 font-semibold">
                    <input type="checkbox" data-bind="attendFundraisingEvent" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                    <span class="text-gray-900">No, but I will attend an event and bring guests.</span>
                </label>
                <div class="mt-2">
                    <span class="text-gray-700 text-sm">I nominate this person as a party host</span>
                    <input type="text" data-bind="partyHostNomination" 
                        class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
            </div>
        </div>
    </div>
    <div class="control-ui shadow-lg flex justify-center gap-4 mt-2 mb-2">
            <button onClick={() => props.setStep(4)} class="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 mt-5 rounded-lg text-sm font-medium transition">Back</button>

            <button onClick={() => props.setStep(6)} class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 mt-5 rounded-lg text-sm font-medium transition">Next: </button>
        </div>
    </>
)