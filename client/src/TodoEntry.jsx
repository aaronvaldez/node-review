import React from "react";

function TodoEntry(props) {
  return (
    <div>
      <button onClick={() => props.deleteTodo(props.index)}>&#10004;</button>{' '}
      {props.todo}
    </div>
  );
}

export default TodoEntry;
