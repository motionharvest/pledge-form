import { TodoItem } from "./TodoItem";
const getTodos = () => State.get("todos") || [];

export const TodoApp = () => {
    return (
        <>
            <input type="text" data-bind="newTodoText" />
            <button onClick={() => {
                const newTodo = {
                    text: State.get("newTodoText"),
                    done: false,
                    id: Date.now()
                };
                State.set({ todos: [...getTodos(), newTodo] });
            }}>
                Add Todo
            </button>

            <ul>
                {getTodos().map(todo => (
                    <TodoItem key={todo.id} {...todo} />
                ))}
            </ul>
        </>
    );
};