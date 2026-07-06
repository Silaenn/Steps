import { clsx } from "clsx";
import type { StepInputProps } from "../types";
import { Star } from "lucide-react";

export function RatingStepRenderer({ step, value, error, onChange }: StepInputProps) {
  const maxRating = "maxRating" in step ? step.maxRating : 5;
  const rating = typeof value === "number" ? value : 0;

  return (
    <div>
      <div className="flex items-center justify-center gap-2 py-4">
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className={clsx(
              "w-12 h-12 rounded-lg text-2xl flex items-center justify-center transition-all",
              star <= rating
                ? "bg-yellow-100 dark:bg-yellow-900/30 scale-110"
                : "bg-gray-100 dark:bg-stone-800 text-gray-300 dark:text-stone-600",
            )}
          >
            <Star
              className={clsx(
                "w-6 h-6 transition-all",
                star <= rating
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-300 dark:text-stone-600",
              )}
            /          >
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
}
