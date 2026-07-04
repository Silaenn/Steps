import type { StepInputProps } from "../types";

export function NumberStepRenderer({ step, value, error, onChange }: StepInputProps) {
  return (
    <div>
      <input
        className={`stepflow-input text-lg py-3 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
        type="number"
        value={typeof value === "number" ? value : ""}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)}
        placeholder={"placeholder" in step ? step.placeholder : "0"}
        autoFocus
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
