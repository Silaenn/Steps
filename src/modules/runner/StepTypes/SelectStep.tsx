import { clsx } from "clsx";
import type { StepInputProps } from "../types";

export function SelectStepRenderer({ step, value, error, onChange }: StepInputProps) {
  const options = "options" in step ? step.options : [];

  return (
    <div>
      <div className="grid gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={clsx(
              "w-full text-left px-4 py-4 rounded-lg border-2 text-base font-medium break-words transition-all focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/0.4]",
              value === opt
                ? "border-[rgb(var(--primary))] bg-[rgb(var(--primary))/0.05] text-gray-900 dark:text-white"
                : "border-gray-200 dark:border-stone-700 text-gray-600 dark:text-stone-400 hover:border-gray-300 dark:hover:border-stone-600",
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
