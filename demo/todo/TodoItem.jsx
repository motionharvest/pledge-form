export const TodoItem = (props) => {

    return (
       <>
        <div show-if={`!Todo_${props.key}_done`}>
            <input type="checkbox" data-bind={`TodoCheckbox_${props.key}`}></input>
            <span class-if={`TodoCheckbox_${props.key}?strike:normal`}>{props.text}</span> 
            <button show-if={`TodoCheckbox_${props.key}`} onClick={() => State.set({ [`Todo_${props.key}_done`]: true })}> ❌ </button>
        </div>
       </>
    );
};

jssLite({
    ".strike": {
        "text-decoration": "line-through"
    }
})