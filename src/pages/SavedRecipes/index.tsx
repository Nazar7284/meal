import React from "react";
import { useRecipeContext } from "../../context/RecipeContext";

const SavedRecipes: React.FC = () => {
  const { savedRecipes } = useRecipeContext();

  const getCombinedIngredients = () => {
    const ingredientMap: { [key: string]: string } = {};

    savedRecipes.forEach((recipe) => {
      Object.keys(recipe).forEach((key) => {
        if (key.startsWith("strIngredient") && recipe[key]) {
          const measureKey = `strMeasure${key.replace("strIngredient", "")}`;
          const measure = recipe[measureKey] || "";

          if (ingredientMap[recipe[key]]) {
            ingredientMap[recipe[key]] += `, ${measure}`;
          } else {
            ingredientMap[recipe[key]] = measure;
          }
        }
      });
    });

    return Object.entries(ingredientMap).map(([ingredient, measure]) => (
      <li key={ingredient}>
        {measure} {ingredient}
      </li>
    ));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe.idMeal} className="mb-4 p-2 border rounded-lg">
            <h2 className="text-xl font-semibold">{recipe.strMeal}</h2>
            <p>{recipe.strInstructions}</p>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mt-4">Combined Ingredients</h2>
      <ul className="list-disc list-inside mb-4">{getCombinedIngredients()}</ul>
    </div>
  );
};

export default SavedRecipes;
