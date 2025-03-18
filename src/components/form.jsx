import { Step0 } from "./steps/Step0.jsx";
import { Step1 } from "./steps/Step1.jsx";
import { Step2 } from "./steps/Step2.jsx";
import { Step3 } from "./steps/Step3.jsx";
import { Step4 } from "./steps/Step4.jsx";
import { Step5 } from "./steps/Step5.jsx";
import { Step6 } from "./steps/Step6.jsx";
import { Step7 } from "./steps/Step7.jsx";
import { Step8 } from "./steps/Step8.jsx";
import { Step9 } from "./steps/Step9.jsx";
import { Step10 } from "./steps/Step10.jsx";



export let Form = () => (
	<Fragment>
		<div show-if="step==0 && !helping"><Step0 setStep={setStep} /></div>
		<div show-if="step==1 && !helping"><Step1 setStep={setStep} /></div>
		<div show-if="step==2 && !helping"><Step2 setStep={setStep} /></div>
		<div show-if="step==3 && !helping"><Step3 setStep={setStep} /></div>
		<div show-if="step==4 && !helping"><Step4 setStep={setStep} /></div>
		<div show-if="step==5 && !helping"><Step5 setStep={setStep} /></div>
		<div show-if="step==6 && !helping"><Step6 setStep={setStep} /></div>
		<div show-if="step==7 && !helping"><Step7 setStep={setStep} /></div>
		<div show-if="step==8 && !helping"><Step8 setStep={setStep} /></div>
		<div show-if="step==9 && !helping"><Step9 setStep={setStep} /></div>
		<div show-if="step==10 && !helping"><Step10 setStep={setStep} /></div>
	</Fragment>
);

export let Shield = () => (
	<div show-if="submittedTimestamp" class="shadow-lg flex justify-center gap-4 mt-2 mb-2">
		<h1>Thank you for your submission</h1>
		<p>Sent sucessfully on <span data-bind="submittedTimeStamp"></span></p>
		<button onClick={resetForm}>Reset form</button>
	</div>
)

function setStep(num) {
	State.set({
		"step": num
	})
}

function resetForm() {
	State.reset({
		"step": 0
	})
}
