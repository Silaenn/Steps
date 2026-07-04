import { useNavigate } from "react-router-dom";
import { useFormStore } from "../../core/store";
import { Button } from "../shared/ui/Button";
import { FormCard } from "./FormCard";
import { EmptyState } from "./EmptyState";

export function DashboardPage() {
  const navigate = useNavigate();
  const forms = useFormStore((s) => s.forms);
  const createForm = useFormStore((s) => s.createForm);
  const deleteForm = useFormStore((s) => s.deleteForm);
  const duplicateForm = useFormStore((s) => s.duplicateForm);

  const handleCreate = () => {
    const id = createForm();
    navigate(`/builder/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this form and all its responses?")) {
      deleteForm(id);
    }
  };

  if (forms.length === 0) {
    return <EmptyState onCreateForm={handleCreate} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Forms</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {forms.length} form{forms.length !== 1 && "s"} total
          </p>
        </div>
        <Button onClick={handleCreate} size="lg">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Form
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {forms.map((form) => (
          <FormCard
            key={form.id}
            form={form}
            onDelete={handleDelete}
            onDuplicate={duplicateForm}
          />
        ))}
      </div>
    </div>
  );
}
