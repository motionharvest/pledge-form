let totalAmt = State.get("totalAmt") || 0;
const checkAmt = () => {
    console.log("called checkAmt")
    let total = 0;
    if(State.get("paymentOption") == "payToday") {
        if(State.get("step2_3_1000")) {
            total += 1000
        }
    }

    State.set({
        "totalAmt": total
    })
}

export let Step9 = () => (
    <div class="container bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full" onShow={()=>checkAmt()}>
        <h2 class="text-xl font-semibold">
            <span class="font-bold">Checkout Page</span>
            <div>Total Amt Today <span data-bind="totalAmt"></span>What!?</div>
        </h2>
    </div>
)


