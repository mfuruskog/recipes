import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './views/Home';

function App() {
  return (
    <div>
      <Router>
        <div className="route-container">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
