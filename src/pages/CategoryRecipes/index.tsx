import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipesByCategory, Recipe } from "../../api";
import RecipeCard from "../../components/RecipeCard";
import Pagination from "../../components/Pagination";
import React, { useState } from "react";

const CategoryRecipes: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recipesPerPage = 3;

  const { data: recipes, isLoading } = useQuery<Recipe[]>({
    queryKey: ["recipes", category],
    queryFn: () => fetchRecipesByCategory(category!),
    enabled: !!category,
    refetchOnWindowFocus: false,
  });

  const totalPages = Math.ceil((recipes?.length || 0) / recipesPerPage);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  const currentRecipes = recipes?.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const handlePageChange = (pageNumber: number | string) => {
    if (typeof pageNumber === "number") {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="h-full p-4">
      <h1 className="text-2xl font-bold mb-4">{category} Recipes</h1>
      {isLoading ? (
        <p>Loading recipes...</p>
      ) : (
        <div>
          <div className="flex flex-wrap gap-8 justify-center">
            {currentRecipes?.map((recipe: Recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryRecipes;
