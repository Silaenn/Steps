import { clsx } from "clsx";
import type { StepInputProps } from "../types";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export function YesNoStepRenderer({ step, value, error, onChange }: StepInputProps) {
  const yesLabel = "yesLabel" in step && step.yesLabel ? step.yesLabel : "Yes";
  const noLabel = "noLabel" in step && step.noLabel ? step.noLabel : "No";

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <button
          onClick={() => onChange("yes")}
          className={clsx(
            "px-8 py-6 rounded-xl border-2 text-lg font-semibold transition-all",
            value === "yes"
              ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
              : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300",
          )}
        >
          <div className="mb-2 flex justify-center">
            <ThumbsUp className="w-9 h-9" />
          </div>
          {yesLabel}
        </button>
        <button
          onClick={() => onChange("no")}
          className={clsx(
            "px-8 py-6 rounded-xl border-2 text-lg font-semibold transition-all",
            value === "no"
              ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
              : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300",
          )}
        >
          <div className="mb-2 flex justify-center">
            <ThumbsDown className="w-9 h-9" />
          </div>
          {noLabel}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
}
