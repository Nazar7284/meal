import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "../../api";
import { useState } from "react";
import { useRecipeContext } from "../../context/RecipeContext";

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: recipe, isLoading } = useQuery<any>({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id!),
    enabled: !!id,
  });

  const { savedRecipes, addRecipe } = useRecipeContext();
  const [isSaved, setIsSaved] = useState(false);
  const [message, setMessage] = useState("");

  const handleSaveRecipe = () => {
    if (recipe) {
      const exists = savedRecipes.some(
        (savedRecipe) => savedRecipe.idMeal === recipe.idMeal
      );
      if (exists) {
        setMessage("This recipe is already saved!");
      } else {
        addRecipe(recipe);
        setIsSaved(true);
        setMessage("Recipe saved successfully!");
      }
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading recipe...</p>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            {recipe?.strMeal}
          </h1>
          <img
            src={recipe?.strMealThumb}
            alt={recipe?.strMeal}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
          <p className="mb-4 text-gray-700">{recipe?.strInstructions}</p>
          <h2 className="text-2xl font-semibold mb-2 mt-4">Ingredients</h2>
          <ul className="list-disc list-inside mb-4">
            {recipe &&
              Object.keys(recipe)
                .filter((key) => key.startsWith("strIngredient") && recipe[key])
                .map((key, index) => (
                  <li key={key} className="text-gray-800">
                    {recipe[`strMeasure${index + 1}`]} {recipe[key]}
                  </li>
                ))}
          </ul>
          <button
            onClick={handleSaveRecipe}
            className={`mt-4 px-4 py-2 text-white font-semibold rounded-lg ${
              isSaved ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSaved ? "Recipe Saved!" : "Save Recipe"}
          </button>
          <button
            onClick={() => navigate("/saved-recipes")}
            className="mt-4 ml-4 px-4 py-2 text-white font-semibold bg-yellow-500 hover:bg-yellow-600 rounded-lg"
          >
            Go to Saved Recipes
          </button>
          {message && <p className="text-green-500 mt-2">{message}</p>}{" "}
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
