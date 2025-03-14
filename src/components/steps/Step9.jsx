let totalAmtToday = State.get("totalAmtToday") || 0;
let totalAmtLater = State.get("totalAmtLater") || 0;

const checkAmt = (props) => {
    
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
        tallyToday += Number(State.get("totalPledgeCommitment")) || 0
    } else {
        tallyLater += Number(State.get("totalPledgeCommitment")) || 0
    }

    State.set({
        "tallyToday": tallyToday,
        "totalAmtToday": tallyToday.toLocaleString(),
        "totalAmtLater": tallyLater.toLocaleString()
    })
}
let childWindow;
const openDonorsnapForm = () => {
    let fullName = State.get("step0_name").trim();
    let [firstName, lastName] = fullName.split(/\s+(.+)/)
    let email = State.get("step0_email").trim();
    let phone = State.get("step0_phone").trim();
    let url = `https://forms.donorsnap.com/form?id=bea499a2-6931-4125-9d55-9a14bcf43c3a&firstName=${firstName}&lastName=${lastName}&email=${email}&phone=${phone}&amount=${State.get("tallyToday")||0}`
    
    childWindow = window.open(url, "meaningfulName");
    
}

const showFormOpenButton = () => {
  let tat = State.get("totalAmtToday");
  let tat_int = parseInt(tat.replace(/,/g, ""), 10);
  let pns = State.get("payNowSubmitted");
  
  if (tat_int > 0 && !pns) {
    return true
  } else {
    return false
  }
}

window.addEventListener("message", (event) => {
    console.log("message Posted", event)
    if(event.data == "PaymentSubmitted") {
        State.set({
            payNowSubmitted: true
        })
    }
});

export let Step9 = (props) => (
  <>
        <div class="container mb-32 md:mb-4 bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full" onShow={() => checkAmt()}>

        <h2 class="text-xl font-semibold">Payment Methods</h2>

        <p class="text-gray-700 mt-2">
            Thank you for your leadership and commitment to Elm Shakespeare. Your generosity, time, and
            connections make everything we do possible—from free Shakespeare in the Park to life-changing
            education programs. Because of you, our 30th Anniversary season will be one to remember. We are
            deeply grateful for your support and partnership in this work!
        </p>

        <div class="mt-6">
            <p class="font-semibold text-lg"><span show-if="!payNowSubmitted">Pay</span><span show-if="payNowSubmitted">Paid</span> today: $<span class="font-bold" data-bind="totalAmtToday"></span></p>

                <button show-if="!payNowSubmitted && totalAmtToday>0" onClick={openDonorsnapForm} class="p-4 pl-12 pr-12 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition">Open Payment Form</button>
                <div show-if="!payNowSubmitted" class="mt-4">If you submitted your payment and are stuck on this screen <span class="underline "><a href="#" onClick={() => State.set({payNowSubmitted: true})}>click here.</a></span></div>

                <label class="flex items-start space-x-2 mt-4" show-if="payNowSubmitted">
                <input type="checkbox" disabled="disabled" data-bind="payNowSubmitted" class="fadeIn w-5 h-5 text-indigo-600 border-gray-300 rounded mt-1" />
                    
                <div>
                        <span class="fadeIn font-semibold text-gray-900">Payment sent</span>
                </div>
            </label>
        </div>

        <div class="mt-6">
            <p class="font-semibold text-lg">Pay later: $<span class="font-bold" data-bind="totalAmtLater"></span></p>

            <div class="mt-4 space-y-4">
                <label class="flex items-start space-x-2">
                    <input type="checkbox" data-bind="payLaterCheck" class="w-5 h-5 text-indigo-600 border-gray-300 rounded mt-1" />
                    <div>
                        <span class="font-semibold text-gray-900">I’ll pay via Check</span>
                        <p class="text-gray-600 text-sm italic">Make checks payable to Elm Shakespeare Company</p>
                    </div>
                </label>

                <label class="flex items-start space-x-2">
                    <input type="checkbox" data-bind="payLaterStockTransfer" class="w-5 h-5 text-indigo-600 border-gray-300 rounded mt-1" />
                    <div>
                        <span class="font-semibold text-gray-900">I’ll pay later via Stock Transfer</span>
                            <p class="text-gray-600 text-sm italic">We’ll reach out to you for more information</p>
                        {/* <button class="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 mt-2 rounded-lg transition flex items-center justify-center">
                            <span class="mr-4 ml-4">Download Stock Transfer Form</span>
                        </button> */}
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
    <div class="control-ui shadow-lg flex justify-center gap-4 mt-2 mb-2">
            <button onClick={() => props.setStep(8)} class="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition">Back</button>

            <button show-if="payNowSubmitted || totalAmtToday==0" onClick={() => props.setStep(10)} class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition">Complete My Pledge</button>

            <button show-if="!payNowSubmitted && totalAmtToday>0" onClick={openDonorsnapForm} class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium transition">Open Payment Form</button>
        </div>
    </>
)


