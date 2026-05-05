"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { getRecipes, deleteRecipe } from "@/lib/recipeStore";
import Navbar from "@/components/Navbar";
import { Plus, Trash2, Utensils, Pencil, ChefHat, Clock, Signal, Search, Globe, Trophy, Star, ArrowUpDown } from "lucide-react";
import clsx from "clsx";
import StarRating from "@/components/StarRating";

function GalleryContent() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default"); // "default" | "rating" | "public"
  const searchParams = useSearchParams();
  const activeRecipeId = searchParams.get("active");

  useEffect(() => {
    setRecipes(getRecipes());
  }, []);

  const handleDelete = (id, e) => {
    e.preventDefault();
    if (confirm("¿Estás seguro de eliminar esta receta?")) {
      const updated = deleteRecipe(id);
      setRecipes(updated);
    }
  };

  const filtered = recipes.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    (r.category || "").toLowerCase().includes(search.toLowerCase()) ||
    (r.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredRecipes = [...filtered].sort((a, b) => {
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "public") return (b.isPublic ? 1 : 0) - (a.isPublic ? 1 : 0);
    return 0;
  });

  const difficultyColors = {
    "Fácil": "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300",
    "Intermedia": "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300",
    "Avanzada": "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Mis Recetas Chapinas</h1>
            <p className="text-muted-foreground mt-1">
              {recipes.length} recetas · {recipes.filter(r => r.isPublic).length} públicas · {recipes.filter(r => r.isContestEntry).length} en concurso
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-card border border-border rounded-xl px-3 py-2.5 text-sm font-bold outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="default">Orden por defecto</option>
              <option value="rating">⭐ Mejor calificadas</option>
              <option value="public">🌐 Públicas primero</option>
            </select>
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-card border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary transition-all font-medium"
              />
            </div>
          </div>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-[2rem] border-2 border-dashed border-border">
            <Utensils size={64} className="mx-auto text-muted-foreground opacity-10 mb-4" />
            <p className="text-xl font-bold text-muted-foreground">
              {search ? "No hay resultados para tu búsqueda" : "Tu recetario está vacío"}
            </p>
            {!search && (
              <Link href="/recipes/add" className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl active:scale-95">
                <Plus size={24} /> Crear mi primera receta
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => {
              const isActive = recipe.id === activeRecipeId;
              const recipeUrl = `/cook?recipeId=${recipe.id}`;
              return (
                <div key={recipe.id} className={clsx(
                  "group relative bg-card rounded-[2rem] border-2 overflow-hidden transition-all hover:shadow-2xl flex flex-col",
                  isActive ? "border-primary ring-4 ring-primary/10 shadow-lg shadow-primary/10" : "border-border hover:border-primary/40"
                )}>
                  {/* Image – full clickable link */}
                  <Link href={recipeUrl} className="aspect-square bg-muted relative overflow-hidden block">
                    {recipe.steps?.[0]?.imageUrl ? (
                      <img
                        src={recipe.steps[0].imageUrl}
                        alt={recipe.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-accent/20">
                        <ChefHat size={60} className="opacity-10" />
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-white text-primary font-black px-5 py-2.5 rounded-2xl text-sm shadow-2xl transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                        🍳 Cocinar ahora
                      </span>
                    </div>
                    {/* Floating badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {recipe.category || "General"}
                      </span>
                      {recipe.isPublic && (
                        <span className="bg-primary/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
                          <Globe size={10} /> Pública
                        </span>
                      )}
                      {recipe.isContestEntry && (
                        <span className="bg-amber-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1">
                          <Trophy size={10} /> Concurso
                        </span>
                      )}
                    </div>
                    {isActive && (
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-black shadow-lg">
                        COCINANDO
                      </div>
                    )}
                  </Link>

                  {/* Card details + Cocinar button */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors mb-1 line-clamp-2">
                      {recipe.title}
                    </h3>
                    {recipe.author && (
                      <p className="text-xs text-muted-foreground mb-2 font-medium">por {recipe.author}</p>
                    )}
                    {/* Stars – always render */}
                    <div className="mb-2">
                      <StarRating value={recipe.rating || 0} readonly size="sm" />
                    </div>

                    {recipe.description && (
                      <p className="text-[13px] text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                        {recipe.description}
                      </p>
                    )}
                    {recipe.tags && recipe.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {recipe.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                        {recipe.tags.length > 3 && (
                          <span className="bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded-md">
                            +{recipe.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex items-center justify-between border-t border-border pt-3 mt-auto">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                        <Clock size={14} className="text-primary" />
                        {recipe.prepTime || "-- min"}
                      </div>
                      <div className={clsx(
                        "flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-1 rounded-full",
                        difficultyColors[recipe.difficulty] || "bg-secondary text-secondary-foreground"
                      )}>
                        <Signal size={12} />
                        {recipe.difficulty || "Intermedia"}
                      </div>
                    </div>
                    {/* Cocinar CTA Button */}
                    <Link
                      href={recipeUrl}
                      className="mt-4 w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-95 shadow-md"
                    >
                      🍳 Cocinar esta receta
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecipeGallery() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Cargando galería...</div>}>
      <GalleryContent />
    </Suspense>
  );
}
