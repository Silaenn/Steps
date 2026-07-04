import type { StepInputProps } from "../types";

export function EmailStepRenderer({ step, value, error, onChange }: StepInputProps) {
  return (
    <div>
      <input
        className={`stepflow-input text-lg py-3 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
        type="email"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"placeholder" in step ? step.placeholder : "email@example.com"}
        autoFocus
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
