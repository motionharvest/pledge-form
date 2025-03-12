export let Step7 = (props) => (
  <>
    <div class="container mb-32 bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 class="text-xl font-semibold">
            <span class="font-bold">Sponsorship Outreach </span> 
            <span class="text-gray-700 text-sm">(Deadline to join the effort: March 1; sponsor deadline May 1)</span>
        </h2>

        <p class="text-gray-700 mt-2">
            Your connections and advocacy are key to making Elm Shakespeare’s 30th Anniversary season 
            extraordinary—by helping secure sponsors, you ensure the longevity and impact of our free theatre 
            and education programs for years to come.
        </p>

        <div class="mt-6">
            <p class="font-semibold">Yes! I will assist with sponsorship outreach for:</p>

            <div class="mt-3 space-y-4">
                <label class="flex items-center space-x-2">
                    <input type="checkbox" data-bind="seasonSponsorship" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                    <span class="text-gray-900">30th Anniversary Season Sponsorships</span>
                </label>

                <label class="flex items-center space-x-2">
                    <input type="checkbox" data-bind="masqueradeSponsorship" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                    <span class="text-gray-900">Masquerade Ball Sponsorships</span>
                </label>

                <div class="flex items-center space-x-2">
                    <input type="checkbox" data-bind="sponsorLeads" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                    <span class="text-gray-900">I have sponsor leads to share:</span>
                    <input type="text" data-bind="sponsorLeadsInput" 
                        class="w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>

                <label class="flex items-center space-x-2">
                    <input type="checkbox" data-bind="sponsorshipSupport" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                    <span class="text-gray-900">I need materials or support to approach sponsors</span>
                </label>
            </div>
        </div>
    </div>
    <div class="control-ui shadow-lg flex justify-center gap-4 mt-2 mb-2">
            <button onClick={() => props.setStep(6)} class="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 mt-5 rounded-lg text-sm font-medium transition">Back</button>

            <button onClick={() => props.setStep(8)} class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 mt-5 rounded-lg text-sm font-medium transition">Next: Summary</button>
        </div>
    </>
)