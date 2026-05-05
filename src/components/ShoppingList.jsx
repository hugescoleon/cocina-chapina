"use client";

import { useState, useEffect, useMemo } from "react";
import { ShoppingCart, Check, Share2, ChevronDown } from "lucide-react";

export default function ShoppingList({ ingredients = [], basePortions = 4, targetPortions = 4, recipeTitle = "" }) {
  const [items, setItems] = useState([]);
  // #7: Group by store toggle
  const [groupByStore, setGroupByStore] = useState(false);
  const [collapsedStores, setCollapsedStores] = useState({});

  useEffect(() => {
    if (!ingredients || ingredients.length === 0) return;
    const scaleFactor = targetPortions / basePortions;
    const newItems = ingredients.map((ing, index) => {
      let scaledQty = ing.qty * scaleFactor;
      if (scaledQty % 1 !== 0) scaledQty = Number(scaledQty.toFixed(2));
      return {
        id: `ing-${index}`,
        name: ing.name,
        qty: scaledQty,
        unit: ing.unit,
        price: ing.price || 0,
        store: ing.store || "Supermercado",
        checked: false,
      };
    });
    setItems(newItems);
  }, [ingredients, basePortions, targetPortions]);

  const toggleCheck = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const toggleStoreCollapse = (store) => {
    setCollapsedStores(prev => ({ ...prev, [store]: !prev[store] }));
  };

  const totalCost = useMemo(() =>
    items.reduce((total, item) => total + item.price * (targetPortions / basePortions), 0),
    [items, targetPortions, basePortions]
  );

  const checkedCount = items.filter(i => i.checked).length;

  // #7: Group items by store
  const itemsByStore = useMemo(() => {
    const groups = {};
    items.forEach(item => {
      if (!groups[item.store]) groups[item.store] = [];
      groups[item.store].push(item);
    });
    return groups;
  }, [items]);

  // #11: Share via WhatsApp
  const handleShare = () => {
    const header = `🍽️ *Lista de compras: ${recipeTitle}*\n_(${targetPortions} porciones)_\n\n`;
    const body = Object.entries(itemsByStore).map(([store, storeItems]) => {
      const lines = storeItems.map(i =>
        `${i.checked ? "✅" : "⬜"} ${i.qty} ${i.unit} de *${i.name}*`
      ).join("\n");
      return `🏪 *${store}*\n${lines}`;
    }).join("\n\n");
    const footer = `\n\n💰 *Costo estimado: Q ${totalCost.toFixed(2)}*`;
    const fullText = header + body + footer;
    const url = `https://wa.me/?text=${encodeURIComponent(fullText)}`;
    window.open(url, "_blank");
  };

  const renderItem = (item) => (
    <div
      key={item.id}
      onClick={() => toggleCheck(item.id)}
      className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer select-none ${
        item.checked
          ? "bg-secondary/20 border-secondary/50 opacity-60"
          : "bg-background border-border hover:border-primary hover:bg-primary/5"
      }`}
    >
      <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all ${
        item.checked ? "bg-primary border-primary text-primary-foreground" : "border-border"
      }`}>
        {item.checked && <Check size={14} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-bold text-base leading-tight ${item.checked ? "line-through text-muted-foreground" : ""}`}>
          {item.name}
        </p>
        {!groupByStore && (
          <span className="text-xs font-medium bg-accent text-accent-foreground px-2 py-0.5 rounded mt-1 inline-block">
            {item.store}
          </span>
        )}
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-bold text-lg">{item.qty}</p>
        <p className="text-xs text-muted-foreground font-medium">{item.unit}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm print-break-inside-avoid">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 text-primary rounded-lg">
            <ShoppingCart size={26} />
          </div>
          <div>
            <h3 className="text-2xl font-bold leading-tight">Checklist de Compras</h3>
            {items.length > 0 && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {checkedCount} de {items.length} insumos listos
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Costo Est.</p>
          <p className="text-2xl font-bold text-primary">Q {totalCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Progress bar - hidden on print */}
      {items.length > 0 && (
        <div className="w-full bg-border rounded-full h-1.5 mb-5 mt-3 print-hidden">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(checkedCount / items.length) * 100}%` }}
          />
        </div>
      )}

      {/* Controls - hidden on print */}
      {items.length > 0 && (
        <div className="flex gap-2 mb-5 print-hidden">
          {/* #7: Group by store toggle */}
          <button
            onClick={() => setGroupByStore(!groupByStore)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${
              groupByStore
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
            }`}
          >
            🏪 Agrupar por tienda
          </button>
          {/* #11: Share via WhatsApp */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 py-2 px-4 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-all"
          >
            <Share2 size={16} /> WhatsApp
          </button>
        </div>
      )}

      {/* Items list */}
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-10">
            Selecciona una receta para ver los insumos.
          </p>
        ) : groupByStore ? (
          // #7: Grouped by store view
          Object.entries(itemsByStore).map(([store, storeItems]) => (
            <div key={store} className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => toggleStoreCollapse(store)}
                className="w-full flex items-center justify-between px-4 py-3 bg-accent/30 hover:bg-accent/60 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏪</span>
                  <span className="font-bold">{store}</span>
                  <span className="text-sm text-muted-foreground">
                    ({storeItems.filter(i => i.checked).length}/{storeItems.length})
                  </span>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground transition-transform ${collapsedStores[store] ? "-rotate-90" : ""}`}
                />
              </button>
              {!collapsedStores[store] && (
                <div className="p-2 space-y-2 bg-background">
                  {storeItems.map(item => renderItem(item))}
                </div>
              )}
            </div>
          ))
        ) : (
          items.map(item => renderItem(item))
        )}
      </div>
    </div>
  );
}
