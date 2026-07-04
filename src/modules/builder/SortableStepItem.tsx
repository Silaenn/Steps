import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";
import type { Step } from "../../core/types";

const TYPE_ICONS: Record<string, string> = {
  info: "ℹ️", text: "📝", email: "📧", number: "🔢",
  textarea: "📄", select: "📋", multiselect: "☑️",
  rating: "⭐", date: "📅", phone: "📞", yesno: "✅",
};

interface SortableStepItemProps {
  step: Step;
  index: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}

export function SortableStepItem({ step, index, isSelected, onSelect, onRemove }: SortableStepItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer border text-sm transition-all",
        isSelected
          ? "bg-[var(--primary)]/10 border-[var(--primary)]/30 text-gray-900 dark:text-white"
          : "bg-white dark:bg-gray-800 border-transparent text-gray-700 dark:text-gray-300 hover:border-gray-200 dark:hover:border-gray-700",
        isDragging && "opacity-50 shadow-lg",
      )}
      onClick={() => onSelect(step.id)}
    >
      <button
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 touch-none"
        {...attributes}
        {...listeners}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </button>

      <span>{TYPE_ICONS[step.type] || "📋"}</span>

      <div className="flex-1 min-w-0">
        <p className="truncate font-medium">{step.title || `Step ${index + 1}`}</p>
        <p className="text-xs text-gray-400 truncate">{step.type}</p>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onRemove(step.id); }}
        className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
