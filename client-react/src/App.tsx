/** @jsxImportSource @emotion/react */

import tw from 'twin.macro';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecipeProvider } from './contexts/app-context';
import Home from './views/Home';
import RecipeDetails from './views/RecipeDetails';
import AddRecipe from './views/AddRecipe';
import { useAuth0 } from '@auth0/auth0-react';
import { ProtectedComponent } from './components/ProtectedComponent';
import Loader from './components/Loader';
import Settings from './views/Settings';

const RouteContainer = tw.div`mt-10 flex justify-center`;

function App() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return (
      <div tw="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <RecipeProvider>
      <Router>
        <RouteContainer className="route-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<ProtectedComponent component={RecipeDetails} />} />
            <Route path="/add" element={<ProtectedComponent component={AddRecipe} />} />
            <Route path="/settings" element={<ProtectedComponent component={Settings} />} />
          </Routes>
        </RouteContainer>
      </Router>
    </RecipeProvider>
  );
}

export default App;
