"use client";

import { useState, useEffect } from "react";
import { Scale, Calculator, ArrowRight } from "lucide-react";

export default function Toolbox({ basePortions = 4, onScaleChange }) {
  const [activeTab, setActiveTab] = useState("scaler");

  // Scaler State
  const [targetPortions, setTargetPortions] = useState(basePortions);

  // #2 FIX: Sync targetPortions when basePortions changes (new recipe loaded)
  useEffect(() => {
    setTargetPortions(basePortions);
    if (onScaleChange) onScaleChange(basePortions);
  }, [basePortions]);

  // Converter State
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("lb");
  const [toUnit, setToUnit] = useState("g");
  const [convertedValue, setConvertedValue] = useState(null);

  const handleScale = (val) => {
    setTargetPortions(val);
    if (onScaleChange) onScaleChange(val);
  };

  // Conversion rates matrix
  const rates = {
    lb: { g: 453.592, oz: 16, kg: 0.453592 },
    oz: { g: 28.3495, lb: 0.0625, kg: 0.0283495 },
    g: { lb: 0.00220462, oz: 0.035274, kg: 0.001 },
    kg: { lb: 2.20462, oz: 35.274, g: 1000 },
    taza: { ml: 240, l: 0.24 },
    ml: { taza: 0.00416667, l: 0.001 },
    l: { ml: 1000, taza: 4.16667 },
  };

  // #4 FIX: Convertir en tiempo real con useEffect
  useEffect(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val === 0) {
      setConvertedValue(null);
      return;
    }
    if (fromUnit === toUnit) {
      setConvertedValue(val);
      return;
    }
    if (rates[fromUnit]?.[toUnit] !== undefined) {
      setConvertedValue(val * rates[fromUnit][toUnit]);
    } else {
      setConvertedValue(null);
    }
  }, [inputValue, fromUnit, toUnit]);

  const unitGroups = [
    { label: "Peso", units: ["lb", "oz", "g", "kg"] },
    { label: "Volumen", units: ["taza", "ml", "l"] },
  ];

  return (
    <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">
      <div className="flex gap-2 mb-6 bg-background p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("scaler")}
          className={`flex-1 py-3 px-4 rounded-md font-bold transition-colors flex items-center justify-center gap-2 ${
            activeTab === "scaler" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary"
          }`}
        >
          <Scale size={20} /> Escalador
        </button>
        <button
          onClick={() => setActiveTab("converter")}
          className={`flex-1 py-3 px-4 rounded-md font-bold transition-colors flex items-center justify-center gap-2 ${
            activeTab === "converter" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary"
          }`}
        >
          <Calculator size={20} /> Conversor
        </button>
      </div>

      {activeTab === "scaler" ? (
        <div className="space-y-6">
          <p className="text-muted-foreground text-sm">
            Ajusta las porciones. Los ingredientes y costos se recalcularán automáticamente.
          </p>

          <div className="flex items-center justify-between bg-background border border-border p-4 rounded-xl">
            <span className="font-bold text-lg">Porciones:</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleScale(Math.max(1, targetPortions - 1))}
                className="w-12 h-12 bg-secondary rounded-full font-bold text-2xl flex items-center justify-center hover:bg-secondary/80 active:scale-90 transition-all"
              >
                −
              </button>
              <span className="text-4xl font-bold w-14 text-center">{targetPortions}</span>
              <button
                onClick={() => handleScale(targetPortions + 1)}
                className="w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-2xl flex items-center justify-center hover:bg-primary/90 active:scale-90 transition-all"
              >
                +
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[2, 10, 50, 100].map(num => (
              <button
                key={num}
                onClick={() => handleScale(num)}
                className={`py-3 font-bold rounded-xl transition-all active:scale-95 ${
                  targetPortions === num
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                ×{num}
              </button>
            ))}
          </div>
        </div>
      ) : (
        // #4: Conversor en tiempo real
        <div className="space-y-5">
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">De</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="0"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary font-bold text-xl"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-24 bg-background border border-border rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-primary font-bold"
                >
                  {unitGroups.map(group => (
                    <optgroup key={group.label} label={group.label}>
                      {group.units.map(u => <option key={u} value={u}>{u}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-5">
              <ArrowRight size={24} className="text-primary" />
            </div>

            <div className="flex-1">
              <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">A</label>
              <div className="flex gap-2">
                <div className="flex-1 bg-accent/40 border border-primary/30 rounded-lg px-4 py-3 font-bold text-xl flex items-center text-primary min-h-[52px]">
                  {convertedValue !== null
                    ? Number(convertedValue).toFixed(4).replace(/\.?0+$/, "")
                    : <span className="text-muted-foreground text-base">Resultado</span>}
                </div>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-24 bg-background border border-border rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-primary font-bold"
                >
                  {unitGroups.map(group => (
                    <optgroup key={group.label} label={group.label}>
                      {group.units.map(u => <option key={u} value={u}>{u}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {convertedValue === null && inputValue !== "" && (
            <p className="text-destructive text-sm font-medium text-center">
              Conversión no soportada entre estas unidades (peso ↔ volumen no aplica directamente).
            </p>
          )}
        </div>
      )}
    </div>
  );
}
