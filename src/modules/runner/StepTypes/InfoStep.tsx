import type { StepInputProps } from "../types";

export function InfoStepRenderer({ step }: StepInputProps) {
  return (
    <div className="text-center py-8">
      {"imageUrl" in step && step.imageUrl && (
        <img
          src={step.imageUrl}
          alt=""
          className="w-48 h-48 object-cover rounded-lg mx-auto mb-6"
        />
      )}
      {step.description && (
        <p className="text-base text-gray-600 dark:text-stone-400 max-w-md mx-auto">
          {step.description}
        </p>
      )}
    </div>
  );
}
