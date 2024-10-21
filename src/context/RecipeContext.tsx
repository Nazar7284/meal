import React, { createContext, useContext, useState } from "react";
import { Recipe } from "../api";

interface RecipeContextType {
  savedRecipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  removeRecipe: (id: string) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  const addRecipe = (recipe: Recipe) => {
    const exists = savedRecipes.some(
      (savedRecipe) => savedRecipe.idMeal === recipe.idMeal
    );
    if (!exists) {
      setSavedRecipes((prev) => [...prev, recipe]);
    }
  };

  const removeRecipe = (id: string) => {
    setSavedRecipes((prev) => prev.filter((recipe) => recipe.idMeal !== id));
  };

  return (
    <RecipeContext.Provider value={{ savedRecipes, addRecipe, removeRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  }
  return context;
};
