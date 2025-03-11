import {Step0} from "./steps/Step0.jsx";
import {Step1} from "./steps/Step1.jsx";
import {Step2} from "./steps/Step2.jsx";
import {Step3} from "./steps/Step3.jsx";
import {Step4} from "./steps/Step4.jsx";
import {Step5} from "./steps/Step5.jsx";
import {Step6} from "./steps/Step6.jsx";
import {Step7} from "./steps/Step7.jsx";
import {Step8} from "./steps/Step8.jsx";
import {Step9} from "./steps/Step9.jsx";
import {Step10} from "./steps/Step10.jsx";


const stepNames = [
  "Sign and Continue",
  "View Commitment Opportunities",
  "Next: Annual Campaign",
  "Next: Fundraising Support",
  "Next: Host a Gathering",
  "Next: Online Auctions",
  "Next: Sponsorship Outreach",
  "Next: Summary",
  "Next: Payment",
  "Complete My Pledge"
]

export let Form = () => (
    <Fragment>
        <div show-if="step==0"><Step0/></div>
        <div show-if="step==1"><Step1/></div>
        <div show-if="step==2"><Step2/></div>
        <div show-if="step==3"><Step3/></div>
        <div show-if="step==4"><Step4/></div>
        <div show-if="step==5"><Step5/></div>
        <div show-if="step==6"><Step6/></div>
        <div show-if="step==7"><Step7/></div>
        <div show-if="step==8"><Step8 setStep={setStep}/></div>
        <div show-if="step==9"><Step9/></div>
        <div show-if="step==10"><Step10/></div>
    </Fragment>
);

export let Nav = () => (
  <div class="control-ui shadow-lg flex justify-center gap-4 mt-2 mb-2">
    <button show-if="step>0" onClick={() => prevStep()} class="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 mt-5 rounded-lg text-sm font-medium transition">Back</button>

    <button show-if="step<10" onClick={() => nextStep()} class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 mt-5 rounded-lg text-sm font-medium transition" data-bind="stepNameNext"></button>
  </div>
)

jssLite({
  ".control-ui" : {
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    padding: "1em",
    background: "white"
  }
})

function setStep(num) {
    State.set({
      "step": num,
      "stepNameNext": stepNames[num],
      "stepNameBack": stepNames[num - 1]
    })
}

function nextStep() {
  let validity = validate("intro")
  console.log(validity);
  if(data.step <= 10 && validity) {
    const num = data.step += 1;
    State.set({
      "step": num,
      "stepNameNext": stepNames[num],
      "stepNameBack": stepNames[num - 1]
    })
  }
}

function prevStep() {
  if(data.step >= 1) {
    const num = data.step -= 1;
    State.set({
      "step": num,
      "stepNameNext": stepNames[num],
      "stepNameBack": stepNames[num - 1]
    })
  }
}

State.set({
  "step": data.step || 0,
  "stepNameNext": stepNames[data.step || 0],
  "stepNameBack": stepNames[(data.step || 0) - 1]
})
