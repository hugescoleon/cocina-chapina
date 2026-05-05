// Recipe Store — Supabase (cloud) with localStorage fallback
import { supabase } from "./supabase";
import defaultRecipesData from "./data/recipes.json";

const STORAGE_KEY = "cocina_chapina_recipes";
const defaultRecipes = defaultRecipesData;

// ── Local helpers ─────────────────────────────────────────────────────────────
const fromLocal = () => {
  if (typeof window === "undefined") return defaultRecipes;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRecipes));
    return defaultRecipes;
  }
  try {
    const parsed = JSON.parse(stored);
    const synced = parsed.map((p) => {
      const def = defaultRecipes.find((d) => d.id === p.id);
      if (def) {
        const merged = { ...def };
        Object.keys(p).forEach((key) => {
          if (p[key] !== undefined && p[key] !== null && p[key] !== "" &&
            (Array.isArray(p[key]) ? p[key].length > 0 : true)) {
            merged[key] = p[key];
          }
        });
        return merged;
      }
      return p;
    });
    return synced;
  } catch {
    return defaultRecipes;
  }
};

const toLocal = (recipes) => {
  if (typeof window !== "undefined")
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};

// ── Public API ────────────────────────────────────────────────────────────────
export const getRecipes = () => fromLocal();

export const loadRecipes = async () => {
  if (!supabase) return fromLocal();
  try {
    const { data, error } = await supabase
      .from("recipes")
      .select("data")
      .order("created_at", { ascending: true });
    if (error || !data || data.length === 0) return fromLocal();
    const recipes = data.map((row) => row.data);
    toLocal(recipes);
    return recipes;
  } catch {
    return fromLocal();
  }
};

export const saveRecipe = async (recipe) => {
  const newRecipe = { ...recipe, id: Date.now().toString() };
  // Optimistic local update
  const current = fromLocal();
  toLocal([...current, newRecipe]);

  if (supabase) {
    try {
      await supabase.from("recipes").insert({ id: newRecipe.id, data: newRecipe });
    } catch (e) {
      console.error("Recipe save error:", e);
    }
  }
  return newRecipe;
};

export const getRecipeById = (id) => {
  const recipes = fromLocal();
  return recipes.find((r) => r.id === id) || recipes[0];
};

export const updateRecipe = async (id, updatedData) => {
  const recipes = fromLocal();
  const updated = recipes.map((r) => r.id === id ? { ...r, ...updatedData } : r);
  toLocal(updated);

  if (supabase) {
    try {
      const newData = updated.find((r) => r.id === id);
      await supabase.from("recipes").update({ data: newData }).eq("id", id);
    } catch (e) {
      console.error("Recipe update error:", e);
    }
  }
  return updated;
};

export const deleteRecipe = async (id) => {
  const recipes = fromLocal();
  const updated = recipes.filter((r) => r.id !== id);
  toLocal(updated);

  if (supabase) {
    try {
      await supabase.from("recipes").delete().eq("id", id);
    } catch (e) {
      console.error("Recipe delete error:", e);
    }
  }
  return updated;
};

export const clearRecipes = () => {
  localStorage.removeItem(STORAGE_KEY);
  return defaultRecipes;
};
