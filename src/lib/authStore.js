// Authentication Store — Persists to localStorage
const AUTH_KEY = "cocina_chapina_auth";

export const MOCK_USERS = [
  {
    id: "user-1",
    role: "USER",
    name: "Juan Cocinero",
    email: "juan@ejemplo.com",
    avatar: "https://i.pravatar.cc/150?u=juan",
    description: "Lector y entusiasta",
  },
  {
    id: "user-2",
    role: "EDITOR",
    name: "Chef Marlyn",
    email: "marlyn@cocinachapina.com",
    avatar: "https://i.pravatar.cc/150?u=marlyn",
    description: "Creadora de contenido",
  },
  {
    id: "user-3",
    role: "ADMIN",
    name: "Hugo Escobar",
    email: "hugo@cocinachapina.com",
    avatar: "https://i.pravatar.cc/150?u=hugo",
    description: "Acceso total",
  },
];

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
  const user = MOCK_USERS.find(u => u.id === userId);
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
  return true; // USER role
};
