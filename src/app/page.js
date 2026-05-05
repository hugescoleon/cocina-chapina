"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsersList, loadUsersList, login, getAuthUser } from "@/lib/authStore";
import { ChefHat } from "lucide-react";
import clsx from "clsx";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const user = getAuthUser();
    if (user) {
      router.push("/recipes");
    } else {
      loadUsersList().then(setUsers);
      setLoading(false);
    }
  }, [router]);

  const handleLogin = (userId) => {
    login(userId);
    router.push("/recipes");
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.15)_0,rgba(0,0,0,0)_50%)]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-2xl mb-4 rotate-3">
            <ChefHat size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight text-center">
            Cocina <span className="text-primary">Chapina</span> Pro
          </h1>
          <p className="text-stone-400 mt-2 text-lg">¿Quién está cocinando hoy?</p>
        </div>

        {/* User Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => handleLogin(user.id)}
              className="group flex flex-col items-center p-6 rounded-3xl bg-stone-900/50 border border-stone-800 hover:border-primary/50 hover:bg-stone-800/80 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative mb-4">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-24 h-24 rounded-full border-4 border-stone-800 group-hover:border-primary transition-colors object-cover"
                  />
                ) : (
                  <div
                    className="w-24 h-24 rounded-full border-4 border-stone-800 group-hover:border-primary transition-colors flex items-center justify-center font-black text-white text-3xl"
                    style={{ backgroundColor: user.avatarColor || "#f59e0b" }}
                  >
                    {user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className={clsx(
                  "absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase border",
                  user.role === "ADMIN" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                  user.role === "EDITOR" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                  "bg-blue-500/20 text-blue-400 border-blue-500/30"
                )}>
                  {user.role}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                {user.name}
              </h3>
              <p className="text-sm text-stone-400 mt-1">{user.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
