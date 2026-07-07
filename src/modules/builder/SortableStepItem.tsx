import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { clsx } from "clsx";
import type { Step } from "../../core/types";
import { Info, FileText, Mail, Hash, File, List, CheckSquare, Star, Calendar, Phone, CheckCircle } from "lucide-react";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  info: <Info size={16} />,
  text: <FileText size={16} />,
  email: <Mail size={16} />,
  number: <Hash size={16} />,
  textarea: <File size={16} />,
  select: <List size={16} />,
  multiselect: <CheckSquare size={16} />,
  rating: <Star size={16} />,
  date: <Calendar size={16} />,
  phone: <Phone size={16} />,
  yesno: <CheckCircle size={16} />,
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
          : "bg-white dark:bg-stone-800 border-transparent text-gray-700 dark:text-stone-300 hover:border-gray-200 dark:hover:border-stone-700",
        isDragging && "opacity-50",
      )}
      onClick={() => onSelect(step.id)}
    >
      <button
        className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-600 dark:text-stone-400 dark:hover:text-stone-300 touch-none p-2.5"
        {...attributes}
        {...listeners}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </button>

      <span className="inline-flex items-center justify-center w-5 h-5 shrink-0">
        {TYPE_ICONS[step.type] ?? <List size={16} />}
      </span>

      <div className="flex-1 min-w-0">
        <p className="truncate font-medium">{step.title || `Step ${index + 1}`}</p>
        <p className="text-xs text-gray-500 dark:text-stone-400 truncate">{step.type}</p>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onRemove(step.id); }}
        className="p-2.5 text-gray-500 dark:text-stone-500 hover:text-red-500 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
