import axios from "axios";

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  [key: string]: any;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get(`${BASE_URL}categories.php`);
  return data.categories;
};

export const fetchRecipesBySearch = async (
  searchTerm: string
): Promise<Recipe[]> => {
  const { data } = await axios.get(`${BASE_URL}search.php?s=${searchTerm}`);
  return data.meals || [];
};

export const fetchRecipesByCategory = async (
  category: string
): Promise<Recipe[]> => {
  const response = await axios.get(`${BASE_URL}filter.php?c=${category}`);
  return response.data.meals || [];
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const response = await axios.get(`${BASE_URL}lookup.php?i=${id}`);
  return response.data.meals[0];
};
