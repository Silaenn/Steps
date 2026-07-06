import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useFormStore } from "../../core/store";
import type { Step, StepType } from "../../core/types";
import { Button } from "../shared/ui/Button";
import { StepList } from "./StepList";
import { StepConfigByType } from "./StepConfigByType";
import { ChevronLeft, Play } from "lucide-react";

function createDefaultStep(type: StepType): Step {
  const base = {
    id: nanoid(),
    title: "",
    description: "",
    required: false,
  };

  switch (type) {
    case "info": return { ...base, type: "info" };
    case "text": return { ...base, type: "text", placeholder: "Enter your answer..." };
    case "email": return { ...base, type: "email", placeholder: "email@example.com" };
    case "number": return { ...base, type: "number", placeholder: "0" };
    case "textarea": return { ...base, type: "textarea", placeholder: "Enter your answer...", rows: 4 };
    case "select": return { ...base, type: "select", options: ["Option 1", "Option 2", "Option 3"], multiple: false };
    case "multiselect": return { ...base, type: "multiselect", options: ["Option 1", "Option 2", "Option 3"], multiple: true };
    case "rating": return { ...base, type: "rating", maxRating: 5 };
    case "date": return { ...base, type: "date" };
    case "phone": return { ...base, type: "phone", placeholder: "+1 (555) 000-0000" };
    case "yesno": return { ...base, type: "yesno" };
  }
}

export function BuilderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const form = useFormStore((s) => s.forms.find((f) => f.id === id));
  const updateForm = useFormStore((s) => s.updateForm);
  const createForm = useFormStore((s) => s.createForm);
  const addStep = useFormStore((s) => s.addStep);
  const updateStep = useFormStore((s) => s.updateStep);
  const removeStep = useFormStore((s) => s.removeStep);
  const reorderSteps = useFormStore((s) => s.reorderSteps);

  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const created = useRef(false);

  useEffect(() => {
    if (id === "new" && !created.current) {
      created.current = true;
      const newId = createForm();
      navigate(`/builder/${newId}`, { replace: true });
    }
  }, [id, createForm, navigate]);

  if (!form) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Form not found</h2>
          <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const selectedStep = form.steps.find((s) => s.id === selectedStepId) || null;

  const handleAddStep = (type: StepType) => {
    const step = createDefaultStep(type);
    addStep(form.id, step);
    setSelectedStepId(step.id);
  };

  const handleRemoveStep = (stepId: string) => {
    removeStep(form.id, stepId);
    if (selectedStepId === stepId) setSelectedStepId(null);
  };

  const handleUpdateStep = (data: Partial<Step>) => {
    if (selectedStep) updateStep(form.id, selectedStep.id, data);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <StepList
        steps={form.steps}
        selectedId={selectedStepId}
        onSelect={setSelectedStepId}
        onReorder={(from, to) => reorderSteps(form.id, from, to)}
        onAdd={handleAddStep}
        onRemove={handleRemoveStep}
      />

        <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-950">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <input
              className="text-lg font-bold bg-transparent border-none outline-none focus:ring-0 text-gray-900 dark:text-white"
              value={form.title}
              onChange={(e) => updateForm(form.id, { title: e.target.value })}
              placeholder="Form Title"
            />
          </div>
          <Button variant="primary" onClick={() => navigate(`/runner/${form.id}`)}>
            <Play className="w-4 h-4" />
            Run Form
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!selectedStep ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm">Select a step from the sidebar to edit, or add a new step.</p>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto pt-10 animate-fade-in">
              <div className="stepflow-card p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold">
                    {form.steps.indexOf(selectedStep) + 1}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedStep.type}
                    </h2>
                    <p className="text-xs text-gray-500 capitalize">{selectedStep.type} step</p>
                  </div>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    className="stepflow-input"
                    value={selectedStep.title}
                    onChange={(e) => handleUpdateStep({ title: e.target.value })}
                    placeholder="Step title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    className="stepflow-input"
                    rows={3}
                    value={selectedStep.description}
                    onChange={(e) => handleUpdateStep({ description: e.target.value })}
                    placeholder="Step description (optional)"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="required"
                    checked={selectedStep.required}
                    onChange={(e) => handleUpdateStep({ required: e.target.checked })}
                    className="rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary])"
                  />
                  <label htmlFor="required" className="text-sm font-medium">
                    Required field
                  </label>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                    {selectedStep.type} settings
                  </h3>
                  <StepConfigByType step={selectedStep} onChange={handleUpdateStep} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
