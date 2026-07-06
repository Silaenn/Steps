import { useCallback, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Step, StepType } from "../../core/types";
import { SortableStepItem } from "./SortableStepItem";
import { Info, FileText, Mail, Hash, File, List, CheckSquare, Star, Calendar, Phone, CheckCircle } from "lucide-react";

interface StepListProps {
  steps: Step[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onAdd: (type: StepType, index?: number) => void;
  onRemove: (id: string) => void;
}

const STEP_TYPES: { type: StepType; label: string; icon: React.ReactNode }[] = [
  { type: "info", label: "Info", icon: <Info size={16} /> },
  { type: "text", label: "Text", icon: <FileText size={16} /> },
  { type: "email", label: "Email", icon: <Mail size={16} /> },
  { type: "number", label: "Number", icon: <Hash size={16} /> },
  { type: "textarea", label: "Textarea", icon: <File size={16} /> },
  { type: "select", label: "Select", icon: <List size={16} /> },
  { type: "multiselect", label: "Multi Select", icon: <CheckSquare size={16} /> },
  { type: "rating", label: "Rating", icon: <Star size={16} /> },
  { type: "date", label: "Date", icon: <Calendar size={16} /> },
  { type: "phone", label: "Phone", icon: <Phone size={16} /> },
  { type: "yesno", label: "Yes/No", icon: <CheckCircle size={16} /> },
];

export function StepList({ steps, selectedId, onSelect, onReorder, onAdd, onRemove }: StepListProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = steps.findIndex((s) => s.id === active.id);
        const newIndex = steps.findIndex((s) => s.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) onReorder(oldIndex, newIndex);
      }
    },
    [steps, onReorder],
  );

  return (
    <div className="w-72 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-col">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Steps</h3>
        <div className="relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:brightness-110 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Step
          </button>
          {showAddMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowAddMenu(false)} />
              <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 max-h-64 overflow-y-auto">
                {STEP_TYPES.map(({ type, label, icon }) => (
                  <button
                    key={type}
                    onClick={() => { onAdd(type); setShowAddMenu(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 shrink-0">
                      {icon}
                    </span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {steps.length === 0 && (
          <div className="text-center py-8 text-sm text-gray-400">
            No steps yet. Click "Add Step" to begin.
          </div>
        )}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={steps.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <SortableStepItem
                  key={step.id}
                  step={step}
                  index={index}
                  isSelected={step.id === selectedId}
                  onSelect={onSelect}
                  onRemove={onRemove}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
