import React from "react";
import axios from 'axios';

import TodoEntry from "./TodoEntry.jsx";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
      todos: []
    };
    this.deleteTodo = this.deleteTodo.bind(this);
    this.listName = this.props.history.location.pathname.substr(10);
  }

  componentDidMount() {
    axios.get('/api/todolist', { params: { listName: this.listName } })
    .then(result => this.setState({ todos: result.data }))
    .catch(err => this.props.history.push('/'));
  }

  handleInput(e) {
    this.setState({ todo: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { todo, todos } = this.state;
    const listName = this.props.location.pathname.substr(10);
    axios.post('/api/todolist', { todo, listName: this.listName })
    .catch(err => console.error(err));
    this.setState({ todos: [...todos, todo] });
    e.target.reset();
  }

  deleteTodo(index) {
    axios.delete('/api/todolist', { params: { index, listName: this.listName } })
    .then(result => this.setState({ todos: result.data }))
    .catch(err => console.error(err));
  }

  handleBackClick() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <button onClick={() => this.handleBackClick()}>Back</button>
        <h1>{this.listName.toUpperCase()}</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          Add todo: <input onKeyUp={e => this.handleInput(e)} required />
          <button>&#10010;</button>
        </form>
        <br />
        <div>
          {this.state.todos && this.state.todos.map((todo, index) => (
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
