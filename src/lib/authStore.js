// Auth Store — Supabase (cloud) with localStorage fallback
import { supabase } from "./supabase";

const AUTH_KEY = "cocina_chapina_auth";
const USERS_KEY = "cocina_chapina_users";

const DEFAULT_USERS = [
  {
    id: "user-1",
    role: "USER",
    name: "Gabriela Gómez",
    email: "gabriela@cocinachapina.com",
    avatarColor: "#10b981",
    avatarUrl: "",
    description: "Usuaria del recetario",
  },
  {
    id: "user-2",
    role: "EDITOR",
    name: "Emilio Escobar",
    email: "emilio@cocinachapina.com",
    avatarColor: "#3b82f6",
    avatarUrl: "",
    description: "Editor de contenido",
  },
  {
    id: "user-3",
    role: "ADMIN",
    name: "Hugo Escobar",
    email: "hugo@cocinachapina.com",
    avatarColor: "#f59e0b",
    avatarUrl: "",
    description: "Administrador",
  },
];

// ── Local helpers ─────────────────────────────────────────────────────────────
const fromLocal = () => {
  if (typeof window === "undefined") return DEFAULT_USERS;
  try {
    const stored = localStorage.getItem(USERS_KEY);
    if (!stored) return DEFAULT_USERS;
    return JSON.parse(stored);
  } catch {
    return DEFAULT_USERS;
  }
};

const toLocal = (users) => {
  if (typeof window !== "undefined")
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// ── Public API ────────────────────────────────────────────────────────────────
export const getUsersList = () => fromLocal();

export const loadUsersList = async () => {
  if (!supabase) return fromLocal();
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error || !data || data.length === 0) return fromLocal();
    // Map snake_case to camelCase
    const users = data.map((u) => ({
      id: u.id,
      role: u.role,
      name: u.name,
      email: u.email,
      avatarColor: u.avatar_color,
      avatarUrl: u.avatar_url,
      description: u.description,
    }));
    toLocal(users);
    return users;
  } catch {
    return fromLocal();
  }
};

const toSupabaseUser = (u) => ({
  id: u.id,
  role: u.role,
  name: u.name,
  email: u.email || "",
  avatar_color: u.avatarColor || "#10b981",
  avatar_url: u.avatarUrl || "",
  description: u.description || "",
});

export const saveUsersList = (users) => toLocal(users);

export const createUser = async (userData) => {
  const newUser = { ...userData, id: `user-${Date.now()}` };
  const users = fromLocal();
  const updated = [...users, newUser];
  toLocal(updated);

  if (supabase) {
    try {
      await supabase.from("users").insert(toSupabaseUser(newUser));
    } catch (e) {
      console.error("Create user error:", e);
    }
  }
  return updated;
};

export const updateUser = async (userId, userData) => {
  const users = fromLocal();
  const updated = users.map((u) => (u.id === userId ? { ...u, ...userData } : u));
  toLocal(updated);

  if (typeof window !== "undefined") {
    const current = getAuthUser();
    if (current?.id === userId)
      localStorage.setItem(AUTH_KEY, JSON.stringify({ ...current, ...userData }));
  }

  if (supabase) {
    try {
      await supabase.from("users").update(toSupabaseUser({ ...userData, id: userId })).eq("id", userId);
    } catch (e) {
      console.error("Update user error:", e);
    }
  }
  return updated;
};

export const deleteUser = async (userId) => {
  const users = fromLocal();
  const target = users.find((u) => u.id === userId);
  if (target?.role === "ADMIN") throw new Error("No se puede eliminar al Administrador.");
  const updated = users.filter((u) => u.id !== userId);
  toLocal(updated);

  if (supabase) {
    try {
      await supabase.from("users").delete().eq("id", userId);
    } catch (e) {
      console.error("Delete user error:", e);
    }
  }
  return updated;
};

// ── Auth session ──────────────────────────────────────────────────────────────
export const getAuthUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const login = (userId) => {
  const users = fromLocal();
  const user = users.find((u) => u.id === userId);
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const hasPermission = (requiredRole) => {
  const user = getAuthUser();
  if (!user) return false;
  if (requiredRole === "ADMIN") return user.role === "ADMIN";
  if (requiredRole === "EDITOR") return user.role === "ADMIN" || user.role === "EDITOR";
  return true;
};
