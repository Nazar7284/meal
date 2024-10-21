import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react";
import { Recipe, fetchRecipesBySearch } from "../../api";
import { useDebounce } from "use-debounce";
import RecipeCard from "../RecipeCard";

function SearhRecipe() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue] = useDebounce(searchTerm, 500);

  const { data: searchResults, isLoading: loadingSearch } = useQuery<Recipe[]>({
    queryKey: ["search", debouncedValue],
    queryFn: () => fetchRecipesBySearch(debouncedValue),
    enabled: !!debouncedValue,
    refetchOnWindowFocus: false,
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="">
      <div className="flex flex-col items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold">Recipe Search</h1>
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded-lg max-w-64 py-2 px-4 flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>
      {loadingSearch ? (
        <p>Loading search results...</p>
      ) : (
        <>
          {searchResults && searchResults.length ? (
            <div>
              <div className="flex flex-wrap gap-8 justify-center">
                {searchResults.map((recipe: Recipe) => (
                  <RecipeCard key={recipe.idMeal} recipe={recipe} />
                ))}
              </div>
            </div>
          ) : (
            searchTerm && <p>No results found for "{searchTerm}".</p>
          )}
        </>
      )}
    </div>
  );
}

export default SearhRecipe;
