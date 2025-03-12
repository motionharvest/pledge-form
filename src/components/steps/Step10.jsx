export let Step10 = (props) => (
  <>
    <div class="container bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 class="text-xl font-semibold">
            <span class="font-bold">Thank You</span>
        </h2>
    </div>
    <div class="control-ui shadow-lg flex justify-center gap-4 mt-2 mb-2">
            <button onClick={() => props.setStep(9)} class="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 mt-5 rounded-lg text-sm font-medium transition">Back</button>
        </div>
    </>
)