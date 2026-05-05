"use client";

import { useState, useEffect, useRef } from "react";
import { Timer, Play, Pause, X, Plus } from "lucide-react";

// #3: Función de alerta de audio usando Web Audio API
function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const beepSequence = [0, 150, 300, 450];
    beepSequence.forEach((delay) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, ctx.currentTime + delay / 1000);
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime + delay / 1000);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay / 1000 + 0.1);
      oscillator.start(ctx.currentTime + delay / 1000);
      oscillator.stop(ctx.currentTime + delay / 1000 + 0.15);
    });
  } catch (e) {
    console.warn("Web Audio no disponible:", e);
  }
}

export default function TimerWidget() {
  const [timers, setTimers] = useState([]);
  const [newTimerName, setNewTimerName] = useState("");
  const [newTimerMinutes, setNewTimerMinutes] = useState(5);
  // Track which timers already beeped so we don't repeat
  const beepedRef = useRef(new Set());

  const addTimer = () => {
    if (newTimerMinutes <= 0) return;
    const newTimer = {
      id: Date.now().toString(),
      name: newTimerName || "Temporizador",
      duration: newTimerMinutes * 60,
      timeLeft: newTimerMinutes * 60,
      isRunning: true,
    };
    setTimers(prev => [...prev, newTimer]);
    setNewTimerName("");
    setNewTimerMinutes(5);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTimer();
  };

  const toggleTimer = (id) => {
    setTimers(timers.map(timer =>
      timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
    ));
  };

  const removeTimer = (id) => {
    beepedRef.current.delete(id);
    setTimers(timers.filter(timer => timer.id !== id));
  };

  const resetTimer = (id) => {
    beepedRef.current.delete(id);
    setTimers(timers.map(timer =>
      timer.id === id ? { ...timer, timeLeft: timer.duration, isRunning: true } : timer
    ));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(currentTimers =>
        currentTimers.map(timer => {
          if (timer.isRunning && timer.timeLeft > 0) {
            const newTimeLeft = timer.timeLeft - 1;
            // #3: Trigger audio when reaching 0
            if (newTimeLeft === 0 && !beepedRef.current.has(timer.id)) {
              beepedRef.current.add(timer.id);
              playBeep();
            }
            return { ...timer, timeLeft: newTimeLeft };
          }
          if (timer.timeLeft === 0 && timer.isRunning) {
            return { ...timer, isRunning: false };
          }
          return timer;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/20 text-primary rounded-lg">
          <Timer size={28} />
        </div>
        <h3 className="text-2xl font-bold">Smart Timers</h3>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nombre (ej. Sellado)"
          value={newTimerName}
          onChange={(e) => setNewTimerName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary font-medium"
        />
        <input
          type="number"
          min="1"
          value={newTimerMinutes}
          onChange={(e) => setNewTimerMinutes(parseInt(e.target.value) || 0)}
          onKeyDown={handleKeyDown}
          className="w-20 bg-background border border-border rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-primary font-medium text-center"
        />
        <span className="flex items-center text-sm text-muted-foreground font-medium px-1">min</span>
        <button
          onClick={addTimer}
          className="bg-primary text-primary-foreground px-4 rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="space-y-4">
        {timers.length === 0 ? (
          <p className="text-muted-foreground text-center py-6 text-sm">
            Escribe un nombre, el tiempo en minutos y presiona +
          </p>
        ) : (
          timers.map(timer => {
            // #8: Barra que se VACÍA (comienza llena, se reduce)
            const remaining = (timer.timeLeft / timer.duration) * 100;
            const isFinished = timer.timeLeft === 0;

            return (
              <div
                key={timer.id}
                className={`relative overflow-hidden border rounded-xl p-4 transition-colors ${
                  isFinished ? "bg-destructive/10 border-destructive" : "bg-background border-border"
                }`}
              >
                {/* #8: Progress bar that EMPTIES */}
                {!isFinished && (
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-primary/10 transition-all duration-1000 ease-linear"
                    style={{ width: `${remaining}%` }}
                  />
                )}

                <div className="relative flex justify-between items-center z-10">
                  <div>
                    <h4 className="font-bold text-lg leading-tight">{timer.name}</h4>
                    <div className={`text-3xl font-mono mt-1 tracking-tight ${isFinished ? "text-destructive animate-pulse" : ""}`}>
                      {formatTime(timer.timeLeft)}
                    </div>
                    {isFinished && (
                      <p className="text-destructive text-sm font-bold mt-1">¡Tiempo completado!</p>
                    )}
                  </div>

                  <div className="flex gap-2 items-center">
                    {isFinished ? (
                      <button
                        onClick={() => resetTimer(timer.id)}
                        className="p-3 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-bold px-4"
                      >
                        ↺ Reiniciar
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleTimer(timer.id)}
                        className="p-4 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
                      >
                        {timer.isRunning ? <Pause size={22} /> : <Play size={22} />}
                      </button>
                    )}
                    <button
                      onClick={() => removeTimer(timer.id)}
                      className="p-3 bg-background text-muted-foreground border border-border rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
