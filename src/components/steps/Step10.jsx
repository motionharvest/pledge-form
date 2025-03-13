export let Step10 = (props) => (
  <>
    <div class="container bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full" onShow={()=>sendToSheet()}>
        <h2 class="text-xl font-semibold">
            <span class="font-bold">Thank You</span>
        </h2>
    </div>
  </>
)

function sendToSheet() {
  alert("send logic here");
  State.set({

    "submittedTimestamp": "Put timestamp here"

  })
}