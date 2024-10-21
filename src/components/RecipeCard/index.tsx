import React from "react";
import { Recipe } from "../../api";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link
      to={`/recipe/${recipe.idMeal}`}
      className="text-blue-500 hover:underline"
    >
      <div className="border rounded p-4 shadow-md">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover mb-2"
        />
        <h2 className="font-bold text-lg">{recipe.strMeal}</h2>
      </div>
    </Link>
  );
};

export default RecipeCard;
