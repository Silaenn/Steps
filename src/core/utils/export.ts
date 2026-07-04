import Papa from "papaparse";
import { saveAs } from "file-saver";
import type { FormResponse } from "../types";

export function exportResponsesToCSV(
  responses: FormResponse[],
  stepTitles: string[],
  filename: string,
) {
  const rows = responses.map((r) => {
    const row: Record<string, string> = { "Response ID": r.id, "Completed At": new Date(r.completedAt).toISOString() };
    for (const [stepId, answer] of Object.entries(r.answers)) {
      const label = stepTitles[Number(stepId)] || stepId;
      row[label] = Array.isArray(answer) ? answer.join(", ") : String(answer);
    }
    return row;
  });

  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  saveAs(blob, `${filename}.csv`);
}

export function exportResponsesToJSON(
  responses: FormResponse[],
  filename: string,
) {
  const blob = new Blob([JSON.stringify(responses, null, 2)], {
    type: "application/json",
  });
  saveAs(blob, `${filename}.json`);
}
