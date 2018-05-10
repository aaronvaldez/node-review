import React from 'react';

import TodoList from './TodoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <TodoList />
      </div>
    );
  }
}

export default App;