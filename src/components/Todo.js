import React, { useState } from "react";

const todo = props => {
  const [todoName, setTodo] = useState("");
  const inputChangeHandler = e => {
    setTodo(e.target.value);
  };
  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button type="button">Add</button>
      <ul />
    </React.Fragment>
  );
};

export default todo;
