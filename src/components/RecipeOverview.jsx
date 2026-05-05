"use client";

import { Clock, Timer, Signal, Flame, Utensils as UtensilsIcon, Info, Users, Image as ImageIcon, BookOpen } from "lucide-react";
import StarRating from "./StarRating";
import ShoppingList from "./ShoppingList";
import Toolbox from "./Toolbox";
import QRCode from "react-qr-code";

export default function RecipeOverview({ recipe, currentScale, onScaleChange, onStartCooking }) {
  if (!recipe) return null;

  // Use the first step's image if no global image exists
  const coverImage = recipe.imageUrl || recipe.steps?.[0]?.imageUrl;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-28">
      
      {/* ── Print Header (Only visible on print) ── */}
      <div className="hidden print:flex justify-between items-center border-b-4 border-black pb-6 print-break-inside-avoid">
        <div>
          <h1 className="text-5xl font-black mb-2 uppercase tracking-tight">Cocina Chapina</h1>
          <p className="text-2xl font-bold">{recipe.title}</p>
          <p className="text-lg italic text-muted-foreground">Por: {recipe.author || "Anónimo"}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <QRCode value={`https://cocina-chapina.vercel.app/cook?recipeId=${recipe.id}`} size={100} />
          <span className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground">Ver en línea</span>
        </div>
      </div>

      {/* ── Header Image & Title ── */}
      <div className="relative rounded-3xl overflow-hidden bg-muted aspect-video md:aspect-[21/9] border border-border shadow-sm print-hidden">
        {coverImage ? (
          <img src={coverImage} alt={recipe.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/50">
            <ImageIcon size={64} className="mb-4 opacity-50" />
            <p>Sin imagen principal</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
          <div className="inline-block bg-primary/90 text-primary-foreground backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 w-max">
            {recipe.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">{recipe.title}</h1>
          <div className="flex items-center gap-4 text-white/80">
            <span className="font-medium text-sm md:text-base">Por: {recipe.author || "Anónimo"}</span>
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
            <StarRating value={recipe.rating || 0} readonly />
          </div>
        </div>
      </div>

      {/* ── Key Metrics (Prep, Cook, Temp, Yield) ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-4 rounded-2xl flex flex-col items-center text-center shadow-sm">
          <Clock size={24} className="text-primary mb-2" />
          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Preparación</span>
          <span className="font-black text-lg">{recipe.prepTime || "--"}</span>
        </div>
        <div className="bg-card border border-border p-4 rounded-2xl flex flex-col items-center text-center shadow-sm">
          <Timer size={24} className="text-amber-500 mb-2" />
          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Cocción</span>
          <span className="font-black text-lg">{recipe.cookTime || "--"}</span>
        </div>
        <div className="bg-card border border-border p-4 rounded-2xl flex flex-col items-center text-center shadow-sm">
          <Flame size={24} className="text-red-500 mb-2" />
          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Temperatura</span>
          <span className="font-black text-lg line-clamp-1" title={recipe.temperature}>{recipe.temperature || "--"}</span>
        </div>
        <div className="bg-card border border-border p-4 rounded-2xl flex flex-col items-center text-center shadow-sm">
          <Signal size={24} className="text-blue-500 mb-2" />
          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Dificultad</span>
          <span className="font-black text-lg">{recipe.difficulty || "Media"}</span>
        </div>
      </div>

      {/* ── Recipe Description ── */}
      {recipe.description && (
        <div className="bg-card border border-border p-6 rounded-3xl shadow-sm italic text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto border-l-4 border-l-primary">
          "{recipe.description}"
        </div>
      )}

      {/* ── Tags ── */}
      {recipe.tags && recipe.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {recipe.tags.map(tag => (
            <span key={tag} className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
              # {tag}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* ── Left Column: Ingredients & Utensils ── */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Toolbox & Shopping List — Toolbox hidden on print */}
          <div className="space-y-6">
            <div className="print-hidden">
              <Toolbox basePortions={recipe.basePortions} onScaleChange={onScaleChange} />
            </div>
            <ShoppingList
              ingredients={recipe.ingredients}
              basePortions={recipe.basePortions}
              targetPortions={currentScale}
              recipeTitle={recipe.title}
            />
          </div>

          {/* Preparation Instructions */}
          <section className="bg-card border border-border p-6 rounded-3xl shadow-sm print-break-inside-avoid">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <BookOpen size={24} className="text-primary" /> Instrucciones de Preparación
            </h2>
            <div className="space-y-6">
              {recipe.steps?.map((step, idx) => (
                <div key={idx} className="flex gap-4 print-break-inside-avoid">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          {recipe.tips && (
            <section className="bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-200 dark:border-amber-800 p-6 rounded-3xl text-amber-900 dark:text-amber-100">
              <h2 className="text-xl font-black mb-3 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <Info size={24} /> Consejos del Chef
              </h2>
              <p className="text-lg leading-relaxed font-medium opacity-90">{recipe.tips}</p>
            </section>
          )}

        </div>

        {/* ── Right Column: Utensils ── */}
        <div className="md:col-span-1 space-y-8">
          <section className="bg-secondary/30 border border-border p-6 rounded-3xl shadow-sm">
            <h2 className="text-xl font-black mb-6">Utensilios Necesarios</h2>
            {recipe.utensils && recipe.utensils.length > 0 ? (
              <ul className="space-y-3">
                {recipe.utensils.map((u, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-medium">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                    {u}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground italic">No se especificaron utensilios especiales.</p>
            )}
          </section>
        </div>
      </div>

      {/* ── Print Footer ── */}
      <div className="hidden print:block border-t-2 border-black pt-4 mt-8 text-center">
        <p className="font-black text-xl uppercase tracking-widest">Cocina Chapina</p>
        <p className="text-sm text-muted-foreground">Recetas Tradicionales de Guatemala &mdash; cocinachapina.com</p>
      </div>

      {/* ── Floating Action Button ── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border z-40 flex justify-center print-hidden">
        <button 
          onClick={onStartCooking}
          className="w-full max-w-lg bg-primary text-primary-foreground py-4 rounded-2xl font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          👨‍🍳 ¡Empezar a Cocinar!
        </button>
      </div>

    </div>
  );
}
