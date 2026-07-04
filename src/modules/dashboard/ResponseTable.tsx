import type { FormResponse, Form } from "../../core/types";
import { Button } from "../shared/ui/Button";
import { exportResponsesToCSV, exportResponsesToJSON } from "../../core/utils/export";

interface ResponseTableProps {
  form: Form;
  responses: FormResponse[];
}

export function ResponseTable({ form, responses }: ResponseTableProps) {
  if (responses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg font-medium mb-1">No responses yet</p>
        <p className="text-sm">Share your form to start collecting responses.</p>
      </div>
    );
  }

  const stepTitles = form.steps.map((s, i) => s.title || `Step ${i + 1}`);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {responses.length} response{responses.length !== 1 && "s"}
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => exportResponsesToCSV(responses, stepTitles, form.title)}
          >
            Export CSV
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => exportResponsesToJSON(responses, form.title)}
          >
            Export JSON
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900">
              <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-gray-400">#</th>
              {form.steps.map((step, i) => (
                <th key={step.id} className="text-left px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                  {step.title || `Step ${i + 1}`}
                </th>
              ))}
              <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response, idx) => (
              <tr key={response.id} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                {form.steps.map((step) => {
                  const answer = response.answers[step.id];
                  return (
                    <td key={step.id} className="px-4 py-3 text-gray-900 dark:text-gray-100">
                      {answer === undefined || answer === ""
                        ? <span className="text-gray-400 italic">-</span>
                        : Array.isArray(answer)
                          ? answer.join(", ")
                          : String(answer)}
                    </td>
                  );
                })}
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(response.completedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
