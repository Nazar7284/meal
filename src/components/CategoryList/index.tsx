import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Category, fetchCategories } from "../../api";

function CategoryList() {
  const { data: categories, isLoading: loadingCategories } = useQuery<
    Category[]
  >({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="my-8">
      <h1 className="text-2xl font-bold text-center">Recipe Categories</h1>
      {loadingCategories ? (
        <p className="text-center">Loading categories...</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 max-w-full overflow-hidden p-10">
          {categories?.map((category: Category) => (
            <Link
              to={`/category/${category.strCategory}`}
              key={category.idCategory}
              className="flex flex-col items-center"
            >
              <div className="p-4 border-blue-500 border-2 rounded-md shadow-md transition-transform duration-300 hover:scale-105 relative">
                <h2 className="text-blue-500 text-xl text-center mb-2 absolute">
                  {category.strCategory}
                </h2>
                <img
                  className="w-48 h-48 object-contain"
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryList;
