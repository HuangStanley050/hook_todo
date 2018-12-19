import React, { useState, useEffect } from "react";
import axios from "axios";

const todo = props => {
  const [todoName, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const inputChangeHandler = e => {
    setTodo(e.target.value);
  };
  useEffect(
    () => {
      axios
        .get("https://udemy-d3.firebaseio.com/todos.json")
        .then(res => {
          const todos = res.data;
          const todoData = [];
          for (let key in todos) {
            todoData.push({ id: key, name: todos[key].name });
          }
          setTodoList(todoData);
        })
        .catch(err => console.log(err));
    },
    [todoList]
  );
  const todoAddHandler = () => {
    //setTodoList(todoList.concat(todoName));
    setTodo("");
    axios
      .post("https://udemy-d3.firebaseio.com/todos.json", { name: todoName })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  //const [todoState, setTodoState] = useState({ userInput: "", todoList: [] });
  //one state instead of multiple states

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
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default todo;
