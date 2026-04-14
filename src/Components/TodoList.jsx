import { useState } from "react";
import { todos as initialTodos } from "../Data/todo";

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [inputValue, setInputValue] = useState("");

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

  return (
    <div>
      <input value={inputValue} onChange={handleOnChange} />
      <button onClick={handleAddTodo}>add todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.todo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
