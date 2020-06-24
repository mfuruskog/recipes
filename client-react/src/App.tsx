import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecipeProvider } from './contexts/recipe-context';
import Home from './views/Home';
import RecipeDetails from './views/RecipeDetails';
import AddRecipe from './views/AddRecipe';

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="route-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/recipe/:id" component={RecipeDetails} />
            <Route exact path="/add" component={AddRecipe} />
          </Switch>
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;
