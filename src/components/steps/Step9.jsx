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

const sendDataToGoogleSheet = () => {
    
    const fieldOrder = [
        "step0_name", "step0_email", "step0_phone", "step0_agree",
        "step2_1_yes", "step2_2_yes",
        "step2_3_3000", "step2_3_1000", "step2_3_750", "step2_3_other",
        "step3_3_other-value", "paymentOption",
        "totalPledgeCommitment", "oneTimeGiftToday", "oneTimeGift", "oneTimeGiftDate",
        "monthlyPayments", "monthlyPaymentAmount", "monthlyPaymentStartDate",
        "quarterlyPayments", "quarterlyPaymentAmount", "quarterlyPaymentStartDate",
        "otherPaymentSchedule", "otherPaymentDetails",
        "wineContribution", "wineBottleCount", "wineDeliveryDate",
        "giftCardContribution", "restaurantNames", "giftCardDeliveryDate",
        "hostFundraisingGathering", "preferredDates",
        "attendFundraisingEvent", "partyHostNomination",
        "inParkAuction", "masqueradeAuction", "otherAuctionSupport", "auctionSupportMessage",
        "seasonSponsorship", "masqueradeSponsorship", "sponsorLeads", "sponsorLeadsInput", "sponsorshipSupport"
    ];

    // Collect data in order
    const formData = {};
    fieldOrder.forEach(key => {
        data[key] = State.get(key) || ""; // Get value using State.get()
    });

    // Send data to Google Sheets
    fetch("https://script.google.com/macros/s/AKfycbw67XYbLzAqgZMX_D91uH2rprQefoLbz8u6kjr_K5z-srtM0FxJPD1PR0DpvjNraj8y/exec", {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(() => {
        alert("Form submitted!");
    }).catch(error => {
        alert("Error submitting form");
    });
    

}

window.addEventListener("message", (event) => {
    if(event.data == "PaymentSubmitted") {
        State.set({
            payNowSubmitted: true
        })
    }
});

export let Step9 = (props) => (
  <>
    <div class="container mb-32 bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full" onShow={() => checkAmt()}>
        <button onClick={sendDataToGoogleSheet} class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 mt-2 rounded-lg transition">Send data to google sheet</button>
        <h2 class="text-xl font-semibold">Payment Methods</h2>

        <p class="text-gray-700 mt-2">
            Thank you for your leadership and commitment to Elm Shakespeare. Your generosity, time, and
            connections make everything we do possible—from free Shakespeare in the Park to life-changing
            education programs. Because of you, our 30th Anniversary season will be one to remember. We are
            deeply grateful for your support and partnership in this work!
        </p>

        <div class="mt-6">
            <p class="font-semibold text-lg"><span show-if="payNowSubmitted != true">Pay</span><span show-if="payNowSubmitted">Paid</span> today: $<span class="font-bold" data-bind="totalAmtToday"></span></p>

            <button show-if="payNowSubmitted != true" onClick={openDonorsnapForm} class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 mt-2 rounded-lg transition">
                Open Credit/ACH Payment Form
            </button>
            <label class="flex items-start space-x-2 mt-4">
                <input type="checkbox" disabled="disabled" data-bind="payNowSubmitted" class="w-5 h-5 text-indigo-600 border-gray-300 rounded mt-1" />
                <div>
                    <span class="font-semibold text-gray-900">Payment sent</span>
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
    <div class="control-ui shadow-lg flex justify-center gap-4 mt-2 mb-2">
            <button onClick={() => props.setStep(8)} class="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 mt-5 rounded-lg text-sm font-medium transition">Back</button>

            <button onClick={() => props.setStep(10)} class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 mt-5 rounded-lg text-sm font-medium transition">Complete My Pledge</button>
        </div>
    </>
)


