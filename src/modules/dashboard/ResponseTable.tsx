import { useState } from "react";
import type { FormResponse, Form } from "../../core/types";
import { useFormStore } from "../../core/store";
import { Button } from "../shared/ui/Button";
import { ConfirmModal } from "../shared/ui/ConfirmModal";
import { exportResponsesToCSV, exportResponsesToJSON } from "../../core/utils/export";
import { Trash2 } from "lucide-react";

interface ResponseTableProps {
  form: Form;
  responses: FormResponse[];
}

export function ResponseTable({ form, responses }: ResponseTableProps) {
  const [confirmResponseId, setConfirmResponseId] = useState<string | null>(null);

  if (responses.length === 0) {
    return (
      <div className="flex-1 text-center text-gray-500 dark:text-stone-400 pt-36">
        <p className="text-lg font-medium mb-1">No responses yet</p>
        <p className="text-sm">Share your form to start collecting responses.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-stone-400">
          {responses.length} response{responses.length !== 1 && "s"}
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => exportResponsesToCSV(responses, form.steps, form.title)}
          >
            Export CSV
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => exportResponsesToJSON(responses, form.steps, form.title)}
          >
            Export JSON
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-stone-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-stone-900">
              <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-stone-400">#</th>
              {form.steps.map((step, i) => (
                <th key={step.id} className="text-left px-4 py-3 font-medium text-gray-500 dark:text-stone-400">
                  {step.title || `Step ${i + 1}`}
                </th>
              ))}
              <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-stone-400">Date</th>
              <th className="w-16 px-4 py-3 font-medium text-gray-500 dark:text-stone-400"></th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response, idx) => (
              <tr key={response.id} className="border-t border-gray-100 dark:border-stone-800 hover:bg-gray-50 dark:hover:bg-stone-900/50">
                <td className="px-4 py-3 text-gray-500 dark:text-stone-400">{idx + 1}</td>
                {form.steps.map((step) => {
                  const answer = response.answers[step.id];
                  return (
                    <td key={step.id} className="px-4 py-3 text-gray-900 dark:text-stone-100">
                      {answer === undefined || answer === ""
                        ? <span className="text-gray-500 dark:text-stone-400 italic">-</span>
                        : Array.isArray(answer)
                          ? answer.join(", ")
                          : String(answer)}
                    </td>
                  );
                })}
                <td className="px-4 py-3 text-gray-500 dark:text-stone-400 text-xs">
                  {new Date(response.completedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setConfirmResponseId(response.id)}
                    className="p-3 rounded-lg text-gray-500 hover:text-red-500 dark:text-stone-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/40"
                    title="Delete response"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={confirmResponseId !== null}
        onClose={() => setConfirmResponseId(null)}
        onConfirm={() => {
          if (confirmResponseId) {
            useFormStore.getState().deleteResponse(form.id, confirmResponseId);
          }
        }}
        title="Delete Response"
        message="Are you sure you want to delete this response?"
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}
