"use client";

import { useState, useEffect, useRef } from "react";
import {
  Maximize, Minimize, Play, ChevronLeft, ChevronRight,
  Pause, RotateCcw, Timer, Utensils, Clock, Signal, Volume2, VolumeX
} from "lucide-react";
import clsx from "clsx";

// ── Audio beep ────────────────────────────────────────────────────────────────
function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 200, 400].forEach((delay) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = "sine";
      o.frequency.setValueAtTime(880, ctx.currentTime + delay / 1000);
      g.gain.setValueAtTime(0.6, ctx.currentTime + delay / 1000);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay / 1000 + 0.15);
      o.start(ctx.currentTime + delay / 1000);
      o.stop(ctx.currentTime + delay / 1000 + 0.18);
    });
  } catch (e) { /* silent */ }
}

// ── Step Timer — stateless component ──────────────────────────────────────────
function StepTimer({ timerIdx, state, onToggle, onReset }) {
  const { timeLeft, isRunning, totalSeconds, name } = state;
  const isFinished = timeLeft === 0;
  
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const pct = timeLeft / totalSeconds;
  const r = 22;
  const circ = 2 * Math.PI * r;

  return (
    <div className={clsx(
      "flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 transition-all duration-300 shrink-0",
      isFinished ? "bg-destructive/10 border-destructive animate-pulse" :
      isRunning   ? "bg-primary/10 border-primary shadow-sm" :
                    "bg-background border-border"
    )}>
      <div className="relative shrink-0">
        <svg width="52" height="52" className="-rotate-90">
          <circle cx="26" cy="26" r={r} fill="none" stroke="currentColor"
            strokeWidth="3.5" className="text-border opacity-40" />
          <circle cx="26" cy="26" r={r} fill="none" stroke="currentColor"
            strokeWidth="3.5" strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct)} strokeLinecap="round"
            className={isFinished ? "text-destructive" : "text-primary"}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={clsx("text-xs font-mono font-bold", isFinished && "text-destructive")}>
            {fmt(timeLeft)}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate flex items-center gap-1">
          <Timer size={12} className={isRunning ? "text-primary" : "text-muted-foreground"} />
          {name || "Temporizador"}
        </p>
        <p className={clsx("text-xs font-semibold", isFinished ? "text-destructive" : "text-muted-foreground")}>
          {isFinished ? "¡Completado!" : `${Math.ceil(totalSeconds / 60)} min`}
        </p>
      </div>

      <div className="flex gap-1.5 shrink-0">
        <button onClick={onReset}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/70 active:scale-90 transition-all">
          <RotateCcw size={15} />
        </button>
        <button onClick={onToggle}
          className={clsx(
            "w-12 h-9 flex items-center justify-center rounded-lg font-bold transition-all active:scale-90 shadow-sm",
            isRunning ? "bg-primary/15 text-primary border-2 border-primary" : "bg-primary text-primary-foreground"
          )}>
          {isRunning ? <Pause size={17} /> : <Play size={17} />}
        </button>
      </div>
    </div>
  );
}

// ── Global Timer Bar ──────────────────────────────────────────────────────────
function GlobalTimerBar({ activeTimers, currentStep, onJumpToStep }) {
  const activeList = Object.entries(activeTimers).filter(([idx, state]) => {
    return state.isRunning || state.timeLeft === 0;
  });

  if (activeList.length === 0) return null;

  return (
    <div className="bg-stone-900 border-t border-white/10 px-4 py-2 flex items-center gap-4 overflow-x-auto scrollbar-hide no-scrollbar animate-in slide-in-from-bottom duration-300">
      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 shrink-0">
        Activos
      </p>
      {activeList.map(([idx, state]) => {
        const isCurrent = parseInt(idx) === currentStep;
        const isDone = state.timeLeft === 0;
        const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

        return (
          <button
            key={idx}
            onClick={() => onJumpToStep(parseInt(idx))}
            className={clsx(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 border",
              isDone ? "bg-destructive text-white border-destructive animate-pulse" :
              isCurrent ? "bg-primary text-primary-foreground border-primary" :
                          "bg-white/10 text-white border-white/10 hover:bg-white/20"
            )}
          >
            <Timer size={12} className={clsx(!isDone && !isCurrent && "text-primary")} />
            <span className="truncate max-w-[80px]">{state.name}</span>
            <span className="font-mono bg-black/20 px-1.5 py-0.5 rounded-md">
              {fmt(state.timeLeft)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── CookView ──────────────────────────────────────────────────────────────────
export default function CookView({ recipe, currentScale = 4 }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [wakeLock, setWakeLock] = useState(null);
  const containerRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Global Timers State: { [stepIdx]: { timeLeft, isRunning, totalSeconds, name } }
  const [activeTimers, setActiveTimers] = useState({});

  const speakStep = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    const textToRead = `${recipe.steps[currentStep].title}. ${recipe.steps[currentStep].description}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    
    // Configuración para que suene más natural
    utterance.lang = "es-MX"; // Cambiado a es-MX que suele tener voces más cálidas
    utterance.rate = 0.85;    // Más pausado para que se entienda mejor en la cocina
    utterance.pitch = 1.0;    // Tono base natural
    
    // Intentar buscar una voz más humana
    const voices = window.speechSynthesis.getVoices();
    // Buscamos voces de Google (suelen ser neuronales) o voces específicas de macOS/Windows que suenan mejor
    const preferredVoice = voices.find(v => 
      (v.lang.includes("es") && v.name.includes("Google")) || 
      (v.lang.includes("es") && v.name.includes("Monica")) ||
      (v.lang.includes("es") && v.name.includes("Jorge")) ||
      (v.lang.includes("es") && v.name.includes("Paulina"))
    ) || voices.find(v => v.lang.includes("es"));
    
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    utterance.onstart = () => setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Stop speaking on step change
  useEffect(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [currentStep]);

  useEffect(() => { 
    setCurrentStep(0);
    setActiveTimers({}); // Reset timers when switching recipes
  }, [recipe?.id]);

  // Global timer interval
  useEffect(() => {
    const id = setInterval(() => {
      setActiveTimers(prev => {
        const next = { ...prev };
        let changed = false;
        
        Object.keys(next).forEach(idx => {
          const timer = next[idx];
          if (timer.isRunning && timer.timeLeft > 0) {
            timer.timeLeft -= 1;
            changed = true;
            if (timer.timeLeft === 0) {
              timer.isRunning = false;
              playBeep();
            }
          }
        });
        
        return changed ? { ...next } : prev;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const handleToggleTimer = (idx) => {
    setActiveTimers(prev => {
      const step = recipe.steps[idx];
      const existing = prev[idx];
      
      if (existing) {
        return { ...prev, [idx]: { ...existing, isRunning: !existing.isRunning } };
      } else {
        const total = (step.timer.minutes || 1) * 60;
        return { ...prev, [idx]: { 
          timeLeft: total, 
          isRunning: true, 
          totalSeconds: total, 
          name: step.timer.name 
        }};
      }
    });
  };

  const handleResetTimer = (idx) => {
    setActiveTimers(prev => {
      const existing = prev[idx];
      if (!existing) return prev;
      return { ...prev, [idx]: { ...existing, timeLeft: existing.totalSeconds, isRunning: false } };
    });
  };

  // Wake Lock
  useEffect(() => {
    const request = async () => {
      try { if ("wakeLock" in navigator) setWakeLock(await navigator.wakeLock.request("screen")); }
      catch (e) {}
    };
    const release = async () => { if (wakeLock) { await wakeLock.release(); setWakeLock(null); } };
    if (isFullscreen) request(); else release();
    return () => { release(); };
  }, [isFullscreen]);

  // Fullscreen
  const toggleFullscreen = () => {
    !document.fullscreenElement
      ? containerRef.current?.requestFullscreen().catch(() => {})
      : document.exitFullscreen();
  };
  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  if (!recipe?.steps) return null;

  const step = recipe.steps[currentStep];
  const total = recipe.steps.length;
  const hasMedia = step.videoUrl || step.imageUrl;

  return (
    <div
      ref={containerRef}
      className={clsx(
        "flex flex-col bg-background text-foreground",
        isFullscreen
          ? "fixed inset-0 z-50"
          : "relative w-full rounded-2xl border border-border shadow-lg overflow-hidden"
      )}
    >
      {/* ── Header bar ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="bg-primary text-primary-foreground font-bold px-3 py-1 rounded-full text-xs shrink-0">
            {currentStep + 1}/{total}
          </div>
          <div className="min-w-0">
            <h2 className="font-bold truncate text-base">{recipe.title}</h2>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase">
                <Clock size={10} className="text-primary" /> {recipe.prepTime || "-- min"}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase">
                <Signal size={10} className="text-primary" /> {recipe.difficulty || "Intermedia"}
              </span>
            </div>
          </div>
        </div>
        <button onClick={toggleFullscreen}
          className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all shrink-0 ml-2">
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      </div>

      {/* ── MOBILE layout: vertical stack ── */}
      {/* ── DESKTOP layout: side by side (md+) ── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

        {/* Media: 1:1 format (aspect-square) */}
        <div className={clsx(
          "bg-stone-900 flex items-center justify-center relative overflow-hidden shrink-0",
          "aspect-square w-full md:w-1/2 md:h-auto"
        )}>
          {step.videoUrl ? (
            <video src={step.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
          ) : step.imageUrl ? (
            <img src={step.imageUrl} alt={step.title} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center text-stone-500 opacity-30">
              <Utensils size={40} />
              <span className="text-xs mt-2">Sin imagen</span>
            </div>
          )}
        </div>

        {/* Content panel: flex col, fills remaining space */}
        <div className="flex-1 flex flex-col bg-card overflow-hidden md:w-1/2">

          {/* Scrollable instructions — takes available space */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg sm:text-xl font-bold leading-tight flex-1">{step.title}</h3>
              <button
                onClick={speakStep}
                className={clsx(
                  "shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm",
                  isSpeaking ? "bg-primary text-primary-foreground scale-110" : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                )}
                title={isSpeaking ? "Detener lectura" : "Leer paso en voz alta"}
              >
                {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
            
            {/* Static time info */}
            {step.timer?.minutes && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-lg text-sm font-bold text-muted-foreground">
                <Clock size={14} className="text-primary" />
                Lleva: {step.timer.minutes} minutos
              </div>
            )}

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">{step.description}</p>

            {step.ingredients?.length > 0 && (
              <div className="bg-accent/40 rounded-xl px-3 py-2.5">
                <p className="text-xs font-bold text-accent-foreground uppercase tracking-wide mb-1.5">
                  Ingredientes
                </p>
                <ul className="space-y-1">
                  {step.ingredients.map((ing, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Timer — always visible, OUTSIDE the scroll area */}
          {step.timer && (
            <div className="px-3 pb-2 pt-1 border-t border-border bg-card shrink-0">
              <StepTimer
                timerIdx={currentStep}
                state={activeTimers[currentStep] || {
                  timeLeft: (step.timer.minutes || 1) * 60,
                  isRunning: false,
                  totalSeconds: (step.timer.minutes || 1) * 60,
                  name: step.timer.name
                }}
                onToggle={() => handleToggleTimer(currentStep)}
                onReset={() => handleResetTimer(currentStep)}
              />
            </div>
          )}

          {/* Global Timer Bar — only visible when there are active background timers */}
          <GlobalTimerBar 
            activeTimers={activeTimers} 
            currentStep={currentStep}
            onJumpToStep={setCurrentStep}
          />

          {/* Step dots — always visible */}
          <div className="flex items-center justify-center gap-1.5 py-2 border-t border-border shrink-0">
            {recipe.steps.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentStep(idx)}
                className={clsx(
                  "rounded-full transition-all duration-300",
                  idx === currentStep ? "w-5 h-2.5 bg-primary" :
                  idx < currentStep  ? "w-2.5 h-2.5 bg-primary/40" :
                                       "w-2.5 h-2.5 bg-border"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer nav — FAT FINGER ── */}
      <div className="flex gap-3 p-3 bg-card border-t border-border shrink-0">
        <button disabled={currentStep === 0}
          onClick={() => setCurrentStep(p => p - 1)}
          className="flex-1 flex items-center justify-center gap-1.5 py-3.5 sm:py-4 bg-secondary text-secondary-foreground rounded-xl font-bold text-base disabled:opacity-30 active:scale-95 transition-all">
          <ChevronLeft size={22} /> Anterior
        </button>
        <button disabled={currentStep === total - 1}
          onClick={() => setCurrentStep(p => p + 1)}
          className="flex-1 flex items-center justify-center gap-1.5 py-3.5 sm:py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base disabled:opacity-30 active:scale-95 transition-all shadow-md">
          Siguiente <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
