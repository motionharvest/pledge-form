import { TodoItem } from "./TodoItem";

export const TodoApp = (props) => {
    let todos = State.get("todos") || [];

    // ✅ Subscribe to "todos" so UI updates reactively
    State.subscribe("todos", (newTodos) => {
        todos = newTodos;
    });

    const addTodo = (event) => {
        if (event.key === "Enter" && event.target.value.trim()) {
            State.set({
                todos: [...State.get("todos") || [], { text: event.target.value.trim(), completed: false, id: Date.now() }]
            });
            event.target.value = "";
        }
    };

    const toggleTodo = (id) => {
        State.set({
            todos: State.get("todos").map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        });
    };

    const deleteTodo = (id) => {
        State.set({ todos: State.get("todos").filter(todo => todo.id !== id) });
    };

    const clearCompleted = () => {
        State.set({ todos: State.get("todos").filter(todo => !todo.completed) });
    };

    const filter = State.get("filter") || "all";

    const filteredTodos = () => {
        return State.get("todos").filter(todo => {
            if (filter === "active") return !todo.completed;
            if (filter === "completed") return todo.completed;
            return true;
        });
    };

    return (
        <div class="todoapp w-full max-w-2xl mx-auto mt-10 shadow-lg">
            <header class="bg-white text-center py-6 shadow-md">
                <h1 class="text-5xl font-light text-red-500">todos</h1>
                <input
                    class="w-full px-5 py-3 text-lg italic text-gray-500 outline-none border-b"
                    placeholder="What needs to be done?"
                    onKeyPress={addTodo}
                />
            </header>

            <section class="bg-white shadow-md" show-if={() => State.get("todos").length > 0}>
                <ul class="divide-y divide-gray-300">
                    {filteredTodos().map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            toggleTodo={toggleTodo}
                            deleteTodo={deleteTodo}
                        />
                    ))}
                </ul>
                <footer class="flex items-center justify-between px-5 py-3 text-gray-600 bg-gray-100 text-sm">
                    <span>
                        {State.get("todos").filter(todo => !todo.completed).length} items left
                    </span>
                    <ul class="flex space-x-2">
                        <li><a onClick={() => State.set({ filter: "all" })} class-if={() => filter === "all" ? "border-red-400" : "border-transparent"}>All</a></li>
                        <li><a onClick={() => State.set({ filter: "active" })} class-if={() => filter === "active" ? "border-red-400" : "border-transparent"}>Active</a></li>
                        <li><a onClick={() => State.set({ filter: "completed" })} class-if={() => filter === "completed" ? "border-red-400" : "border-transparent"}>Completed</a></li>
                    </ul>
                    <button 
                        class="text-red-500 hover:underline"
                        onClick={clearCompleted}
                        show-if={() => State.get("todos").some(todo => todo.completed)}
                    >
                        Clear completed
                    </button>
                </footer>
            </section>
        </div>
    );
};
