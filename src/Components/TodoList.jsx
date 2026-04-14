import { useState } from "react";
import { todos as initialTodos } from "../Data/todo";

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [inputValue, setInputValue] = useState("");

  // NEXT STEP 3: Filter state — track which tab is active ("all" | "active" | "completed")
  // const [filter, setFilter] = useState("all");

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

  // NEXT STEP 1: Toggle a todo's completed field by its id
  // const handleToggle = (id) => {
  //   setTodos(todos.map((todo) =>
  //     todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //   ));
  // };

  // NEXT STEP 2: Delete a todo by its id
  // const handleDelete = (id) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  // NEXT STEP 3: Derive the visible list based on the active filter
  // const visibleTodos = todos.filter((todo) => {
  //   if (filter === "active") return !todo.completed;
  //   if (filter === "completed") return todo.completed;
  //   return true; // "all"
  // });

  return (
    <div>
      <input value={inputValue} onChange={handleOnChange} />
      <button onClick={handleAddTodo}>add todo</button>

      {/* NEXT STEP 3: Filter tabs — swap `todos` below with `visibleTodos` once uncommented */}
      {/* <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div> */}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.todo}

            {/* NEXT STEP 1: Clicking the text (or a checkbox) toggles completed */}
            {/* Add onClick={() => handleToggle(todo.id)} to the <li> or a <input type="checkbox"> */}
            {/* Style completed todos: style={{ textDecoration: todo.completed ? "line-through" : "none" }} */}

            {/* NEXT STEP 2: Delete button per todo */}
            {/* <button onClick={() => handleDelete(todo.id)}>delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
