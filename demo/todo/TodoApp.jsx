import { TodoItem } from "./TodoItem";

export const TodoApp = (props) => {
    let todos = [];
    let key = State.get("TodoKey") || 0;

    function addTodo(evt) {
        todos.push({
            todo: evt.currentTarget.value,
            key: key++
        });

        State.set({
            "Todos" : todos,
            "TodoKey": key
        });
    }

    return (
        <>
            <h1>Todo app in the works</h1>
            <div>
                <input type="text" placeholder="What needs done ..."></input>
                <button onClick={addTodo}>Add</button>
            </div>
            <div>
                <h2>Todos</h2>
                {todos.map((i)=>{
                    return (
                        <TodoItem todo={i.todo}/>
                    )
                })}
            </div>
        </>
    )
};
