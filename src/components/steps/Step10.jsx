
export let Step10 = (props) => (
  <>
    <div class="container bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full" onShow={() => !State.get("submittedTimestamp") && sendDataToGoogleSheet()}>
        <h2 class="text-xl font-semibold">
        <span class="font-bold">Your pledge form <span show-if="!submittedTimestamp">is being sent.</span><span show-if="submittedTimestamp">has been received.</span></span>
        </h2>
      <div show-if="submittedTimestamp">
        <h3>We are reviewing your pledge, and will contact you soon.</h3>
          <p class="text-gray-700 mt-2">
          Your answers were submitted on <span data-bind="submittedTimestamp"></span>
          </p>
          
          <p style="display: flex; justify-content: center;">
            <img style="width:250px; height: auto;" src="/trophy.svg"></img>
          </p>
        <p class="text-gray-700 mt-2 mb-8">

          <b>Questions?</b><br/>Contact Alice-Anne &lt;<a href="mailto:aliceanne@elmshakespeare.org" class="text-blue-600 underline hover:text-blue-800">aliceanne@elmshakespeare.org</a>&gt;
        </p>
          <p>
          <button onClick={() => State.reset({ step: 0 })} class="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition">Reset form and start over</button>
          </p>
        </div>
    </div>
  </>
)

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
      State.set({
        "submittedTimestamp": new Date().toLocaleString()
      })
    }).catch(error => {
        alert("Try again");
        State.set({
          "step": 9
        })
    });
    

}