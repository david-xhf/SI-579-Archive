import TodoItem from "./components/TodoItem";
import AddTaskForm from "./components/AddTaskForm";
import { defaultTasks } from "./fixtures/defaultTasks";
import { useState } from "react";

// @todo this is the top level component you'll be working on.
function TodoList() {

  // @todo create state for `todoItems`. 
  //   - If the 'my-todo-items' item in localStorage exists, that should be the default value of `todoItems`
  //   - If that item does not exist in localStorage, the default value should be the
  //       array exported from fixtures/defaultTasks.js
  //   - If there are todo items in local storage, you probably gotta JSON.something() it.


  // a to remove a todo item should probably happen here, which can get passed to each todo item
  const [todoItems, setTodoItems] = useState(JSON.parse(localStorage.getItem('my-todo-items')) || defaultTasks)
  const handleRemove = (key) => {
    localStorage.setItem('my-todo-items', JSON.stringify(todoItems.filter((task, index) => index !== key)));
    setTodoItems(JSON.parse(localStorage.getItem('my-todo-items')));
  }
  return (
    <main className='container'>
      <ul className='row'>
        {todoItems.map((task, index) => <TodoItem remove={() => handleRemove(index)} key={index} task={task.task} created={task.created} date={task.date} time={task.time}></TodoItem>)}
      </ul>
      {/* @todo there needs to be an <AddTaskForm> component here
         (a starter <AddTaskForm> component with this name is already created in src/components) */}
      <AddTaskForm setTodoItems={setTodoItems}></AddTaskForm>
    </main>);
}

export default TodoList;
