import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './views/Home';
import RecipeDetails from './views/RecipeDetails';

function App() {
  return (
    <div>
      <Router>
        <div className="route-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/recipe/:id" component={RecipeDetails} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
