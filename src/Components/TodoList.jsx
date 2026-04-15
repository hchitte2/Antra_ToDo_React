import { useState } from "react";
import { todos as initialTodos } from "../Data/todo";

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;

    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        todo: inputValue,
        completed: false,
        userId: 0,
      },
    ]);

    setInputValue("");
  };

  const handleToggle = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all"
  });

  return (
    <div>
      <input value={inputValue} onChange={handleOnChange} />
      <button onClick={handleAddTodo}>add todo</button>

      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <ul>
        {visibleTodos.map((todo) => (
          <li 
            key={todo.id}
            onClick={() => handleToggle(todo.id)}
            style={{ 
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
              padding: "5px",
              marginBottom: "5px"
            }}
          >
            {todo.todo}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(todo.id);
              }}
              style={{ marginLeft: "10px", cursor: "pointer" }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
