/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw from 'twin.macro';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecipeProvider } from './contexts/recipe-context';
import Home from './views/Home';
import RecipeDetails from './views/RecipeDetails';
import AddRecipe from './views/AddRecipe';

const RouteContainer = tw.div`mt-10 flex justify-center`;

function App() {
  return (
    <RecipeProvider>
      <Router>
        <RouteContainer className="route-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/recipe/:id" component={RecipeDetails} />
            <Route exact path="/add" component={AddRecipe} />
          </Switch>
        </RouteContainer>
      </Router>
    </RecipeProvider>
  );
}

export default App;
