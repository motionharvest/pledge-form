let totalAmtToday = State.get("totalAmtToday") || 0;
let totalAmtLater = State.get("totalAmtLater") || 0;

const checkAmt = () => {
    let tallyToday = 0;
    let tallyLater = 0;

    if(State.get("paymentOption") == "payToday") {
        if(State.get("step2_3_3000")) {
            tallyToday += 3000
        }
        if (State.get("step2_3_1000")) {
            tallyToday += 1000
        }
        if (State.get("step2_3_750")) {
            tallyToday += 750
        }
        if (State.get("step3_3_other-value")) {
            tallyToday += Number(State.get("step3_3_other-value"));
        }
    } else {
        if (State.get("step2_3_3000")) {
            tallyLater += 3000
        }
        if (State.get("step2_3_1000")) {
            tallyLater += 1000
        }
        if (State.get("step2_3_750")) {
            tallyLater += 750
        }
        if (State.get("step3_3_other-value")) {
            tallyLater += Number(State.get("step3_3_other-value"));
        }
    }
    
    if(State.get("oneTimeGiftToday")) {
        tallyToday += Number(State.get("totalPledgeCommitment"))
    } else {
        tallyLater += Number(State.get("totalPledgeCommitment"))
    }

    State.set({
        "tallyToday": tallyToday,
        "totalAmtToday": tallyToday.toLocaleString(),
        "totalAmtLater": tallyLater.toLocaleString()
    })
}

const openDonorsnapForm = () => {
    let fullName = State.get("step0_name").trim();
    let [firstName, lastName] = fullName.split(/\s+(.+)/)
    let email = State.get("step0_email").trim();
    let phone = State.get("step0_phone").trim();
    let url = `https://forms.donorsnap.com/form?id=bea499a2-6931-4125-9d55-9a14bcf43c3a&firstName=${firstName}&lastName=${lastName}&email=${email}&phone=${phone}&amount=${State.get("tallyToday")||0}`
    
    window.open(url);
    
}

export let Step9 = () => (
    <div class="container mb-32 bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full" onShow={()=>checkAmt()}>

        <h2 class="text-xl font-semibold">Payment Methods</h2>

        <p class="text-gray-700 mt-2">
            Thank you for your leadership and commitment to Elm Shakespeare. Your generosity, time, and
            connections make everything we do possible—from free Shakespeare in the Park to life-changing
            education programs. Because of you, our 30th Anniversary season will be one to remember. We are
            deeply grateful for your support and partnership in this work!
        </p>

        <div class="mt-6">
            <p class="font-semibold text-lg"><span show-if="!payNowSubmitted">Pay</span><span show-if="payNowSubmitted">Paid</span> today: $<span class="font-bold" data-bind="totalAmtToday"></span></p>

            <button onClick={openDonorsnapForm} class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 mt-2 rounded-lg transition">
                Open Credit/ACH Payment Form
            </button>
            <label class="flex items-start space-x-2 mt-4">
                <input type="checkbox" data-bind="payNowSubmitted" class="w-5 h-5 text-indigo-600 border-gray-300 rounded mt-1" />
                <div>
                    <span class="font-semibold text-gray-900">Payment sent</span>
                    <p class="text-gray-600 text-sm italic">Click here after filling out the Credit/ACH Payment Form</p>
                </div>
            </label>
        </div>

        <div class="mt-6">
            <p class="font-semibold text-lg">Pay later: $<span class="font-bold" data-bind="totalAmtLater"></span></p>

            <div class="mt-4 space-y-4">
                <label class="flex items-start space-x-2">
                    <input type="checkbox" data-bind="payLaterCheck" class="w-5 h-5 text-indigo-600 border-gray-300 rounded mt-1" />
                    <div>
                        <span class="font-semibold text-gray-900">I’ll pay later via Check</span>
                        <p class="text-gray-600 text-sm italic">Make checks payable to Elm Shakespeare Company</p>
                    </div>
                </label>

                <label class="flex items-start space-x-2">
                    <input type="checkbox" data-bind="payLaterStockTransfer" class="w-5 h-5 text-indigo-600 border-gray-300 rounded mt-1" />
                    <div>
                        <span class="font-semibold text-gray-900">I’ll pay later via Stock Transfer</span>
                        <button class="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 mt-2 rounded-lg transition flex items-center justify-center">
                            <span class="mr-4 ml-4">Download Stock Transfer Form</span>
                        </button>
                    </div>
                </label>

                <label class="flex items-start space-x-2">
                    <input type="checkbox" data-bind="payLaterDAF" class="w-5 h-5 text-indigo-600 border-gray-300 rounded mt-1" />
                    <div>
                        <span class="font-semibold text-gray-900">I’ll pay later via Donor-Advised Fund</span>
                        <p class="text-gray-600 text-sm italic">We’ll reach out to you for more information</p>
                    </div>
                </label>
            </div>
        </div>
    </div>
)


