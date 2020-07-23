/** @jsx jsx */

import { jsx } from '@emotion/core';
import tw, { styled } from 'twin.macro';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecipeProvider } from './contexts/recipe-context';
import Home from './views/Home';
import RecipeDetails from './views/RecipeDetails';
import AddRecipe from './views/AddRecipe';
import { useAuth0 } from '@auth0/auth0-react';
import { ProtectedRoute } from './components/ProtectedRoute';
import ClipLoader from 'react-spinners/ClipLoader';

const RouteContainer = tw.div`mt-10 flex justify-center`;
const Loader = styled(ClipLoader)``;

function App() {
  const { isLoading, error } = useAuth0();
  if (isLoading) {
    return (
      <div tw="w-full h-screen flex justify-center items-center">
        <Loader color={'#FC8181'} size={32} />
      </div>
    );
  }
  return (
    <RecipeProvider>
      <Router>
        <RouteContainer className="route-container">
          <Switch>
            <Route exact path="/" component={Home} />
            <ProtectedRoute path="/recipe/:id" component={RecipeDetails} />
            <ProtectedRoute exact path="/add" component={AddRecipe} />
          </Switch>
        </RouteContainer>
      </Router>
    </RecipeProvider>
  );
}

export default App;
