import type { StepInputProps } from "../types";

export function PhoneStepRenderer({ step, value, error, onChange }: StepInputProps) {
  return (
    <div>
      <input
        className={`stepflow-input text-lg py-3 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
        type="tel"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"placeholder" in step ? step.placeholder : "+1 (555) 000-0000"}
        autoFocus
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
