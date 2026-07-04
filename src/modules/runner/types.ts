import type { Step } from "../../core/types";

export interface StepInputProps {
  step: Step;
  value: unknown;
  error?: string;
  onChange: (value: unknown) => void;
}
