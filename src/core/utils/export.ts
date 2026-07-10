import Papa from "papaparse";
import { saveAs } from "file-saver";
import type { FormResponse } from "../types";

export function exportResponsesToCSV(
  responses: FormResponse[],
  steps: { id: string; title: string }[],
  filename: string,
) {
  const stepMap = new Map(steps.map((s) => [s.id, s.title]));
  const rows = responses.map((r) => {
    const row: Record<string, string> = { "Response ID": r.id, "Completed At": new Date(r.completedAt).toLocaleString() };
    for (const [stepId, answer] of Object.entries(r.answers)) {
      const label = stepMap.get(stepId) ?? stepId;
      row[label] = Array.isArray(answer) ? answer.join(", ") : String(answer);
    }
    return row;
  });

  const csv = Papa.unparse(rows);
  const bom = "\uFEFF";
  const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8" });
  saveAs(blob, `${filename}.csv`);
}

export function exportResponsesToJSON(
  responses: FormResponse[],
  steps: { id: string; title: string }[],
  filename: string,
) {
  const stepMap = new Map(steps.map((s) => [s.id, s.title]));
  const data = {
    metadata: {
      title: filename,
      exportedAt: new Date().toISOString(),
      totalResponses: responses.length,
    },
    responses: responses.map((r) => ({
      id: r.id,
      completedAt: new Date(r.completedAt).toISOString(),
      answers: Object.fromEntries(
        Object.entries(r.answers).map(([stepId, answer]) => [
          stepMap.get(stepId) ?? stepId,
          answer,
        ]),
      ),
    })),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  saveAs(blob, `${filename}.json`);
}
