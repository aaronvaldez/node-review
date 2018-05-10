import React from "react";

import TodoEntry from "./TodoEntry.jsx";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
      todos: []
    };
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  handleInput(e) {
    this.setState({ todo: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ todos: [...this.state.todos, this.state.todo] });
    e.target.reset();
  }

  deleteTodo(index) {
    const todos = this.state.todos.slice();
    todos.splice(index, 1);
    this.setState({ todos });
  }

  render() {
    return (
      <div>
        <h1>My Todo List</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          Add todo: <input onKeyUp={e => this.handleInput(e)} required />
          <button>&#10010;</button>
        </form>
        <br />
        <div>
          {this.state.todos.map((todo, index) => (
            <TodoEntry
              key={index}
              todo={todo}
              index={index}
              deleteTodo={this.deleteTodo}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default TodoList;
