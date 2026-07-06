import { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useFormStore } from "../../core/store";
import { StepRenderer } from "./StepRenderer";
import { createStepSchema } from "../../core/validation/schemas";
import type { FormResponse } from "../../core/types";
import { clsx } from "clsx";
import { ChevronLeft, ArrowRight, CheckCircle } from "lucide-react";

export function RunnerPage() {
  const { id } = useParams<{ id: string }>();
  const form = useFormStore((s) => s.forms.find((f) => f.id === id));
  const addResponse = useFormStore((s) => s.addResponse);

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(0);
  const [completed, setCompleted] = useState(false);

  const step = form?.steps[currentStep];

  const handleChange = useCallback(
    (value: unknown) => {
      if (!step) return;
      setAnswers((prev) => ({ ...prev, [step.id]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[step.id];
        return next;
      });
    },
    [step],
  );

  const handleNext = useCallback(() => {
    if (!form || step === undefined) return;
    const schema = createStepSchema(step);
    const value = answers[step.id];
    const result = schema.safeParse(value);

    if (!result.success) {
      setErrors({ [step.id]: result.error.errors[0]?.message || "Invalid value" });
      return;
    }

    if (currentStep < form.steps.length - 1) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    } else {
      const responseAnswers: FormResponse["answers"] = {};
      for (const s of form.steps) {
        const val = answers[s.id];
        if (val !== undefined && val !== "") {
          responseAnswers[s.id] = val as string | string[] | number | boolean;
        }
      }
      addResponse(form.id, responseAnswers);
      setCompleted(true);
    }
  }, [form, step, answers, currentStep, addResponse]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const isLastStep = currentStep === (form?.steps.length ?? 0) - 1;

  if (!form) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Form not found</h2>
          <Link to="/" className="text-[var(--primary)] hover:underline">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="flex-1 flex flex-col items-center px-4 pt-60">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Response Submitted!</h2>
          <p className="text-gray-500 dark:text-stone-400 mb-8">Thank you for completing the form.</p>
          <button
            onClick={() => { setCurrentStep(0); setAnswers({}); setErrors({}); setCompleted(false); }}
            className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:brightness-110 transition-all"
          >
            Submit Another Response
          </button>
          <div className="mt-4">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-600 dark:text-stone-400 dark:hover:text-stone-300 transition-colors">
              Back to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="w-full bg-gray-100 dark:bg-stone-800 h-1.5">
        <motion.div
          className="h-full bg-[var(--primary)]"
          initial={false}
          animate={{ width: `${((currentStep + 1) / form.steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <Link
          to={`/builder/${id}`}
          className="p-2 -ml-2 rounded-lg text-gray-500 hover:text-gray-600 dark:text-stone-400 dark:hover:text-stone-300 hover:bg-gray-100 dark:hover:bg-stone-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-base font-semibold text-gray-900 dark:text-white">{form.title}</h1>
          <p className="text-xs text-gray-500 dark:text-stone-400 mt-0.5">Step {currentStep + 1} of {form.steps.length}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="max-w-lg mx-auto pt-10 pb-16">
          <div className="flex items-center justify-center gap-2 mb-12">
            {form.steps.map((_, i) => (
              <div
                key={i}
                className={clsx(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  i === currentStep
                    ? "bg-[var(--primary)] scale-125"
                    : i < currentStep
                      ? "bg-[var(--primary)]"
                      : "bg-gray-200 dark:bg-stone-700",
                )}
              />
            ))}
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {step && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {step.title || `Step ${currentStep + 1}`}
                    </h2>
                    {step.description && (
                      <p className="text-gray-500 dark:text-stone-400">
                        {step.description}
                      </p>
                    )}
                  </div>

                  <StepRenderer
                    step={step}
                    value={answers[step.id]}
                    error={errors[step.id]}
                    onChange={handleChange}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-12">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium text-gray-500 dark:text-stone-400 hover:text-gray-700 dark:hover:text-stone-200 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:brightness-110 transition-all"
            >
              {isLastStep ? "Submit" : "Next"}
              {!isLastStep && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
