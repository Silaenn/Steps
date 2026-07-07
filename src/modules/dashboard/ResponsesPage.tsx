import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useFormStore } from "../../core/store";
import { ResponseCharts } from "./ResponseCharts";
import { ResponseTable } from "./ResponseTable";
import { ChevronLeft } from "lucide-react";

export function ResponsesPage() {
  const { id } = useParams<{ id: string }>();
  const form = useFormStore((s) => s.forms.find((f) => f.id === id));
  const allResponses = useFormStore((s) => s.responses);
  const responses = useMemo(() => allResponses.filter((r) => r.formId === id), [allResponses, id]);

  if (!form) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Form not found</h2>
          <Link to="/" className="text-[var(--primary)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 rounded">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col animate-fade-in">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to={'/'}
          className="p-3 -ml-3 rounded-lg text-gray-500 hover:text-gray-600 dark:text-stone-400 dark:hover:text-stone-300 hover:bg-gray-100 dark:hover:bg-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{form.title}</h1>
          <p className="text-base text-gray-500 dark:text-stone-400 mt-1">
            {responses.length} response{responses.length !== 1 && "s"}
          </p>
        </div>
      </div>

      <ResponseCharts form={form} responses={responses} />
      <ResponseTable form={form} responses={responses} />
      </div>
    </div>
  );
}
