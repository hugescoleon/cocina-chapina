// Settings Store — Supabase (cloud) with localStorage fallback
import { supabase } from "./supabase";

const SETTINGS_KEY = "cocina_chapina_settings";

export const DEFAULTS = {
  theme: "system",
  categories: ["Plato fuerte", "Desayuno", "Sopa", "Antojo", "Bebida", "Postre", "Otra"],
  tags: ["Picante", "Vegano", "Sin gluten", "Rápido", "Tradicional", "Para compartir"],
  account: {
    name: "",
    restaurantName: "",
    email: "",
    phone: "",
    city: "Guatemala",
  },
};

// ── Local helpers ─────────────────────────────────────────────────────────────
const fromLocal = () => {
  if (typeof window === "undefined") return { ...DEFAULTS };
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) return { ...DEFAULTS };
    const parsed = JSON.parse(stored);
    return { ...DEFAULTS, ...parsed, account: { ...DEFAULTS.account, ...(parsed.account || {}) } };
  } catch {
    return { ...DEFAULTS };
  }
};

const toLocal = (settings) => {
  if (typeof window !== "undefined")
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

// ── Public API ────────────────────────────────────────────────────────────────
export const getSettings = () => fromLocal();

export const loadSettings = async () => {
  if (!supabase) return fromLocal();
  try {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("id", 1)
      .single();
    if (error || !data) return fromLocal();
    const s = {
      ...DEFAULTS,
      theme: data.theme || DEFAULTS.theme,
      categories: data.categories || DEFAULTS.categories,
      tags: data.tags || DEFAULTS.tags,
      account: { ...DEFAULTS.account, ...(data.account || {}) },
    };
    toLocal(s);
    return s;
  } catch {
    return fromLocal();
  }
};

export const saveSettings = async (settings) => {
  toLocal(settings); // optimistic local save
  if (!supabase) return;
  try {
    await supabase.from("settings").upsert({
      id: 1,
      theme: settings.theme,
      categories: settings.categories,
      tags: settings.tags,
      account: settings.account,
    });
  } catch (e) {
    console.error("Settings sync error:", e);
  }
};

export const getCategories = () => getSettings().categories;
export const getTags = () => getSettings().tags || DEFAULTS.tags;
