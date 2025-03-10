export let Form = () => (
    <Fragment>
        <h2>Persistent Checkbox</h2>
        <label>
            <input type="checkbox" data-bind="isChecked" />
            Remember me
        </label>
        <p>Checkbox is {State.get('isChecked') ? "Checked" : "Unchecked"}</p>

        <h2>Persistent Date Picker</h2>
        <input type="date" data-bind="selectedDate" />
        <p>Selected Date: {State.get('selectedDate') || "None"}</p>

        <h2>Debugging</h2>
        <button onClick={() => console.log(State.getData())}>Log State</button>
    </Fragment>
);

jssLite({
  ".torture": {
    border: "solid 1px red"
  }
})

export let Nav = () => (
  <>
    <button onClick={()=>{State.set({"step": State.get("step")})}}>Next Step</button>
  </>
)