// Authentication Store — Persists to localStorage
const AUTH_KEY = "cocina_chapina_auth";
const USERS_KEY = "cocina_chapina_users";

// Default users — loaded if localStorage is empty
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

// ── Users CRUD ────────────────────────────────────────────────────────────────

export const getUsersList = () => {
  if (typeof window === "undefined") return DEFAULT_USERS;
  try {
    const stored = localStorage.getItem(USERS_KEY);
    if (!stored) return DEFAULT_USERS;
    return JSON.parse(stored);
  } catch {
    return DEFAULT_USERS;
  }
};

export const saveUsersList = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const createUser = (userData) => {
  const users = getUsersList();
  const newUser = {
    ...userData,
    id: `user-${Date.now()}`,
  };
  const updated = [...users, newUser];
  saveUsersList(updated);
  return updated;
};

export const updateUser = (userId, userData) => {
  const users = getUsersList();
  const updated = users.map((u) => (u.id === userId ? { ...u, ...userData } : u));
  saveUsersList(updated);
  // If the updated user is currently logged in, refresh the session
  if (typeof window !== "undefined") {
    const current = getAuthUser();
    if (current?.id === userId) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ ...current, ...userData }));
    }
  }
  return updated;
};

export const deleteUser = (userId) => {
  const users = getUsersList();
  // Never allow deleting the ADMIN
  const target = users.find((u) => u.id === userId);
  if (target?.role === "ADMIN") throw new Error("No se puede eliminar al Administrador.");
  const updated = users.filter((u) => u.id !== userId);
  saveUsersList(updated);
  return updated;
};

// ── Auth ──────────────────────────────────────────────────────────────────────

export const getAuthUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const login = (userId) => {
  const users = getUsersList();
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
