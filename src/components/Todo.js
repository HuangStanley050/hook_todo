import React, { useState } from "react";

const todo = props => {
  const [todoName, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const inputChangeHandler = e => {
    setTodo(e.target.value);
  };
  const todoAddHandler = () => {
    setTodoList(todoList.concat(todoName));
    setTodo("");
  };
  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button onClick={todoAddHandler} type="button">
        Add
      </button>
      <ul>
        {todoList.map(todo => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default todo;
