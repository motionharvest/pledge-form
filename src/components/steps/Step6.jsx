export let Step6 = (props) => (
  <>
    <div class="container mb-32 bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 class="text-xl font-semibold">Help with Online Auctions</h2>

        <div class="mt-4">
            <p class="font-semibold">Yes! I will help secure auction items for:</p>

            <div class="mt-3 space-y-6">
                <div>
                    <label class="flex items-center space-x-2 font-semibold">
                        <input type="checkbox" data-bind="inParkAuction" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                        <span class="text-gray-900">In the Park Auction <span class="text-sm font-normal">(August 14-31, during A Midsummer Night’s Dream)</span></span>
                    </label>
                    <p class="text-gray-700 text-sm mt-1">
                        Your efforts help make Elm’s <i>In the Park</i> Auction a success! By securing an auction item, you showcase 
                        the vibrant arts, culture, and culinary scene of New Haven while inspiring vital support for Elm 
                        Shakespeare’s 30th Anniversary season.
                    </p>

                    <ul class="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                        <li><span class="font-semibold">Goal:</span> To highlight the arts & culture ecosystem of New Haven.</li>
                        <li><span class="font-semibold">Experiential items:</span> We are seeking donations from local arts organizations (e.g., a class at CAW, NHSO family ticket bundle, Yale Rep tickets).</li>
                        <li><span class="font-semibold">Culinary items:</span> We are also securing gift certificate/card bundles and chef experiences.</li>
                    </ul>
                </div>

                <div>
                    <label class="flex items-center space-x-2 font-semibold">
                        <input type="checkbox" data-bind="masqueradeAuction" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                        <span class="text-gray-900">Masquerade Ball Auction <span class="text-sm font-normal">(Gems & Jewelry Focus)</span></span>
                    </label>
                    <p class="text-gray-700 text-sm mt-1">
                        Your generosity helps elevate the Masquerade Ball Auction! By securing stunning jewelry, fine art, 
                        luxury items, or unique experiences, you create an unforgettable fundraising opportunity that directly 
                        supports Elm Shakespeare’s 30th Anniversary season.
                    </p>

                    <ul class="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                        <li>Seeking jewelry, fine art, unique experiences, and luxury items.</li>
                    </ul>
                </div>

                <div>
                    <label class="flex items-center space-x-2 font-semibold">
                        <input type="checkbox" data-bind="otherAuctionSupport" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                        <span class="text-gray-900">Other Auction Support</span>
                    </label>
                    <p class="text-gray-700 text-sm mt-1">
                        Do you have auction item ideas, connections to items, or want guidance on what to secure? 
                        Use the form below to send us your message about Auction Support:
                    </p>

                    <textarea data-bind="auctionSupportMessage" rows="4"
                        class="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="control-ui shadow-lg flex justify-center gap-4 mt-2 mb-2">
            <button onClick={() => props.setStep(5)} class="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 mt-5 rounded-lg text-sm font-medium transition">Back</button>

            <button onClick={() => props.setStep(7)} class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 mt-5 rounded-lg text-sm font-medium transition">Next: Sponsorship Outreach</button>
        </div>
    </>
)