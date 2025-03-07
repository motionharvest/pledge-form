let totalAmt = State.get("totalAmt") || 0;
const checkAmt = () => {
    let total = 0;
    if(State.get("paymentOption") == "payToday") {
        if(State.get("step2_3_3000")) {
            total += 3000
        }
        if (State.get("step2_3_1000")) {
            total += 1000
        }
        if (State.get("step2_3_750")) {
            total += 750
        }
        if (State.get("step3_3_other-value")) {
            total += Number(State.get("step3_3_other-value"));
        }
    }
    
    if(State.get("oneTimeGiftToday")) {
      total += Number(State.get("totalPledgeCommitment"))
    }

    State.set({
        "totalAmt": total.toLocaleString()
    })
}

export let Step9 = () => (
    <div class="container bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full" onShow={()=>checkAmt()}>
        <h2 class="text-xl font-semibold">
            <span class="font-bold">Checkout Page</span>
            Pay today
            <div>Total Amt Today $<span data-bind="totalAmt"></span></div>
            <br/>
            Pay by check
        </h2>
    </div>
)


