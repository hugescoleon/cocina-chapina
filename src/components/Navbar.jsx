"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Plus, Settings, LogOut } from "lucide-react";
import clsx from "clsx";
import { getAuthUser, logout } from "@/lib/authStore";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authUser = getAuthUser();
    if (!authUser && pathname !== "/") {
      router.push("/");
    } else {
      setUser(authUser);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const links = [
    { href: "/recipes", label: "Galería",      icon: BookOpen },
    { href: "/recipes/add", label: "+ Receta",   icon: Plus, highlight: true },
    { href: "/settings",    label: "Ajustes",    icon: Settings },
  ];

  if (!user) return null; // Don't render navbar on the login page

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40 shadow-sm print-hidden">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/recipes" className="flex items-center gap-2.5 shrink-0">
          <svg width="32" height="32" viewBox="0 0 34 34" fill="none">
            <rect width="34" height="34" rx="8" fill="#F59E0B"/>
            <path d="M17 6C17 6 8 12 8 20C8 24.4183 12.0294 28 17 28C21.9706 28 26 24.4183 26 20C26 12 17 6Z" fill="white" fillOpacity="0.9"/>
            <path d="M17 11C17 11 12 15 12 20C12 22.7614 14.2386 25 17 25C19.7614 25 22 22.7614 22 20C22 15 17 11Z" fill="#F59E0B"/>
            <circle cx="17" cy="20" r="3" fill="white"/>
          </svg>
          <span className="font-bold tracking-tight hidden sm:block">
            Cocina Chapina <span className="text-primary">Pro</span>
          </span>
        </Link>

        {/* Nav Links & User Profile */}
        <nav className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1.5">
            {links.map(({ href, label, icon: Icon, highlight }) => {
              // Hide "+ Receta" for USER role
              if (href === "/recipes/add" && user.role === "USER") return null;

              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all",
                    highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                      : isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </div>

          <div className="w-px h-6 bg-border mx-1"></div>

          {/* User Dropdown / Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-bold leading-tight">{user.name}</span>
              <span className="text-[10px] text-muted-foreground font-bold tracking-wider uppercase">{user.role}</span>
            </div>
            <div
              className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center font-black text-white text-xs shrink-0"
              style={{ backgroundColor: user.avatarColor || "#f59e0b" }}
              title={user.name}
            >
              {user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
              title="Cerrar sesión"
            >
              <LogOut size={16} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
