export let Step8 = (props) => (
    <div class="container">

        <div class="mb-4 bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 class="text-xl font-semibold">Great Give - Director’s Circle <a href="#" onClick={() => props.setStep(2)}>✏️edit</a></h2>

            
            <div class="mt-6" show-if="step2_1_yes">
                <h3 class="font-bold">Your Impact in Action</h3>
                <p class="text-gray-700 text-sm">A one-night only behind-the-scenes exclusive first glimpse of our Teen Troupe’s production of Twelfth Night before it opens.</p>

                <p class="mt-2 font-semibold">Details</p>
                <p class="text-sm text-gray-700">May 7, 2025 - 5:30pm<br/>Lyman Center, Kendall Drama Lab</p>

                <div class="mt-2">
                    <label class="flex items-center space-x-2">
                        <input disabled="disabled" type="checkbox" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" data-bind="step2_1_yes"></input>
                        <span class="text-gray-700 text-sm">Yes, I’ll attend and bring a guest</span>
                    </label>
                </div>
            </div>

            
            <div class="mt-6" show-if="step2_2_yes">
                <h3 class="font-bold">Pub Sing</h3>
                <p class="text-gray-700 text-sm">(Update) Join us for a night of laughter and song and help us close out the Great Give.</p>

                <p class="mt-2 font-semibold">Details</p>
                <p class="text-sm text-gray-700">May 8, 2025 - 5:30pm<br/>Location to be determined</p>

                <div class="mt-2">
                    <label class="flex items-center space-x-2">
                        <input disabled="disabled" type="checkbox" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" data-bind="step2_2_yes" ></input>
                        <span class="text-gray-700 text-sm">Yes, I’ll attend and bring a guest</span>
                    </label>
                </div>
            </div>

            
            <div class="mt-6" show-if="step2_3_3000||step2_3_1000||step2_3_750||step2_3_other">
                <h3 class="font-bold">Gift/Pledge</h3>
                <p class="text-gray-700 text-sm">Pledge a donation to help us meet matching challenges and inspire others.</p>

                <div class="mt-3 space-y-2">
                    <label class="flex items-center space-x-2" show-if="step2_3_3000">
                        <input disabled="disabled" type="checkbox" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" data-bind="step2_3_3000"></input>
                        <span class="text-gray-700 text-sm">$3,000</span>
                    </label>

                    <label class="flex items-center space-x-2" show-if="step2_3_1000">
                        <input disabled="disabled" type="checkbox" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" data-bind="step2_3_1000"></input>
                        <span class="text-gray-700 text-sm">$1,000</span>
                    </label>

                    <label class="flex items-center space-x-2" show-if="step2_3_750">
                        <input disabled="disabled" type="checkbox" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" data-bind="step2_3_750"></input>
                        <span class="text-gray-700 text-sm">$750</span>
                    </label>

                    <label class="flex items-center space-x-2" show-if="step2_3_other">
                        <input disabled="disabled" type="checkbox" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" data-bind="step2_3_other"></input>
                        <span class="text-gray-700 text-sm">Other $</span>
                        <input disabled="disabled" type="text" class="w-20 px-2 py-1 text-sm border border-gray-300 rounded-lg" data-bind="step3_3_other-value">{State.get("step3_3_other-value")}</input>
                    </label>

                    <div class="mt-3 space-y-2">
                        <label class="flex items-center space-x-2">
                            <input disabled="disabled" type="radio" value="payToday" name="paymentOptionSummary" data-bind="paymentOption" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                            <span class="text-gray-900">Pay today</span>
                        </label>

                        <label class="flex items-center space-x-2">
                            <input disabled="disabled" type="radio" value="payLater" name="paymentOptionSummary" data-bind="paymentOption" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                            <span class="text-gray-900">Pay later</span>
                        </label>
                    </div>
                </div>
                
            </div>
            
        </div>
        {/**  */}
        <div class="mb-4 bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 class="text-xl font-semibold">Annual Campaign <a href="#" onClick={() => props.setStep(3)}>✏️edit</a></h2>

            <div class="mt-6">
                <p class="font-semibold">I pledge to support <span class="font-bold">Elm Shakespeare’s 2025 Annual Campaign</span> with a gift of:</p>

                <div class="flex items-center mt-3">
                    <span class="text-xl font-bold">$</span>
                    <input disabled="disabled" type="text" data-bind="totalPledgeCommitment" 
                        class="ml-2 w-20 px-3 py-2 border border-gray-300 rounded-lg text-lg focus:ring-indigo-500 focus:border-indigo-500"/>
                </div>
            </div>

            <div class="mt-6">
                <p class="font-semibold">I will fulfill my pledge as follows</p>

                <div class="mt-3 space-y-3">
                    <label class="flex items-center space-x-2" show-if="oneTimeGiftToday">
                        <input disabled="disabled" type="checkbox" data-bind="oneTimeGiftToday" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" />
                        <span class="text-gray-700 text-sm">Pay today</span>
                    </label>

                    <label class="flex items-center space-x-2" show-if="oneTimeGift">
                        <input disabled="disabled" type="checkbox" data-bind="oneTimeGift" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" />
                        <span class="text-gray-700 text-sm">One-time gift on</span>
                        <input disabled="disabled" type="date" data-bind="oneTimeGiftDate" 
                            class="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </label>

                    <label class="flex items-center space-x-2" show-if="monthlyPayments">
                        <input disabled="disabled" type="checkbox" data-bind="monthlyPayments" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                        <span class="text-gray-700 text-sm">Monthly payments of: $</span>
                        <input disabled="disabled" type="text" data-bind="monthlyPaymentAmount" 
                            class="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                        <span class="text-gray-700 text-sm">beginning</span>
                        <input disabled="disabled" type="date" data-bind="monthlyPaymentStartDate" 
                            class="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </label>

                    <label show-if="quarterlyPayments" class="flex items-center space-x-2">
                        <input disabled="disabled" type="checkbox" data-bind="quarterlyPayments" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                        <span class="text-gray-700 text-sm">Quarterly payments of: $</span>
                        <input disabled="disabled" type="text" data-bind="quarterlyPaymentAmount" 
                            class="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                        <span class="text-gray-700 text-sm">beginning</span>
                        <input disabled="disabled" type="date" data-bind="quarterlyPaymentStartDate" 
                            class="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </label>

                    <label show-if="otherPaymentSchedule" class="flex items-center space-x-2">
                        <input disabled="disabled" type="checkbox" data-bind="otherPaymentSchedule" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                        <span class="text-gray-700 text-sm">Other payment schedule:</span>
                        <input disabled="disabled" type="text" data-bind="otherPaymentDetails" 
                            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </label>
                </div>
            </div>
        </div>
        {/**  */}
        <div class="mb-4 bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 class="text-xl font-semibold">Support for Fundraising Events <a href="#" onClick={() => props.setStep(4)}>✏️edit</a></h2>

            <div class="mt-6">
                
                <div class="mt-3 space-y-4">
                    <div show-if="wineContribution">
                        <label class="flex items-center space-x-2 font-semibold">
                            <input disabled="disabled" type="checkbox" data-bind="wineContribution" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                            <span class="text-gray-900">Wine for the Masquerade Ball ($30 minimum per bottle)</span>
                        </label>

                        <div class="flex items-center space-x-3 mt-2">
                            <span class="text-gray-700 text-sm">Number of bottles:</span>
                            <input disabled="disabled" type="text" data-bind="wineBottleCount" 
                                class="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                            <span class="text-gray-700 text-sm">I will deliver my Wine by:</span>
                            <input disabled="disabled" type="date" data-bind="wineDeliveryDate" 
                                class="w-36 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                    </div>

                    <div show-if="giftCardContribution">
                        <label class="flex items-center space-x-2 font-semibold">
                            <input disabled="disabled" type="checkbox" data-bind="giftCardContribution" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                            <span class="text-gray-900">Restaurant Gift Card(s)</span>
                        </label>

                        <div class="mt-2">
                            <span class="text-gray-700 text-sm">Restaurant Name(s) (if known):</span>
                            <input disabled="disabled" type="text" data-bind="restaurantNames" 
                                class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>

                        <div class="flex items-center space-x-3 mt-2">
                            <span class="text-gray-700 text-sm">I will deliver my Gift Card donation by:</span>
                            <input disabled="disabled" type="date" data-bind="giftCardDeliveryDate" 
                                class="w-36 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                            <span class="text-gray-500 text-xs">(deadline: May 1)</span>
                        </div>
                    </div>
                </div>
            </div>
 
        </div>
        {/**  */}
        <div class="mb-4 bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 class="text-xl font-semibold">Host a Gathering <a href="#" onClick={() => props.setStep(5)}>✏️edit</a></h2>

            <div class="mt-6 space-y-4">
                <div show-if="hostFundraisingGathering">
                    <label class="flex items-center space-x-2 font-semibold">
                        <input disabled="disabled" type="checkbox" data-bind="hostFundraisingGathering" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                        <span class="text-gray-900">Yes! I will host a fundraising gathering at my home.</span>
                    </label>

                    <div class="mt-2">
                        <span class="text-gray-700 text-sm">Preferred dates/months:</span>
                        <input disabled="disabled" type="text" data-bind="preferredDates" 
                            class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                </div>

                <div show-if="attendFundraisingEvent">
                    <label class="flex items-center space-x-2 font-semibold">
                        <input disabled="disabled" type="checkbox" data-bind="attendFundraisingEvent" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                        <span class="text-gray-900">No, but I will attend an event and bring guests.</span>
                    </label>
                    <div class="mt-2">
                        <span class="text-gray-700 text-sm">I nominate this person as a party host</span>
                        <input disabled="disabled" type="text" data-bind="partyHostNomination" 
                            class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                </div>
            </div>
        </div>
        {/**  */}
        <div class="mb-4 bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 class="text-xl font-semibold">Online Auctions <a href="#" onClick={() => props.setStep(6)}>✏️edit</a></h2>
            <div class="mt-4">
                <p class="font-semibold" show-if="inParkAuction||masqueradeAuction||otherAuctionSupport">Yes! I will help secure auction items for:</p>

                <div class="mt-3 space-y-6">
                    <div show-if="inParkAuction">
                        <label class="flex items-center space-x-2 font-semibold">
                            <input disabled="disabled" type="checkbox" data-bind="inParkAuction" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                            <span class="text-gray-900">In the Park Auction <span class="text-sm font-normal">(August 14-31, during A Midsummer Night’s Dream)</span></span>
                        </label>

                        <ul class="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                            <li><span class="font-semibold">Goal:</span> To highlight the arts & culture ecosystem of New Haven.</li>
                            <li><span class="font-semibold">Experiential items:</span> We are seeking donations from local arts organizations (e.g., a class at CAW, NHSO family ticket bundle, Yale Rep tickets).</li>
                            <li><span class="font-semibold">Culinary items:</span> We are also securing gift certificate/card bundles and chef experiences.</li>
                        </ul>
                    </div>

                    <div show-if="masqueradeAuction">
                        <label class="flex items-center space-x-2 font-semibold">
                            <input disabled="disabled" type="checkbox" data-bind="masqueradeAuction" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                            <span class="text-gray-900">Masquerade Ball Auction <span class="text-sm font-normal">(Gems & Jewelry Focus)</span></span>
                        </label>

                        <ul class="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                            <li>Seeking jewelry, fine art, unique experiences, and luxury items.</li>
                        </ul>
                    </div>

                    <div show-if="otherAuctionSupport">
                        <label class="flex items-center space-x-2 font-semibold">
                            <input disabled="disabled" type="checkbox" data-bind="otherAuctionSupport" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                            <span class="text-gray-900">Other Auction Support</span>
                        </label>
                        

                        <textarea disabled="disabled" data-bind="auctionSupportMessage" rows="4"
                            class="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                </div>
            </div>
        </div>
        {/**  */}
        <div class="mb-32 bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 class="text-xl font-semibold">Sponsorship Outreach <a href="#" onClick={() => props.setStep(7)}>✏️edit</a></h2>

            <div class="mt-6">
                <p class="font-semibold" show-if="seasonSponsorship||masqueradeSponsorship||sponsorLeads||sponsorshipSupport">Yes! I will assist with sponsorship outreach for:</p>

                <div class="mt-3 space-y-4" show-if="seasonSponsorship">
                    <label class="flex items-center space-x-2">
                        <input disabled="disabled" type="checkbox" data-bind="seasonSponsorship" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                        <span class="text-gray-900">30th Anniversary Season Sponsorships</span>
                    </label>

                    <label class="flex items-center space-x-2" show-if="masqueradeSponsorship">
                        <input disabled="disabled" type="checkbox" data-bind="masqueradeSponsorship" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                        <span class="text-gray-900">Masquerade Ball Sponsorships</span>
                    </label>

                    <div class="flex items-center space-x-2" show-if="sponsorLeads">
                        <input disabled="disabled" type="checkbox" data-bind="sponsorLeads" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                        <span class="text-gray-900">I have sponsor leads to share:</span>
                        <input disabled="disabled" type="text" data-bind="sponsorLeadsInput" 
                            class="w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>

                    <label class="flex items-center space-x-2" show-if="sponsorshipSupport">
                        <input disabled="disabled" type="checkbox" data-bind="sponsorshipSupport" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                        <span class="text-gray-900">I need materials or support to approach sponsors</span>
                    </label>
                </div>
            </div>
    
        </div>
    </div>
)

function setStep(num) {
    State.set({
      "step": num,
      "stepNameNext": stepNames[num],
      "stepNameBack": stepNames[num - 1]
    })
}