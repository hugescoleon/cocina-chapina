"use client";

const STORAGE_KEY = "cocina_chapina_recipes";

import defaultRecipesData from "./data/recipes.json";

const defaultRecipes = defaultRecipesData;

export const getRecipes = () => {
  if (typeof window === "undefined") return defaultRecipes;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRecipes));
    return defaultRecipes;
  }
  
  const parsed = JSON.parse(stored);
  // Sync missing fields from defaultRecipes (like new descriptions or steps)
  const synced = parsed.map(p => {
    const def = defaultRecipes.find(d => d.id === p.id);
    if (def) {
      // Only merge fields that are missing or empty in the stored version
      const merged = { ...def };
      Object.keys(p).forEach(key => {
        if (p[key] !== undefined && p[key] !== null && p[key] !== "" && (Array.isArray(p[key]) ? p[key].length > 0 : true)) {
          merged[key] = p[key];
        }
      });
      return merged;
    }
    return p;
  });

  return synced;
};

export const saveRecipe = (recipe) => {
  try {
    const recipes = getRecipes();
    const newRecipes = [...recipes, { ...recipe, id: Date.now().toString() }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecipes));
    return newRecipes;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    throw new Error("No hay espacio suficiente en el navegador. Intenta con un video más pequeño o menos fotos.");
  }
};

export const getRecipeById = (id) => {
  const recipes = getRecipes();
  return recipes.find(r => r.id === id) || recipes[0];
};

export const updateRecipe = (id, updatedData) => {
  try {
    const recipes = getRecipes();
    const newRecipes = recipes.map(r => r.id === id ? { ...r, ...updatedData } : r);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecipes));
    return newRecipes;
  } catch (error) {
    console.error("Error updating localStorage:", error);
    throw new Error("No hay espacio suficiente en el navegador para actualizar la receta.");
  }
};

export const deleteRecipe = (id) => {
  try {
    const recipes = getRecipes();
    const newRecipes = recipes.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecipes));
    return newRecipes;
  } catch (error) {
    console.error("Error deleting from localStorage:", error);
  }
};

export const clearRecipes = () => {
  localStorage.removeItem(STORAGE_KEY);
  return defaultRecipes;
};
