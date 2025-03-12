export const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
    return (
        <li class="flex items-center px-5 py-3 hover:bg-gray-100"
            class-if={() => todo.completed ? "line-through text-gray-400 italic" : ""}>
            <input 
                type="checkbox" 
                onChange={() => toggleTodo(todo.id)}
                {...(todo.completed ? { checked: true } : {})} 
                class="mr-3 w-6 h-6 text-green-500 border rounded"
            />
            <span class="flex-grow">{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} class="text-red-500 text-xl">&times;</button>
        </li>
    );
};
