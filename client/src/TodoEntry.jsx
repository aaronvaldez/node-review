import React from "react";

const TodoEntry = (props) => (
  <div>
    <button onClick={() => props.deleteTodo(props.index)}>&#10004;</button>{' '}
    {props.todo}
  </div>
)

export default TodoEntry;
