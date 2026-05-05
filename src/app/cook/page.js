"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CookView from "@/components/CookView";
import Toolbox from "@/components/Toolbox";
import ShoppingList from "@/components/ShoppingList";
import RecipeOverview from "@/components/RecipeOverview";
import Navbar from "@/components/Navbar";
import { getRecipeById, deleteRecipe } from "@/lib/recipeStore";
import { getAuthUser } from "@/lib/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChefHat, ShoppingCart, Wrench, BookOpen, Pencil, Trash2, Printer } from "lucide-react";
import clsx from "clsx";

// ── Mobile Tab Bar ─────────────────────────────────────────────────────────────
const TABS = [
  { id: "chef",       label: "Chef Mode",   icon: ChefHat },
  { id: "compras",    label: "Compras",     icon: ShoppingCart },
  { id: "tools",     label: "Herramientas", icon: Wrench },
];

function MobileTabBar({ active, onChange }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card/95 backdrop-blur-lg border-t border-border">
      <div className="flex">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={clsx(
              "flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-all",
              active === id ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon size={22} strokeWidth={active === id ? 2.5 : 1.8} />
            <span className={clsx("text-xs font-bold leading-tight", active === id && "text-primary")}>
              {label}
            </span>
            {active === id && (
              <span className="absolute bottom-0 w-6 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Dashboard Content ─────────────────────────────────────────────────────────
function DashboardContent() {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get("recipeId");
  const router = useRouter();

  const [recipe, setRecipe] = useState(null);
  const [currentScale, setCurrentScale] = useState(4);
  const [activeTab, setActiveTab] = useState("chef");
  const [role, setRole] = useState("EDITOR");
  const [isCooking, setIsCooking] = useState(false);

  const handleDelete = () => {
    if (confirm("¿Estás seguro de eliminar esta receta? Esta acción no se puede deshacer.")) {
      deleteRecipe(recipeId);
      router.push("/recipes");
    }
  };

  useEffect(() => {
    const loadedRecipe = getRecipeById(recipeId);
    setRecipe(loadedRecipe);
    if (loadedRecipe) {
      setCurrentScale(loadedRecipe.basePortions);
    }
    setRole(getAuthUser()?.role || "USER");
  }, [recipeId]);

  if (!recipe) return (
    <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">
      Cargando...
    </div>
  );

  if (!isCooking) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Top actions for Edit/Delete on Overview */}
        <div className="mb-6 flex justify-end items-center gap-4 print-hidden">
          <button onClick={() => window.print()} className="flex items-center gap-2 text-primary font-bold hover:underline text-sm">
            <Printer size={16} /> Imprimir
          </button>
          <div className="w-px h-5 bg-border mx-1"></div>
          {role !== "USER" && (
            <>
              <Link href={`/recipes/add?edit=${recipe.id}`} className="flex items-center gap-2 text-primary font-bold hover:underline text-sm">
                <Pencil size={16} /> Editar
              </Link>
              <button onClick={handleDelete} className="flex items-center gap-2 text-destructive font-bold hover:underline text-sm">
                <Trash2 size={16} /> Eliminar
              </button>
              <div className="w-px h-5 bg-border mx-1"></div>
            </>
          )}
          <Link href="/recipes" className="flex items-center gap-2 text-primary font-bold hover:underline text-sm">
            <BookOpen size={16} /> Regresar a Galería
          </Link>
        </div>
        
        <RecipeOverview 
          recipe={recipe} 
          currentScale={currentScale} 
          onScaleChange={setCurrentScale}
          onStartCooking={() => setIsCooking(true)} 
        />
      </main>
    );
  }

  return (
    <>
      {/* ── DESKTOP layout ── */}
      <main className="hidden md:block max-w-7xl mx-auto px-4 py-8 pb-16">
        {/* Recipe label + change link */}
        <div className="mb-5 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Chef Mode Activo</p>
            <p className="text-muted-foreground text-sm mt-0.5">La pantalla no se apagará.</p>
          </div>
          <div className="flex items-center gap-4">
            {role !== "USER" && (
              <>
                <Link href={`/recipes/add?edit=${recipe.id}`} className="flex items-center gap-2 text-primary font-bold hover:underline text-sm">
                  <Pencil size={16} /> Editar
                </Link>
                <button onClick={handleDelete} className="flex items-center gap-2 text-destructive font-bold hover:underline text-sm">
                  <Trash2 size={16} /> Eliminar
                </button>
                <div className="w-px h-5 bg-border mx-1"></div>
              </>
            )}
            <Link href="/recipes" className="flex items-center gap-2 text-primary font-bold hover:underline text-sm">
              <BookOpen size={16} /> Cambiar receta
            </Link>
          </div>
        </div>
        <CookView recipe={recipe} currentScale={currentScale} />
      </main>

      {/* ── MOBILE layout ── */}
      <div className="md:hidden pb-10 px-3 pt-4 max-w-lg mx-auto">
        {/* Recipe title bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="min-w-0">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Cocinando</p>
            <p className="font-bold text-base truncate">{recipe.title}</p>
          </div>
          <div className="flex gap-2 shrink-0 ml-3">
            <Link href="/recipes"
              className="w-9 h-9 flex items-center justify-center bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
              <BookOpen size={15} />
            </Link>
          </div>
        </div>

        <CookView recipe={recipe} currentScale={currentScale} />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Suspense fallback={
        <div className="p-8 text-center text-muted-foreground">Cargando aplicación...</div>
      }>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
