export const Intro = () => {

	return (
		<>
			<button show-if="!helping" onClick={() => State.set({ helping: true })} class="z-50 absolute top-4 right-4 text-gray-300 hover:text-white transition">
				<img src="/icons8-help-50.png" style="height: 40px; width: 40px;" alt="" />
			</button>
			<div show-if="helping || firstView" class="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
				<div class="max-w-2xl">
					<h1 class="text-4xl font-bold mb-4">2025 Board Pledge Form</h1>
					<p class="text-lg text-gray-300 mb-6">
						Welcome! We've simplified the 2025 board commitment process with this secure digital form. It captures both monetary contributions and other ways you can support our efforts this year.
						<br />
						<br />
						Things to know:
					</p>
					<ul class="text-left text-gray-300 space-y-2 mb-6">
						<li class="flex items-start"><span class="text-green-400 mr-2">🟢</span> Navigation will be located at the bottom of your screen</li>
						<li class="flex items-start"><span class="text-green-400 mr-2">🟢</span> Your answers are saved automatically. You can skip ahead and come back</li>
						<li class="flex items-start"><span class="text-green-400 mr-2">🟢</span> You will see a thank you screen when you have completed your form</li>
						<li class="flex items-start"><span class="text-green-400 mr-2">🟢</span> This can securely capture both pledges and payments</li>

					</ul>
					<button onClick={() => State.set({ "helping": false, "firstView": false })} class="px-6 mt-8 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-lg transition">
						Continue
					</button>
				</div>
			</div>

		</>
	)
}