"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";

export default function StarRating({ value = 0, onChange, readonly = false, size = "md" }) {
  const [hovered, setHovered] = useState(0);

  const sizes = { sm: 14, md: 20, lg: 28 };
  const iconSize = sizes[size] || 20;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = (hovered || value) >= star;
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(0)}
            className={clsx(
              "transition-all duration-150",
              readonly ? "cursor-default" : "cursor-pointer hover:scale-110 active:scale-90"
            )}
            aria-label={`${star} estrellas`}
          >
            <Star
              size={iconSize}
              className={clsx(
                "transition-colors",
                active ? "fill-amber-400 text-amber-400" : "text-border fill-none"
              )}
            />
          </button>
        );
      })}
      {value > 0 && (
        <span className="ml-1 text-xs font-bold text-muted-foreground">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
