import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

const todo = props => {
  const [todoName, setTodo] = useState("");
  //const [todoList, setTodoList] = useState([]);
  const inputChangeHandler = e => {
    setTodo(e.target.value);
  };

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "SET":
        return action.payload;
      case "REMOVE":
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

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
          //setTodoList(todoData);
          dispatch({ type: "SET", payload: todoData });
        })
        .catch(err => console.log(err));
    },
    [todoList]
  );

  const todoAddHandler = () => {
    //setTodoList(todoList.concat(todoName));
    dispatch({ type: "ADD", payload: todoName });
    setTodo("");
    axios
      .post("https://udemy-d3.firebaseio.com/todos.json", { name: todoName })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const removeTodoHandler = todoId => {
    axios
      .delete(`https://udemy-d3.firebaseio.com/todos/${todoId}.json`)
      .then(res => {
        dispatch({ type: "REMOVE", payload: todoId });
      })
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
          <li onClick={removeTodoHandler.bind(this, todo.id)} key={todo.id}>
            {todo.name}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default todo;
