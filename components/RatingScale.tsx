"use client";

import type { RatingValue } from "@/lib/types";

type RatingScaleProps = {
  legend: string;
  value: RatingValue | null;
  onChange: (value: RatingValue | null) => void;
};

export function RatingScale({ legend, value, onChange }: RatingScaleProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-ink">{legend}</legend>
      <div className="flex gap-2">
        {([1, 2, 3, 4, 5] as const).map((score) => {
          const selected = value === score;
          return (
            <button
              key={score}
              type="button"
              aria-pressed={selected}
              aria-label={`${legend}: ${score} su 5`}
              onClick={() => onChange(selected ? null : score)}
              className={`flex h-11 w-11 items-center justify-center rounded-2xl border text-sm font-medium transition sm:h-12 sm:w-12 ${
                selected
                  ? "border-brand bg-brand text-white"
                  : "border-ink/12 bg-white text-ink/70 hover:border-brand/40"
              }`}
            >
              {score}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
