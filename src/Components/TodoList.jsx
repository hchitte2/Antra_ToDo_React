import { useReducer } from "react";
import { todos as initialTodos } from "../Data/todo";

const initialState = {
  todos: initialTodos,
  inputValue: "",
  filter: "all",
};

function todoReducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, inputValue: action.payload };
    case "ADD_TODO":
      if (!state.inputValue.trim()) return state;
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.length + 1,
            todo: state.inputValue,
            completed: false,
            userId: 0,
          },
        ],
        inputValue: "",
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

const TodoList = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todos, inputValue, filter } = state;

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => dispatch({ type: "SET_INPUT", payload: e.target.value })}
      />
      <button onClick={() => dispatch({ type: "ADD_TODO" })}>add todo</button>

      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <button onClick={() => dispatch({ type: "SET_FILTER", payload: "all" })}>All</button>
        <button onClick={() => dispatch({ type: "SET_FILTER", payload: "active" })}>Active</button>
        <button onClick={() => dispatch({ type: "SET_FILTER", payload: "completed" })}>Completed</button>
      </div>

      <ul>
        {visibleTodos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
              padding: "5px",
              marginBottom: "5px",
            }}
          >
            {todo.todo}
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "DELETE_TODO", payload: todo.id });
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
