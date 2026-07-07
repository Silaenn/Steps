import { clsx } from "clsx";
import type { StepInputProps } from "../types";

export function MultiSelectStepRenderer({ step, value, error, onChange }: StepInputProps) {
  const options = "options" in step ? step.options : [];
  const selected = Array.isArray(value) ? value : [];

  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div>
      <div className="grid gap-3">
        {options.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={clsx(
                "w-full text-left px-4 py-4 rounded-lg border-2 text-base font-medium break-words transition-all flex items-center gap-3",
                isSelected
                  ? "border-[var(--primary)] bg-[var(--primary)]/5 text-gray-900 dark:text-white"
                  : "border-gray-200 dark:border-stone-700 text-gray-600 dark:text-stone-400 hover:border-gray-300 dark:hover:border-stone-600",
              )}
            >
              <div
                className={clsx(
                  "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                  isSelected
                    ? "bg-[var(--primary)] border-[var(--primary)]"
                    : "border-gray-300 dark:border-stone-600",
                )}
              >
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              {opt}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
