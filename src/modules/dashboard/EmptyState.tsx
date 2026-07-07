import { Button } from "../shared/ui";

interface EmptyStateProps {
  onCreateForm: () => void;
}

export function EmptyState({ onCreateForm }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 animate-fade-in animate-slide-up">
      <div className="w-20 h-20 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        No forms yet
      </h3>
      <p className="text-gray-500 dark:text-stone-400 text-center max-w-sm mb-8">
        Create your first multi-step form to start collecting responses.
      </p>
      <Button onClick={onCreateForm} size="lg">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Create Form
      </Button>
    </div>
  );
}
