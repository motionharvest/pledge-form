export let Step2 = (props) => (
  <>
    <div class="container mb-32 md:mb-4">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 class="text-xl font-semibold">Great Give - Director’s Circle</h2>
            <p class="text-gray-700 mt-1">Three ways to support Elm Shakespeare during the Great Give (May 7 and 8)</p>

            
            <div class="mt-6">
                <h3 class="font-bold">1- Your Impact in Action</h3>
                    <p class="text-gray-700 text-sm">Be part of the impact! During Teen Troupe’s dress rehearsal of Twelfth Night, we’re rallying support for Elm Shakespeare. Every donation made during dress rehearsal will receive a personal thank-you/shout out from the Teen Troupe.  8pm - 9pm is also the hour when the arts organization that has the most unique donors wins a $5,000 match prize from Bank of America.</p>

                <p class="mt-4 font-semibold">💙 Board Member Commitment</p>
                <div class="mt-2">
                    <label class="flex space-x-2 items-start">
                        <input type="checkbox" class="w-5 h-5 shrink-0 text-indigo-600 border-gray-300 rounded" data-bind="step2_1_yes"></input>
                        <span class="text-gray-700 text-sm">Yes, I’ll reach out to 3-5 friends or colleagues and encourage them to give on May 7 between 8 and 9pm, and I’ll post on my social media, email, and phone my network to spread the word and encourage participation.</span>
                    </label>
                </div>
            </div>

            
            <div class="mt-6">
                <h3 class="font-bold">2- Pub Sing</h3>
                <p class="text-gray-700 text-sm">Join us for a night of laughter and song and help us close out the Great Give.</p>

                <p class="mt-2 font-semibold">Details</p>
                <p class="text-sm text-gray-700">May 8, 2025 - 5:30pm<br/>Location to be determined</p>

                <div class="mt-2">
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" data-bind="step2_2_yes" ></input>
                        <span class="text-gray-700 text-sm">Yes, I’ll attend and bring a guest</span>
                    </label>
                </div>
            </div>

            
            <div class="mt-6">
                <h3 class="font-bold">3- Gift/Pledge</h3>
                <p class="text-gray-700 text-sm">Pledge a donation to help us meet matching challenges and inspire others.</p>

                <div class="mt-3 space-y-2">
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" data-bind="step2_3_3000"></input>
                        <span class="text-gray-700 text-sm">$3,000</span>
                    </label>

                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" data-bind="step2_3_1000"></input>
                        <span class="text-gray-700 text-sm">$1,000</span>
                    </label>

                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" data-bind="step2_3_750"></input>
                        <span class="text-gray-700 text-sm">$750</span>
                    </label>

                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="w-5 h-5 text-indigo-600 border-gray-300 rounded" data-bind="step2_3_other"></input>
                        <span class="text-gray-700 text-sm">Other $</span>
                        <input type="text" class="w-20 px-2 py-1 text-sm border border-gray-300 rounded-lg" data-bind="step3_3_other-value">{State.get("step3_3_other-value")}</input>
                    </label>
                </div>
            </div>
            <div class="mt-6">
            <p class="font-semibold">Payment Options:</p>

            <div class="mt-3 space-y-2">
                <label class="flex items-center space-x-2">
                    <input type="radio" name="paymentOption" value="payToday" data-bind="paymentOption" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                    <span class="text-gray-900">Pay today</span>
                </label>

                <label class="flex items-center space-x-2">
                    <input type="radio" name="paymentOption" value="payLater" data-bind="paymentOption" class="w-5 h-5 text-indigo-600 border-gray-300 rounded"/>
                    <span class="text-gray-900">Pay later</span>
                </label>
            </div>
        </div>
        </div>
    </div>
    
    <div class="control-ui shadow-lg flex justify-center gap-4 mt-2 mb-2">
            <button onClick={() => props.setStep(1)} class="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition">Back</button>
            <button onClick={() => props.setStep(3)} class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition">Next: Annual Campaign</button>
    </div>
    </>
)