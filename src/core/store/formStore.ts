import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import type { Form, FormResponse, Step } from "../types";
import { DEFAULT_THEME } from "../types";

interface FormStore {
  forms: Form[];
  responses: FormResponse[];

  createForm: (title?: string) => string;
  updateForm: (id: string, data: Partial<Form>) => void;
  deleteForm: (id: string) => void;
  duplicateForm: (id: string) => string;

  addStep: (formId: string, step: Step, index?: number) => void;
  updateStep: (formId: string, stepId: string, data: Partial<Step>) => void;
  removeStep: (formId: string, stepId: string) => void;
  reorderSteps: (formId: string, fromIndex: number, toIndex: number) => void;

  addResponse: (formId: string, answers: FormResponse["answers"]) => void;
  deleteResponse: (formId: string, responseId: string) => void;
  getResponses: (formId: string) => FormResponse[];
}

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      forms: [],
      responses: [],

      createForm: (title = "Untitled Form") => {
        const id = nanoid();
        const form: Form = {
          id,
          title,
          description: "",
          steps: [],
          theme: { ...DEFAULT_THEME },
          createdAt: Date.now(),
          updatedAt: Date.now(),
          responseCount: 0,
        };
        set((s) => ({ forms: [...s.forms, form] }));
        return id;
      },

      updateForm: (id, data) =>
        set((s) => ({
          forms: s.forms.map((f) =>
            f.id === id ? { ...f, ...data, updatedAt: Date.now() } : f,
          ),
        })),

      deleteForm: (id) =>
        set((s) => ({
          forms: s.forms.filter((f) => f.id !== id),
          responses: s.responses.filter((r) => r.formId !== id),
        })),

      duplicateForm: (id) => {
        const original = get().forms.find((f) => f.id === id);
        if (!original) return "";
        const newId = nanoid();
        const duplicated: Form = {
          ...original,
          id: newId,
          title: `${original.title} (Copy)`,
          steps: original.steps.map((s) => ({ ...s, id: nanoid() })),
          createdAt: Date.now(),
          updatedAt: Date.now(),
          responseCount: 0,
        };
        set((s) => ({ forms: [...s.forms, duplicated] }));
        return newId;
      },

      addStep: (formId, step, index) =>
        set((s) => ({
          forms: s.forms.map((f) => {
            if (f.id !== formId) return f;
            const steps = [...f.steps];
            if (index !== undefined) {
              steps.splice(index, 0, step);
            } else {
              steps.push(step);
            }
            return { ...f, steps, updatedAt: Date.now() };
          }),
        })),

      updateStep: (formId, stepId, data) =>
        set((s) => ({
          forms: s.forms.map((f) => {
            if (f.id !== formId) return f;
            return {
              ...f,
              steps: f.steps.map((st) =>
                st.id === stepId ? ({ ...st, ...data } as Step) : st,
              ),
              updatedAt: Date.now(),
            };
          }),
        })),

      removeStep: (formId, stepId) =>
        set((s) => ({
          forms: s.forms.map((f) => {
            if (f.id !== formId) return f;
            return {
              ...f,
              steps: f.steps.filter((st) => st.id !== stepId),
              updatedAt: Date.now(),
            };
          }),
        })),

      reorderSteps: (formId, fromIndex, toIndex) =>
        set((s) => ({
          forms: s.forms.map((f) => {
            if (f.id !== formId) return f;
            const steps = [...f.steps];
            const [removed] = steps.splice(fromIndex, 1);
            if (removed) steps.splice(toIndex, 0, removed);
            return { ...f, steps, updatedAt: Date.now() };
          }),
        })),

      addResponse: (formId, answers) =>
        set((s) => ({
          responses: [
            ...s.responses,
            {
              id: nanoid(),
              formId,
              answers,
              completedAt: Date.now(),
            },
          ],
          forms: s.forms.map((f) =>
            f.id === formId
              ? { ...f, responseCount: f.responseCount + 1, updatedAt: Date.now() }
              : f,
          ),
        })),

      deleteResponse: (formId, responseId) =>
        set((s) => ({
          responses: s.responses.filter((r) => r.id !== responseId),
          forms: s.forms.map((f) =>
            f.id === formId
              ? { ...f, responseCount: Math.max(0, f.responseCount - 1) }
              : f,
          ),
        })),

      getResponses: (formId) =>
        get().responses.filter((r) => r.formId === formId),
    }),
    { name: "stepflow-storage" },
  ),
);
