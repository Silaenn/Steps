import { useNavigate } from "react-router-dom";
import { Card } from "../shared/ui/Card";
import { Button } from "../shared/ui/Button";
import type { Form } from "../../core/types";
import { formatDistanceToNow } from "date-fns";
import { Play, Copy, Trash2 } from "lucide-react";

interface FormCardProps {
  form: Form;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function FormCard({ form, onDelete, onDuplicate }: FormCardProps) {
  const navigate = useNavigate();

  return (
    <Card hover className="cursor-pointer" onClick={() => navigate(`/builder/${form.id}`)}>
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

      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => navigate(`/runner/${form.id}`)}
        >
          <Play className="w-4 h-4" />
          Preview
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDuplicate(form.id)}
        >
          <Copy className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(form.id)}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
