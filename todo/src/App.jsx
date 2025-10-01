import React from 'react';
import { useState } from 'react';
import './App.css';
import { li } from 'framer-motion/client';

function App() {
  
  let [todolist, setTodolist] = useState([]);
  let saveToDoList = (e) => {

    let task = e.target.totask.value;

    if(!todolist.includes(task)){

      setTodolist([...todolist, task]);
      e.target.reset();

    }else {
      alert("Task already exists");
    }

    e.preventDefault();
  }
  function ToDoListItems({ value, indexNumber, todolist, setTodolist }) {
    let removeTask = () => {
      setTodolist(todolist.filter((_, index) => index !== indexNumber));
    }
    return (
       <li>{value} <span onClick={removeTask} >X</span></li>
    )
  }
  let list = todolist.map((value, index) => {

    return <ToDoListItems key={index} value={value} indexNumber={index} 
    todolist={todolist} setTodolist={setTodolist} 
    />
  })
  return (
    <div className="App">
      <h1>To Do App</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" name="totask" placeholder="Add a new task" />
        <button type="submit">Add</button>
      </form>

      <div className="outerDiv">
        <ul>
          {list}

        </ul>
      </div>
    </div>
  )
}

export default App;