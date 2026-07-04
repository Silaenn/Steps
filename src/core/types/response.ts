export interface FormResponse {
  id: string;
  formId: string;
  answers: Record<string, string | string[] | number | boolean>;
  completedAt: number;
}
