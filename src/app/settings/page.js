"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { getSettings, saveSettings } from "@/lib/settingsStore";
import { getAuthUser, getUsersList, createUser, updateUser, deleteUser } from "@/lib/authStore";
import {
  Sun, Moon, Monitor, Plus, X, Tag, User, ChefHat,
  Mail, Phone, MapPin, Check, Palette, Save, RotateCcw, Hash,
  Users, Pencil, Trash2, Shield, Link as LinkIcon, Upload
} from "lucide-react";

// ── Theme Picker ──────────────────────────────────────────────────────────────
function ThemePicker({ value, onChange }) {
  const options = [
    { id: "light", label: "Claro", icon: Sun },
    { id: "dark", label: "Oscuro", icon: Moon },
    { id: "system", label: "Sistema", icon: Monitor },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all font-bold text-sm ${
            value === id
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-secondary"
          }`}
        >
          <Icon size={24} />
          {label}
          {value === id && <Check size={14} className="text-primary" />}
        </button>
      ))}
    </div>
  );
}

// ── Items Manager ────────────────────────────────────────────────────────
function ItemsManager({ items, onChange, placeholder, itemLabel }) {
  const [newItem, setNewItem] = useState("");

  const add = () => {
    const trimmed = newItem.trim();
    if (!trimmed || items.includes(trimmed)) return;
    onChange([...items, trimmed]);
    setNewItem("");
  };

  const remove = (itemToRemove) => {
    onChange(items.filter((c) => c !== itemToRemove));
  };

  const catColors = [
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  ];

  return (
    <div className="space-y-4">
      {/* Add new */}
      <div className="flex gap-2">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder={placeholder}
          className="flex-1 bg-background border border-border rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-primary outline-none"
        />
        <button
          type="button"
          onClick={add}
          className="bg-primary text-primary-foreground px-4 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-1"
        >
          <Plus size={20} /> Agregar
        </button>
      </div>

      {/* List */}
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <div
            key={item}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm ${catColors[idx % catColors.length]}`}
          >
            {item}
            <button
              type="button"
              onClick={() => remove(item)}
              className="hover:opacity-60 transition-opacity ml-0.5"
              aria-label={`Eliminar ${item}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {items.length} {itemLabel}{items.length !== 1 ? "s" : ""}. Presiona Enter o el botón para agregar.
      </p>
    </div>
  );
}

// ── Account Form ──────────────────────────────────────────────────────────────
function AccountField({ label, icon: Icon, value, onChange, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-sm font-bold mb-1.5 flex items-center gap-1.5">
        <Icon size={14} className="text-muted-foreground" /> {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background border border-border rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-primary outline-none transition-all"
      />
    </div>
  );
}

// ── Section Wrapper ───────────────────────────────────────────────────────────
function Section({ icon: Icon, title, description, children }) {
  return (
    <section className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-border flex items-center gap-3">
        <div className="p-2 bg-primary/10 text-primary rounded-lg">
          <Icon size={22} />
        </div>
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

// ── Settings Page ─────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [currentRole, setCurrentRole] = useState("USER");
  const [usersList, setUsersList] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // null | user object | "new"
  const fileRef = useRef(null);

  useEffect(() => {
    setSettings(getSettings());
    setCurrentRole(getAuthUser()?.role || "USER");
    setUsersList(getUsersList());
  }, []);

  if (!settings) return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando ajustes...</div>
    </div>
  );

  const updateField = (path, value) => {
    setSettings(prev => {
      const parts = path.split(".");
      if (parts.length === 1) return { ...prev, [path]: value };
      return { ...prev, [parts[0]]: { ...prev[parts[0]], [parts[1]]: value } };
    });
  };

  const handleThemeChange = (theme) => {
    updateField("theme", theme);
    // Apply immediately without saving
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else if (theme === "light") root.classList.remove("dark");
    else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    }
  };

  const handleSave = () => {
    saveSettings(settings);
    // Notify ThemeProvider of the change within same tab
    window.dispatchEvent(new Event("themeChange"));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Configuración</h1>
          <p className="text-muted-foreground mt-1">Personaliza tu experiencia en Cocina Chapina Pro.</p>
        </div>

        <div className="space-y-6">
          {/* ── Apariencia ── */}
          <Section icon={Palette} title="Apariencia" description="Cambia el tema visual de la aplicación">
            <ThemePicker value={settings.theme} onChange={handleThemeChange} />
          </Section>

          {/* ── Categorías ── */}
          <Section
            icon={Tag}
            title="Categorías de Recetas"
            description="Agrega, edita o elimina las categorías disponibles al crear una receta"
          >
            <ItemsManager
              items={settings.categories}
              onChange={(cats) => updateField("categories", cats)}
              placeholder="Nueva categoría (ej. Caldo, Tamal)"
              itemLabel="categoría"
            />
          </Section>

          {/* ── Etiquetas ── */}
          <Section
            icon={Hash}
            title="Etiquetas (Tags)"
            description="Administra las etiquetas que puedes asignar a tus recetas"
          >
            <ItemsManager
              items={settings.tags || []}
              onChange={(tags) => updateField("tags", tags)}
              placeholder="Nueva etiqueta (ej. Picante, Vegano)"
              itemLabel="etiqueta"
            />
          </Section>

          {/* ── Gestión de Usuarios (solo ADMIN) ── */}
          {currentRole === "ADMIN" && (
            <Section
              icon={Users}
              title="Gestión de Usuarios"
              description="Agrega, edita o elimina usuarios y editores del sistema"
            >
              <div className="space-y-4">
                {/* User list */}
                <div className="space-y-3">
                  {usersList.map((u) => (
                    <div key={u.id} className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border">
                      {/* Avatar */}
                      {u.avatarUrl ? (
                        <img src={u.avatarUrl} alt={u.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm shrink-0"
                          style={{ backgroundColor: u.avatarColor || "#f59e0b" }}
                        >
                          {u.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{u.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        u.role === "ADMIN" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" :
                        u.role === "EDITOR" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" :
                        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}>{u.role}</span>
                      <button onClick={() => setEditingUser({ ...u })} className="p-1.5 hover:bg-primary/10 text-primary rounded-lg transition-colors">
                        <Pencil size={14} />
                      </button>
                      {u.role !== "ADMIN" && (
                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar a ${u.name}?`)) {
                              setUsersList(deleteUser(u.id));
                            }
                          }}
                          className="p-1.5 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add user button */}
                {editingUser === null && (
                  <button
                    type="button"
                    onClick={() => setEditingUser({ id: null, name: "", email: "", role: "USER", description: "", avatarColor: "#10b981", avatarUrl: "" })}
                    className="w-full py-3 rounded-xl border-2 border-dashed border-primary/40 text-primary font-bold text-sm hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={18} /> Agregar usuario
                  </button>
                )}

                {/* Edit / Create form */}
                {editingUser && editingUser !== null && (
                  <div className="border-2 border-primary/30 bg-primary/5 rounded-2xl p-5 space-y-4">
                    <h3 className="font-bold text-base flex items-center gap-2">
                      {editingUser.id ? <Pencil size={16} className="text-primary" /> : <Plus size={16} className="text-primary" />}
                      {editingUser.id ? "Editar usuario" : "Nuevo usuario"}
                    </h3>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Nombre completo</label>
                        <input
                          value={editingUser.name}
                          onChange={e => setEditingUser(u => ({ ...u, name: e.target.value }))}
                          placeholder="Ej. Ana García"
                          className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Correo</label>
                        <input
                          type="email"
                          value={editingUser.email}
                          onChange={e => setEditingUser(u => ({ ...u, email: e.target.value }))}
                          placeholder="correo@ejemplo.com"
                          className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>
                    </div>

                    {/* Role & Description */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Rol</label>
                        <select
                          value={editingUser.role}
                          disabled={editingUser.role === "ADMIN"}
                          onChange={e => setEditingUser(u => ({ ...u, role: e.target.value }))}
                          className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
                        >
                          <option value="USER">Usuario</option>
                          <option value="EDITOR">Editor</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Descripción</label>
                        <input
                          value={editingUser.description}
                          onChange={e => setEditingUser(u => ({ ...u, description: e.target.value }))}
                          placeholder="Ej. Chef de repostería"
                          className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>
                    </div>

                    {/* Avatar */}
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase mb-2">Foto de perfil</label>
                      <div className="flex gap-3 items-start">
                        {/* Preview */}
                        <div className="shrink-0">
                          {editingUser.avatarUrl ? (
                            <img src={editingUser.avatarUrl} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-primary" />
                          ) : (
                            <div
                              className="w-14 h-14 rounded-full flex items-center justify-center font-black text-white text-lg border-2 border-primary"
                              style={{ backgroundColor: editingUser.avatarColor || "#10b981" }}
                            >
                              {(editingUser.name || "?").split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={editingUser.avatarUrl}
                            onChange={e => setEditingUser(u => ({ ...u, avatarUrl: e.target.value }))}
                            placeholder="URL de foto (https://...)"
                            className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary outline-none"
                          />
                          <div className="flex gap-2 items-center">
                            <button
                              type="button"
                              onClick={() => fileRef.current?.click()}
                              className="flex items-center gap-2 text-xs font-bold bg-secondary px-3 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
                            >
                              <Upload size={13} /> Subir foto
                            </button>
                            <input
                              ref={fileRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={e => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = () => setEditingUser(u => ({ ...u, avatarUrl: reader.result }));
                                reader.readAsDataURL(file);
                              }}
                            />
                            <label className="text-xs text-muted-foreground">o elige un color:</label>
                            <input
                              type="color"
                              value={editingUser.avatarColor || "#10b981"}
                              onChange={e => setEditingUser(u => ({ ...u, avatarColor: e.target.value, avatarUrl: "" }))}
                              className="w-8 h-8 rounded-lg border border-border cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (!editingUser.name.trim()) { alert("El nombre es obligatorio."); return; }
                          if (editingUser.id) {
                            setUsersList(updateUser(editingUser.id, editingUser));
                          } else {
                            setUsersList(createUser(editingUser));
                          }
                          setEditingUser(null);
                        }}
                        className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
                      >
                        <Check size={16} /> {editingUser.id ? "Guardar cambios" : "Crear usuario"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingUser(null)}
                        className="px-4 py-2.5 rounded-xl border-2 border-border font-bold text-sm hover:bg-secondary transition-all"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* ── Cuenta ── */}
          <Section
            icon={User}
            title="Información de Cuenta"
            description="Tus datos personales y de tu restaurante o negocio"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AccountField
                label="Tu nombre"
                icon={User}
                value={settings.account.name}
                onChange={(v) => updateField("account.name", v)}
                placeholder="Ej. Hugo León"
              />
              <AccountField
                label="Nombre del restaurante"
                icon={ChefHat}
                value={settings.account.restaurantName}
                onChange={(v) => updateField("account.restaurantName", v)}
                placeholder="Ej. La Cocina de Mamá"
              />
              <AccountField
                label="Correo electrónico"
                icon={Mail}
                type="email"
                value={settings.account.email}
                onChange={(v) => updateField("account.email", v)}
                placeholder="correo@ejemplo.com"
              />
              <AccountField
                label="Teléfono"
                icon={Phone}
                type="tel"
                value={settings.account.phone}
                onChange={(v) => updateField("account.phone", v)}
                placeholder="+502 0000-0000"
              />
              <div className="sm:col-span-2">
                <AccountField
                  label="Ciudad"
                  icon={MapPin}
                  value={settings.account.city}
                  onChange={(v) => updateField("account.city", v)}
                  placeholder="Guatemala, Quetzaltenango..."
                />
              </div>
            </div>
          </Section>

          {/* ── Mantenimiento ── */}
          <Section 
            icon={RotateCcw} 
            title="Mantenimiento de Datos" 
            description="Acciones para gestionar el almacenamiento local"
          >
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Si no ves las nuevas recetas de ejemplo, puedes restablecer la base de datos local. 
                <span className="text-destructive font-bold"> ¡Atención! Esto borrará las recetas que hayas creado manualmente.</span>
              </p>
              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="w-full py-3 rounded-xl border-2 border-destructive text-destructive font-bold hover:bg-destructive hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={18} /> Restablecer Recetas de Ejemplo
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("cocina_chapina_recipes");
                      window.location.href = "/recipes";
                    }}
                    className="flex-1 py-3 rounded-xl bg-destructive text-white font-bold hover:bg-destructive/90 transition-all flex items-center justify-center gap-2 animate-in fade-in"
                  >
                    Confirmar Borrado
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="py-3 px-6 rounded-xl border-2 border-border font-bold hover:bg-secondary transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </Section>

          {/* ── App Info ── */}
          <section className="bg-card border border-border rounded-2xl p-5 text-center">
            <div className="flex justify-center mb-3">
              <svg width="40" height="40" viewBox="0 0 34 34" fill="none">
                <rect width="34" height="34" rx="8" fill="#F59E0B"/>
                <path d="M17 6C17 6 8 12 8 20C8 24.4183 12.0294 28 17 28C21.9706 28 26 24.4183 26 20C26 12 17 6Z" fill="white" fillOpacity="0.9"/>
                <path d="M17 11C17 11 12 15 12 20C12 22.7614 14.2386 25 17 25C19.7614 25 22 22.7614 22 20C22 15 17 11Z" fill="#F59E0B"/>
                <circle cx="17" cy="20" r="3" fill="white"/>
              </svg>
            </div>
            <p className="font-bold">Cocina Chapina Pro</p>
            <p className="text-sm text-muted-foreground">Versión 1.0.0 · Hecho con ❤️ en Guatemala</p>
          </section>
        </div>

        {/* Fixed save button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-lg border-t border-border flex justify-center z-50">
          <button
            onClick={handleSave}
            className={`w-full max-w-lg py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 ${
              saved
                ? "bg-green-600 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {saved ? (
              <><Check size={22} /> ¡Guardado!</>
            ) : (
              <><Save size={22} /> Guardar Configuración</>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
