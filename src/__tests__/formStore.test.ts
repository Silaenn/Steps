import { describe, it, expect, beforeEach } from "vitest";
import { useFormStore } from "../core/store";

describe("formStore", () => {
  beforeEach(() => {
    useFormStore.setState({ forms: [], responses: [] });
  });

  it("creates a form and returns its id", () => {
    const id = useFormStore.getState().createForm("Test Form");
    const form = useFormStore.getState().forms[0];
    expect(form?.id).toBe(id);
    expect(form?.title).toBe("Test Form");
  });

  it("deletes a form and its responses", () => {
    const id = useFormStore.getState().createForm();
    useFormStore.getState().addResponse(id, { q1: "answer" });
    useFormStore.getState().deleteForm(id);
    expect(useFormStore.getState().forms).toHaveLength(0);
    expect(useFormStore.getState().responses).toHaveLength(0);
  });

  it("adds a step to a form", () => {
    const formId = useFormStore.getState().createForm();
    useFormStore.getState().addStep(formId, {
      id: "step1",
      title: "Test",
      description: "",
      required: false,
      type: "info",
    });
    const form = useFormStore.getState().forms[0];
    expect(form?.steps).toHaveLength(1);
    expect(form?.steps[0]?.title).toBe("Test");
  });

  it("removes a step from a form", () => {
    const formId = useFormStore.getState().createForm();
    useFormStore.getState().addStep(formId, {
      id: "step1",
      title: "Test",
      description: "",
      required: false,
      type: "info",
    });
    useFormStore.getState().removeStep(formId, "step1");
    expect(useFormStore.getState().forms[0]?.steps).toHaveLength(0);
  });

  it("adds a response and increments count", () => {
    const formId = useFormStore.getState().createForm();
    useFormStore.getState().addResponse(formId, { q1: "hello" });
    expect(useFormStore.getState().responses).toHaveLength(1);
    expect(useFormStore.getState().forms[0]?.responseCount).toBe(1);
  });

  it("gets responses for a specific form", () => {
    const f1 = useFormStore.getState().createForm();
    const f2 = useFormStore.getState().createForm();
    useFormStore.getState().addResponse(f1, { q: "a" });
    useFormStore.getState().addResponse(f1, { q: "b" });
    useFormStore.getState().addResponse(f2, { q: "c" });
    const responses = useFormStore.getState().getResponses(f1);
    expect(responses).toHaveLength(2);
  });
});
