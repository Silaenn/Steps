import type { Step } from "../../core/types";

interface StepConfigByTypeProps {
  step: Step;
  onChange: (data: Partial<Step>) => void;
}

export function StepConfigByType({ step, onChange }: StepConfigByTypeProps) {
  const set = (data: Partial<Step>) => onChange(data);

  switch (step.type) {
    case "info":
      return (
        <div>
          <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
          <input
            className="stepflow-input"
            value={("imageUrl" in step ? step.imageUrl : "") || ""}
            onChange={(e) => set({ imageUrl: e.target.value } as Partial<Step>)}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      );

    case "text":
    case "textarea":
      return (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Placeholder</label>
            <input
              className="stepflow-input"
              value={("placeholder" in step ? step.placeholder : "") || ""}
              onChange={(e) => set({ placeholder: e.target.value } as Partial<Step>)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Min Length</label>
              <input
                type="number"
                className="stepflow-input"
                value={("minLength" in step ? step.minLength : "") ?? ""}
                onChange={(e) => set({ minLength: e.target.value ? Number(e.target.value) : undefined } as Partial<Step>)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Length</label>
              <input
                type="number"
                className="stepflow-input"
                value={("maxLength" in step ? step.maxLength : "") ?? ""}
                onChange={(e) => set({ maxLength: e.target.value ? Number(e.target.value) : undefined } as Partial<Step>)}
              />
            </div>
          </div>
        </div>
      );

    case "email":
    case "phone":
      return (
        <div>
          <label className="block text-sm font-medium mb-1">Placeholder</label>
          <input
            className="stepflow-input"
            value={("placeholder" in step ? step.placeholder : "") || ""}
            onChange={(e) => set({ placeholder: e.target.value } as Partial<Step>)}
          />
        </div>
      );

    case "number":
      return (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Min</label>
            <input
              type="number"
              className="stepflow-input"
              value={("min" in step ? step.min : "") ?? ""}
              onChange={(e) => set({ min: e.target.value ? Number(e.target.value) : undefined } as Partial<Step>)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max</label>
            <input
              type="number"
              className="stepflow-input"
              value={("max" in step ? step.max : "") ?? ""}
              onChange={(e) => set({ max: e.target.value ? Number(e.target.value) : undefined } as Partial<Step>)}
            />
          </div>
        </div>
      );

    case "select":
    case "multiselect":
      return (
        <div>
          <label className="block text-sm font-medium mb-1">
            Options (one per line)
          </label>
          <textarea
            className="stepflow-input font-mono text-xs"
            rows={5}
            value={("options" in step ? step.options : []).join("\n")}
            onChange={(e) =>
              set({
                options: e.target.value.split("\n").filter((o) => o.trim()),
              } as Partial<Step>)
            }
            placeholder="Option 1&#10;Option 2&#10;Option 3"
          />
        </div>
      );

    case "rating":
      return (
        <div>
          <label className="block text-sm font-medium mb-1">Max Rating</label>
          <input
            type="number"
            min={1}
            max={10}
            className="stepflow-input"
            value={"maxRating" in step ? step.maxRating : 5}
            onChange={(e) =>
              set({ maxRating: Math.max(1, Math.min(10, Number(e.target.value))) } as Partial<Step>)
            }
          />
        </div>
      );

    case "date":
      return (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Min Date</label>
            <input
              type="date"
              className="stepflow-input"
              value={("minDate" in step ? step.minDate : "") || ""}
              onChange={(e) => set({ minDate: e.target.value || undefined } as Partial<Step>)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Date</label>
            <input
              type="date"
              className="stepflow-input"
              value={("maxDate" in step ? step.maxDate : "") || ""}
              onChange={(e) => set({ maxDate: e.target.value || undefined } as Partial<Step>)}
            />
          </div>
        </div>
      );

    case "yesno":
      return (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Yes Label</label>
            <input
              className="stepflow-input"
              value={("yesLabel" in step ? step.yesLabel : "") || ""}
              onChange={(e) => set({ yesLabel: e.target.value || undefined } as Partial<Step>)}
              placeholder="Yes"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">No Label</label>
            <input
              className="stepflow-input"
              value={("noLabel" in step ? step.noLabel : "") || ""}
              onChange={(e) => set({ noLabel: e.target.value || undefined } as Partial<Step>)}
              placeholder="No"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}
