import type { StepInputProps } from "../types";

export function TextareaStepRenderer({ step, value, error, onChange }: StepInputProps) {
  return (
    <div>
      <textarea
        className={`stepflow-input text-lg py-3 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
        rows={"rows" in step && step.rows ? step.rows : 4}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"placeholder" in step ? step.placeholder : "Enter your answer..."}
        autoFocus
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {"maxLength" in step && step.maxLength && (
        <p className="mt-1 text-xs text-gray-500 dark:text-stone-400">
          {String(value || "").length}/{step.maxLength}
        </p>
      )}
    </div>
  );
}
