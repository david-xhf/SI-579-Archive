import { useState } from "react";

const AddTaskForm = ({ setTodoItems }) => {
  // @todo take care of adding the task inside this component.
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  // Start of a callback that might be useful!
  const addTask = () => {
    if (taskDescription) {
      setTodoItems((previousTodoItemsValue) => {
        // @todo this is where you add a new todo to the current ones,
        // so you'll want to
        // - Create a new todo item object with task, created, date, and time.
        // - Create an array that is that new object + all the items from previousTodoItemsValue
        //       lecture 16 has an example of that!
        // - return that new array
        // - somewhere in here you may want to update that localStorage. It's an array so you need to
        //   JSON.something() to it...
        localStorage.setItem('my-todo-items', JSON.stringify([
          {
            task: taskDescription,
            created: Date.now(),
            date: dueDate,
            time: dueTime || "ASAP",
          },
          ...previousTodoItemsValue
        ]));
        return [
          {
            task: taskDescription,
            created: Date.now(),
            date: dueDate,
            time: dueTime || "ASAP",
          },
          ...previousTodoItemsValue
        ]
      });
      setTaskDescription('');
      setDueDate('');
      setDueTime('');
    }
  }

  return (
    <section>
      <div className='input-group p-4'>
        {/* @todo this is the form for adding a task. Refer to the completed example to
                fill in blanks not covered here. Many of you may have an easier time focusing on
                the example vs these somewhat long instructions below. Do what works best for you!

                - Create text, date and time inputs for the task description, due date and due time
                - Create a submit button that is disabled unless the task description and due date are
                  not empty. (time can be empty, though)
                - when the form is submitted, it should add a task to the
                  `todoItems` state created in the `TodoList` component
                - When you add a TodoItem, update localStorage so it stores every todo item including
                  the one you just added.
                - After adding the
                - each todoItem is an object with 4 properties:
                    The first three are task, date and time, which correspond to the
                    three fields added here.
                    The fourth property is created, which is a timestamp of the moment the
                    task was added
                    {
                       task: THE TASK DESCRIPTION,
                        created: THE TIMESTAMP THIS WAS CREATED,
                        date: THE DATE THE ITEM IS DUE,
                        time: THE TIME THE ITEM IS DUE --or-- 'ASAP' if left blank,
                    }
                  - the description, date and time inputs should empty after adding the todo.
                */}
        <input onChange={(e) => setTaskDescription(e.target.value)} className="form-control w-25" type="text" placeholder="Task Description" value={taskDescription}></input>
        <input onChange={(e) => setDueDate(e.target.value)} className="form-control" type="date" value={dueDate}></input>
        <input onChange={(e) => setDueTime(e.target.value)} className="form-control" type="time" value={dueTime}></input>
        <button onClick={addTask} className="btn btn-primary" disabled={!(taskDescription && dueDate)}>Add Task</button>
      </div>
    </section>)
}

export default AddTaskForm;
