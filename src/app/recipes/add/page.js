"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveRecipe, getRecipeById, updateRecipe } from "@/lib/recipeStore";
import { getCategories, getTags } from "@/lib/settingsStore";
import { getAuthUser } from "@/lib/authStore";
import { Plus, Trash2, ArrowLeft, Save, Image as ImageIcon, Video, Link as LinkIcon, Upload, Timer, Globe, Lock, Trophy, Star, Clock, Signal } from "lucide-react";
import Link from "next/link";
import StarRating from "@/components/StarRating";


const emptyIngredient = () => ({ name: "", qty: "", unit: "lb", price: "", store: "" });
const emptyStep = () => ({
  title: "",
  description: "",
  imageUrl: "",
  videoUrl: "",
  timer: null, // { name: string, minutes: number }
});

// ─── Reusable Media Input: URL or File Upload ────────────────────────────────
function MediaInput({ label, icon: Icon, urlValue, onUrlChange, onFileChange, accept, preview }) {
  const [mode, setMode] = useState(urlValue ? "url" : "url"); // 'url' | 'upload'
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onFileChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
          <Icon size={13} /> {label}
        </label>
        {/* Toggle URL / Upload */}
        <div className="flex bg-secondary rounded-lg p-0.5 gap-0.5">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md font-bold transition-all ${
              mode === "url" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LinkIcon size={11} /> URL
          </button>
          <button
            type="button"
            onClick={() => { setMode("upload"); setTimeout(() => fileRef.current?.click(), 50); }}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md font-bold transition-all ${
              mode === "upload" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Upload size={11} /> Subir
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <input
          placeholder="https://..."
          value={urlValue}
          onChange={(e) => onUrlChange(e.target.value)}
          className="w-full bg-transparent border-b border-border py-2 px-1 focus:border-primary outline-none text-sm"
        />
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          className="w-full border-2 border-dashed border-border rounded-lg p-4 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
        >
          <Upload size={20} className="mx-auto mb-1 opacity-50" />
          {urlValue && urlValue.startsWith("data:") ? (
            <span className="text-green-600 font-bold">✓ Archivo cargado</span>
          ) : (
            <span>Haz clic para seleccionar archivo</span>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFile}
      />

      {/* Preview */}
      {preview && urlValue && (
        accept?.includes("image") ? (
          <img
            src={urlValue}
            alt="Vista previa"
            className="mt-2 w-full aspect-square object-cover rounded-lg shadow-sm"
            onError={(e) => e.target.classList.add("hidden")}
          />
        ) : (
          urlValue && (
            <video
              src={urlValue}
              muted
              loop
              className="mt-2 w-full aspect-square object-cover rounded-lg shadow-sm"
            />
          )
        )
      )}
    </div>
  );
}

// ─── Step Timer Config ────────────────────────────────────────────────────────
function StepTimerConfig({ timer, onChange }) {
  const hasTimer = !!timer;

  const toggle = () => {
    onChange(hasTimer ? null : { name: "", minutes: 5 });
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={toggle}
        className={`w-full flex items-center justify-between px-4 py-3 transition-colors font-bold text-sm ${
          hasTimer ? "bg-primary/10 text-primary" : "bg-background text-muted-foreground hover:bg-secondary"
        }`}
      >
        <span className="flex items-center gap-2">
          <Timer size={16} />
          {hasTimer ? "Temporizador configurado" : "Agregar temporizador a este paso"}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${hasTimer ? "bg-primary text-primary-foreground" : "bg-border text-muted-foreground"}`}>
          {hasTimer ? "ON" : "OFF"}
        </span>
      </button>

      {hasTimer && (
        <div className="p-4 bg-background flex gap-3 items-center">
          <div className="flex-1">
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Nombre del temporizador</label>
            <input
              placeholder="Ej. Tiempo de sellado"
              value={timer.name}
              onChange={(e) => onChange({ ...timer, name: e.target.value })}
              className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm font-medium focus:border-primary outline-none"
            />
          </div>
          <div className="w-28">
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Minutos</label>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onChange({ ...timer, minutes: Math.max(1, (timer.minutes || 1) - 1) })}
                className="w-8 h-9 bg-secondary rounded-lg font-bold flex items-center justify-center hover:bg-secondary/70"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={timer.minutes}
                onChange={(e) => onChange({ ...timer, minutes: parseInt(e.target.value) || 1 })}
                className="w-full bg-card border border-border rounded-lg px-2 py-2 text-center text-sm font-bold focus:border-primary outline-none"
              />
              <button
                type="button"
                onClick={() => onChange({ ...timer, minutes: (timer.minutes || 1) + 1 })}
                className="w-8 h-9 bg-primary text-primary-foreground rounded-lg font-bold flex items-center justify-center hover:bg-primary/90"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────
function AddRecipeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = !!editId;

  const [title, setTitle] = useState("");
  const [basePortions, setBasePortions] = useState(4);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("Intermedia");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [temperature, setTemperature] = useState("");
  const [utensils, setUtensils] = useState([""]);
  const [tips, setTips] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [isContestEntry, setIsContestEntry] = useState(false);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [ingredients, setIngredients] = useState([emptyIngredient()]);
  const [steps, setSteps] = useState([emptyStep()]);
  const [saving, setSaving] = useState(false);
  const [role, setRole] = useState("EDITOR");

  // Load dynamic categories from settings
  useEffect(() => {
    setCategories(getCategories());
    setAvailableTags(getTags());
    setRole(getAuthUser()?.role || "USER");
  }, []);


  useEffect(() => {
    if (isEditMode) {
      const existing = getRecipeById(editId);
      if (existing) {
        setTitle(existing.title || "");
        setBasePortions(existing.basePortions || 4);
        setCategory(existing.category || "");
        setDifficulty(existing.difficulty || "Intermedia");
        setPrepTime(existing.prepTime || "");
        setCookTime(existing.cookTime || "");
        setTemperature(existing.temperature || "");
        setUtensils(existing.utensils?.length ? existing.utensils : [""]);
        setTips(existing.tips || "");
        setIsPublic(existing.isPublic || false);
        setAuthor(existing.author || "");
        setRating(existing.rating || 0);
        setIsContestEntry(existing.isContestEntry || false);
        setDescription(existing.description || "");
        setTags(existing.tags || []);
        setIngredients(existing.ingredients?.length ? existing.ingredients : [emptyIngredient()]);
        setSteps(existing.steps?.length ? existing.steps.map(s => ({ ...emptyStep(), ...s })) : [emptyStep()]);
      }
    }
  }, [editId, isEditMode]);

  const addIngredient = () => setIngredients([...ingredients, emptyIngredient()]);
  const removeIngredient = (i) => setIngredients(ingredients.filter((_, idx) => idx !== i));
  const updateIngredient = (i, field, value) => {
    const u = [...ingredients]; u[i][field] = value; setIngredients(u);
  };

  const addStep = () => setSteps([...steps, emptyStep()]);
  const removeStep = (i) => setSteps(steps.filter((_, idx) => idx !== i));
  const updateStep = (i, field, value) => {
    const u = [...steps]; u[i][field] = value; setSteps(u);
  };

  const addUtensil = () => setUtensils([...utensils, ""]);
  const removeUtensil = (i) => setUtensils(utensils.filter((_, idx) => idx !== i));
  const updateUtensil = (i, value) => {
    const u = [...utensils]; u[i] = value; setUtensils(u);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || steps.some(s => !s.title)) {
      alert("Por favor completa al menos el nombre de la receta y el título de cada paso.");
      return;
    }
    setSaving(true);
    const recipe = {
      title,
      basePortions: parseInt(basePortions),
      category,
      difficulty,
      prepTime,
      cookTime,
      temperature,
      utensils: utensils.filter(u => u.trim() !== ""),
      tips,
      isPublic,
      author,
      rating,
      isContestEntry,
      description,
      tags,
      ingredients: ingredients.filter(i => i.name).map(i => ({
        ...i,
        qty: parseFloat(i.qty) || 0,
        price: parseFloat(i.price) || 0,
      })),
      steps: steps.filter(s => s.title),
    };
    try {
      if (isEditMode) {
        updateRecipe(editId, recipe);
      } else {
        saveRecipe(recipe);
      }
      router.push("/recipes");
    } catch (error) {
      alert(error.message);
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/recipes" className="text-primary flex items-center gap-2 mb-3 font-semibold hover:underline text-sm">
            <ArrowLeft size={18} /> Cancelar
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold">
            {isEditMode ? "✏️ Editar Receta" : "🍽️ Nueva Receta Chapina"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 pb-28">

          {/* ── Sección 1: Info General ── */}
          <section className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              Información General
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold mb-2">Nombre de la Receta *</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Jocón de Pollo"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 font-bold text-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Porciones Base</label>
                <input
                  type="number" min="1"
                  value={basePortions}
                  onChange={(e) => setBasePortions(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 font-bold text-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-bold mb-2">Categoría</label>
                <div className="flex gap-2 flex-wrap">
                  {categories.map(cat => (
                    <button key={cat} type="button"
                      onClick={() => setCategory(cat === category ? "" : cat)}
                      className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                        category === cat ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                      }`}
                    >{cat}</button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-bold mb-2">Etiquetas (Tags)</label>
                <div className="flex gap-2 flex-wrap">
                  {availableTags.map(tag => {
                    const isSelected = tags.includes(tag);
                    return (
                      <button key={tag} type="button"
                        onClick={() => {
                          if (isSelected) setTags(tags.filter(t => t !== tag));
                          else setTags([...tags, tag]);
                        }}
                        className={`px-3 py-1.5 rounded-full font-bold text-xs transition-all border-2 ${
                          isSelected ? "border-primary bg-primary/10 text-primary shadow-sm" : "border-border bg-background text-muted-foreground hover:border-primary/40"
                        }`}
                      ># {tag}</button>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-bold mb-2">Descripción Atractiva</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Una breve historia o descripción que antoje el plato..."
                  rows="2"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 font-medium text-base focus:ring-2 focus:ring-primary outline-none resize-none"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                  <Clock size={16} className="text-primary" /> Preparación
                </label>
                <input
                  type="text"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  placeholder="Ej. 15 min"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 font-bold text-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                  <Timer size={16} className="text-primary" /> Cocción
                </label>
                <input
                  type="text"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  placeholder="Ej. 45 min"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 font-bold text-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                  <Signal size={16} className="text-primary" /> Dificultad
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 font-bold text-lg focus:ring-2 focus:ring-primary outline-none appearance-none"
                >
                  <option value="Fácil">Fácil</option>
                  <option value="Intermedia">Intermedia</option>
                  <option value="Avanzada">Avanzada</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-bold mb-2">Temperatura (Horno o Fuego)</label>
                <input
                  type="text"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="Ej. 180°C / Fuego Medio"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 font-bold text-lg focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-bold mb-2">Consejos del Chef / Notas (Opcional)</label>
                <textarea
                  value={tips}
                  onChange={(e) => setTips(e.target.value)}
                  placeholder="Sugerencias para servir, sustituciones, o secretos..."
                  rows="3"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 font-medium text-base focus:ring-2 focus:ring-primary outline-none resize-none"
                />
              </div>
            </div>
          </section>

          {/* ── Sección 2: Ingredientes y Utensilios ── */}
          <section className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                Insumos y Utensilios
              </h2>
            </div>
            
            <div className="space-y-8">
              {/* Ingredients */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg">Ingredientes</h3>
                  <button type="button" onClick={addIngredient}
                    className="text-primary font-bold flex items-center gap-1 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors text-sm">
                    <Plus size={18} /> Agregar
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="hidden md:grid grid-cols-12 gap-2 text-xs font-bold text-muted-foreground uppercase px-2 mb-1">
                    <div className="col-span-4">Nombre</div><div className="col-span-2">Cantidad</div>
                    <div className="col-span-2">Unidad</div><div className="col-span-2">Precio (Q)</div>
                    <div className="col-span-2">Tienda</div>
                  </div>
                  {ingredients.map((ing, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 bg-background p-3 rounded-xl border border-border items-center">
                      <input placeholder="Nombre *" value={ing.name}
                        onChange={(e) => updateIngredient(idx, "name", e.target.value)}
                        className="col-span-12 md:col-span-4 bg-transparent border-b border-border py-1.5 px-2 focus:border-primary outline-none font-medium" />
                      <input placeholder="Cant." type="number" step="0.01" value={ing.qty}
                        onChange={(e) => updateIngredient(idx, "qty", e.target.value)}
                        className="col-span-5 md:col-span-2 bg-transparent border-b border-border py-1.5 px-2 focus:border-primary outline-none font-medium" />
                      <select value={ing.unit} onChange={(e) => updateIngredient(idx, "unit", e.target.value)}
                        className="col-span-4 md:col-span-2 bg-transparent border-b border-border py-1.5 px-2 focus:border-primary outline-none font-medium">
                        {["lb","oz","g","kg","taza","ml","l","unidad","dientes","cdta","cda"].map(u => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                      <input placeholder="0.00" type="number" step="0.01" value={ing.price}
                        onChange={(e) => updateIngredient(idx, "price", e.target.value)}
                        className="col-span-5 md:col-span-2 bg-transparent border-b border-border py-1.5 px-2 focus:border-primary outline-none font-medium" />
                      <input placeholder="Tienda" value={ing.store}
                        onChange={(e) => updateIngredient(idx, "store", e.target.value)}
                        className="col-span-6 md:col-span-2 bg-transparent border-b border-border py-1.5 px-2 focus:border-primary outline-none font-medium" />
                      <button type="button" onClick={() => removeIngredient(idx)}
                        className="col-span-1 text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors flex items-center justify-center">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border w-full"></div>

              {/* Utensils */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg">Utensilios</h3>
                  <button type="button" onClick={addUtensil}
                    className="text-primary font-bold flex items-center gap-1 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors text-sm">
                    <Plus size={18} /> Agregar
                  </button>
                </div>
                <div className="space-y-3">
                  {utensils.map((utensil, idx) => (
                    <div key={`u-${idx}`} className="flex gap-2 bg-background p-2 rounded-xl border border-border items-center">
                      <input placeholder="Ej. Olla tamalera, Batidora..." value={utensil}
                        onChange={(e) => updateUtensil(idx, e.target.value)}
                        className="flex-1 bg-transparent border-b border-border py-1.5 px-2 focus:border-primary outline-none font-medium" />
                      <button type="button" onClick={() => removeUtensil(idx)} 
                        className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Sección 3: Pasos ── */}
          <section className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                Pasos (Chef Mode)
              </h2>
              <button type="button" onClick={addStep}
                className="text-primary font-bold flex items-center gap-1 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors text-sm">
                <Plus size={18} /> Agregar Paso
              </button>
            </div>

            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="bg-background p-5 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-sm text-primary uppercase tracking-wider">Paso {idx + 1}</span>
                    {steps.length > 1 && (
                      <button type="button" onClick={() => removeStep(idx)}
                        className="text-destructive hover:bg-destructive/10 p-1.5 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Título */}
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Título del Paso *</label>
                      <input required
                        placeholder="Ej. Tostar el ajonjolí"
                        value={step.title}
                        onChange={(e) => updateStep(idx, "title", e.target.value)}
                        className="w-full bg-transparent border-b-2 border-border py-2 text-xl font-bold focus:border-primary outline-none"
                      />
                    </div>

                    {/* Descripción */}
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Instrucciones</label>
                      <textarea
                        placeholder="Explica en detalle qué hacer en este paso..."
                        value={step.description}
                        onChange={(e) => updateStep(idx, "description", e.target.value)}
                        className="w-full bg-transparent border border-border rounded-lg p-3 h-24 focus:border-primary outline-none resize-none"
                      />
                    </div>

                    {/* Imagen y Video con subida */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <MediaInput
                        label="Imagen del paso"
                        icon={ImageIcon}
                        urlValue={step.imageUrl}
                        onUrlChange={(v) => updateStep(idx, "imageUrl", v)}
                        onFileChange={(v) => updateStep(idx, "imageUrl", v)}
                        accept="image/*"
                        preview
                      />
                      <MediaInput
                        label="Video en loop"
                        icon={Video}
                        urlValue={step.videoUrl}
                        onUrlChange={(v) => updateStep(idx, "videoUrl", v)}
                        onFileChange={(v) => updateStep(idx, "videoUrl", v)}
                        accept="video/*"
                        preview
                      />
                    </div>

                    {/* Temporizador por paso */}
                    <StepTimerConfig
                      timer={step.timer}
                      onChange={(timerVal) => updateStep(idx, "timer", timerVal)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Sección Comunidad ── */}
          {role !== "USER" ? (
            <section className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className="bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  <Globe size={14} />
                </span>
                Comunidad y Visibilidad
              </h2>

              <div className="space-y-5">
                {/* Public toggle */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-base flex items-center gap-2">
                      {isPublic ? <Globe size={16} className="text-primary" /> : <Lock size={16} className="text-muted-foreground" />}
                      {isPublic ? "Receta Pública" : "Receta Privada"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {isPublic
                        ? "Tu receta puede aparecer en la comunidad y concursos."
                        : "Solo tú puedes ver esta receta."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPublic(p => !p)}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 shrink-0 ${isPublic ? "bg-primary" : "bg-border"}`}
                  >
                    <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all duration-300 ${isPublic ? "left-7" : "left-0.5"}`} />
                  </button>
                </div>

                {/* Author credit */}
                {isPublic && (
                  <div>
                    <label className="block text-sm font-bold mb-2">Tu nombre / Crédito del autor</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Ej. Hugo León, Chef Privado"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-primary outline-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Este nombre aparecerá en la tarjeta pública de tu receta.
                    </p>
                  </div>
                )}

                {/* Self-rating */}
                <div>
                  <label className="block text-sm font-bold mb-2 flex items-center gap-2">
                    <Star size={14} className="text-amber-400" /> Calificación del Autor
                  </label>
                  <StarRating value={rating} onChange={setRating} size="lg" />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Tu propia evaluación. Los chefs editores agregarán su calificación oficial.
                  </p>
                </div>

                {/* Contest entry */}
                {isPublic && (
                  <button
                    type="button"
                    onClick={() => setIsContestEntry(v => !v)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      isContestEntry
                        ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20"
                        : "border-border hover:border-amber-400/50"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${isContestEntry ? "bg-amber-400 text-white" : "bg-secondary text-muted-foreground"}`}>
                      <Trophy size={22} />
                    </div>
                    <div>
                      <p className={`font-bold ${isContestEntry ? "text-amber-700 dark:text-amber-300" : ""}`}>
                        {isContestEntry ? "✓ Inscrita al Concurso Semanal" : "Participar en el Concurso Semanal"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Chefs editores calificarán tu receta. ¡Compite por premios especiales!
                      </p>
                    </div>
                  </button>
                )}
              </div>
            </section>
          ) : (
             <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 rounded-2xl flex gap-3 text-sm font-medium">
                <Lock className="shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-bold text-base mb-1">Receta Privada Local</p>
                  <p>Como usuario final, esta receta se guardará de forma local en tu recetario privado. La opción de publicarla globalmente requiere revisión editorial (próximamente).</p>
                </div>
             </div>
          )}

          {/* Fixed Save Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-lg border-t border-border flex justify-center z-50">
            <button type="submit" disabled={saving}
              className="w-full max-w-lg bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl active:scale-95 disabled:opacity-70">
              <Save size={22} />
              {saving ? "Guardando..." : role === "USER" ? "Guardar Localmente" : isEditMode ? "Guardar Cambios" : "Guardar Receta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddRecipePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Cargando formulario...</div>}>
      <AddRecipeForm />
    </Suspense>
  );
}
