import { useNavigate } from "react-router-dom";
import { Card } from "../shared/ui/Card";
import { Button } from "../shared/ui/Button";
import type { Form } from "../../core/types";
import { formatDistanceToNow } from "date-fns";

interface FormCardProps {
  form: Form;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function FormCard({ form, onDelete, onDuplicate }: FormCardProps) {
  const navigate = useNavigate();

  return (
    <Card hover className="group cursor-pointer" onClick={() => navigate(`/builder/${form.id}`)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {form.title}
          </h3>
          {form.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
              {form.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
        <span>{form.steps.length} steps</span>
        <span>·</span>
        <span>{form.responseCount} responses</span>
        <span>·</span>
        <span>{formatDistanceToNow(form.updatedAt, { addSuffix: true })}</span>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => navigate(`/runner/${form.id}`)}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Preview
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDuplicate(form.id)}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(form.id)}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </Button>
      </div>
    </Card>
  );
}
