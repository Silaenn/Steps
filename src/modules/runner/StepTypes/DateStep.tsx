import type { StepInputProps } from "../types";

export function DateStepRenderer({ step, value, error, onChange }: StepInputProps) {
  return (
    <div>
      <input
        className={`stepflow-input text-lg py-3 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
        type="date"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        min={"minDate" in step ? step.minDate : undefined}
        max={"maxDate" in step ? step.maxDate : undefined}
        autoFocus
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
