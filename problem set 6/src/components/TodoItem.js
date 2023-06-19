const TodoItem = (props) => {
  // @TODO this should return JSX that results in the following markup
  //       <li> THE-TASK-NAME <span class='px-2'>THE-DATE THE-TIME</span>
  //           <button class='btn btn-sm btn-danger done type="button">
  //               Done
  //           </button>
  //      </li>

  // The "Done" button must remove the todo item from state AND localStorage.

  // @tip the JSX will have more in it than just the markup above
  // @tip, even if the button is displayed by this component, the click behavior
  // can be managed elsewhere.

  return (
    <li>{props.task}<span className='px-2'>{props.date} {props.time}</span>
      <button onClick={props.remove} className='btn btn-sm btn-danger done' type="button">Done</button>
    </li>
  )
}

export default TodoItem;
