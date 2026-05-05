// Settings Store — Persists to localStorage
const SETTINGS_KEY = "cocina_chapina_settings";

const DEFAULTS = {
  theme: "system", // "light" | "dark" | "system"
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

export const getSettings = () => {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) return { ...DEFAULTS };
    const parsed = JSON.parse(stored);
    return {
      ...DEFAULTS,
      ...parsed,
      account: { ...DEFAULTS.account, ...(parsed.account || {}) },
    };
  } catch {
    return { ...DEFAULTS };
  }
};

export const saveSettings = (settings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const getCategories = () => {
  return getSettings().categories;
};

export const getTags = () => {
  return getSettings().tags || DEFAULTS.tags;
};
