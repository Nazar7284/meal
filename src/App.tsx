import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import CategoryRecipes from "./pages/CategoryRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import SelectedRecipes from "./pages/SavedRecipes";
import { RecipeProvider } from "./context/RecipeContext";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipeProvider>
        <BrowserRouter>
          <div className="min-h-screen overflow-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:category" element={<CategoryRecipes />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/saved-recipes" element={<SelectedRecipes />} />
            </Routes>
          </div>
        </BrowserRouter>
      </RecipeProvider>
    </QueryClientProvider>
  );
};

export default App;
