
// Log the reactive data object
console.log(data);

let Goober = () => (
    <div style="color:red" data-bind="linked">{State.get('linked')}</div>
);


let App = () => (
    <div>
        <input type="text" data-bind="linked" value={State.get('linked')}/>
        <div class="binder" data-bind="linked">{data.linked}</div>
        <button onclick={() => console.log(State.get('linked'))}>Check linked</button>
        <button onclick={() => console.log(State.get('newProperty'))}>Check newProperty</button>
        <Goober />
    </div>
);


let yes = jssLite({
    ".binder": {
        color: "Orange"
    }
})

setTimeout(function(){
    yes.remove();
}, 2000)

document.body.appendChild(<App />);