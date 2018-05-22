import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home.jsx';
import TodoList from './TodoList.jsx';

const App = () => (
  <div>
    <Switch>
      <Route path='/todolist/:list' component={TodoList} />
      <Route path='*' component={Home} />
    </Switch>
  </div>
);

export default App;