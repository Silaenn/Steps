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
import { motion, AnimatePresence } from "framer-motion";
import { Info, FileText, Mail, Hash, File, List, CheckSquare, Star, Calendar, Phone, CheckCircle, Layers } from "lucide-react";

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
    <div className="w-72 border-r border-gray-200 dark:border-stone-800 bg-gray-50 dark:bg-stone-900/50 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-3">
        {steps.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-sm text-gray-500 dark:text-stone-400 text-center px-2">
            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-stone-800 flex items-center justify-center mb-2">
              <Layers className="w-5 h-5" />
            </div>
            <p>No steps yet</p>
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

      <div className="relative p-3">
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border-2 border-dashed border-gray-300 dark:border-stone-600 text-sm text-gray-500 dark:text-stone-400 hover:border-gray-400 dark:hover:border-stone-500 hover:text-gray-700 dark:hover:text-stone-200 transition-all focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/0.4]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Step
        </button>
        {showAddMenu && (
          <>
            <div className="fixed inset-0 z-10 cursor-pointer" onClick={() => setShowAddMenu(false)} />
          </>
        )}
        <AnimatePresence>
          {showAddMenu && (
            <motion.div
              key="step-types-menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
              className="absolute bottom-full left-0 right-0 mb-1 z-20 bg-white dark:bg-stone-800 rounded-lg border border-gray-200 dark:border-stone-700 p-2 max-h-64 overflow-y-auto"
            >
              {STEP_TYPES.map(({ type, label, icon }) => (
                <button
                  key={type}
                  onClick={() => { onAdd(type); setShowAddMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-stone-700 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))/0.4]"
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 shrink-0">
                    {icon}
                  </span>
                  <span>{label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
