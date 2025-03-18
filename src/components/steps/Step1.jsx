export let Step1 = (props) => (
	<>
		<div class="container">
			<div class="bg-white p-6 rounded-lg shadow-lg max-w-lg">
				<h2 class="font-bold text-lg mb-2">What’s Different This Year?</h2>
				<p class="text-gray-700 text-sm leading-relaxed">
					Elm Shakespeare is celebrating 30 years of bringing people together through
					Shakespeare’s words. This milestone is possible because of committed leaders like you.
					As a Board Member, your role is to ensure our mission continues and thrives.
				</p>
				<p class="mt-3 text-gray-700 text-sm leading-relaxed">
					We are asking you to make your 2025 Board Pledge and other commitments for
					this celebratory season by completing the enclosed form. This is how you
					lead by example and make a direct impact.
				</p>

				<p class="mt-6 text-gray-700 text-lg font-medium">
					Estimated time to complete: <span class="font-bold">10-15 minutes</span>
				</p>
			</div>


		</div>

		<div class="control-ui shadow-lg flex justify-center gap-4 mt-2 mb-2">
			<button onClick={() => props.setStep(0)} class="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 mt-5 rounded-lg text-sm font-medium transition">Back</button>

			<button onClick={() => props.setStep(2)} class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 mt-5 rounded-lg text-sm font-medium transition">View Commitment Opportunities</button>
		</div>
	</>
)