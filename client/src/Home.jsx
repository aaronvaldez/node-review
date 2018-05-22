import React from "react";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: "",
      lists: {}
    };
  }

  componentDidMount() {
    axios
      .get("/api/lists")
      .then(result => this.setState({ lists: result.data }))
      .catch(err => console.error(err));
  }

  handleInput(e) {
    this.setState({ listName: e.target.value });
  }

  createList(e) {
    e.preventDefault();
    axios.post("/api/lists", { listName: this.state.listName });
    this.props.history.push(`/todolist/${this.state.listName}`);
  }

  renderLists() {
    const listNames = [];
    for (let list in this.state.lists) {
      listNames.push(list);
    }
    return listNames.map((list, i) => {
      return (
        <div key={i}>
          <button onClick={() => this.handleListClick(list)}>
            {list.toUpperCase()}
          </button>
          <br />
        </div>
      );
    });
  }

  handleListClick(list) {
    this.props.history.push(`/todolist/${list}`);
  }

  render() {
    return (
      <div>
        <h1>My Todo Lists</h1>
        <h3>Create New Todo List</h3>
        <form onSubmit={e => this.createList(e)}>
          <input onChange={e => this.handleInput(e)} required />
          <button>Create List</button>
        </form>
        <h3>My Lists</h3>
        {this.renderLists()}
      </div>
    );
  }
}

export default Home;
