import { describe, it, expect } from "vitest";
import { createStepSchema } from "../core/validation/schemas";
import type { Step } from "../core/types";

describe("createStepSchema", () => {
  it("validates a required text field", () => {
    const step: Step = {
      id: "1", title: "Name", description: "", required: true, type: "text",
    };
    const schema = createStepSchema(step);
    expect(schema.safeParse("").success).toBe(false);
    expect(schema.safeParse("John").success).toBe(true);
  });

  it("validates email format", () => {
    const step: Step = {
      id: "1", title: "Email", description: "", required: true, type: "email",
    };
    const schema = createStepSchema(step);
    expect(schema.safeParse("not-email").success).toBe(false);
    expect(schema.safeParse("test@example.com").success).toBe(true);
  });

  it("validates required number", () => {
    const step: Step = {
      id: "1", title: "Age", description: "", required: true, type: "number", min: 0, max: 150,
    };
    const schema = createStepSchema(step);
    expect(schema.safeParse(-1).success).toBe(false);
    expect(schema.safeParse(25).success).toBe(true);
    expect(schema.safeParse(200).success).toBe(false);
  });

  it("validates yes/no enum", () => {
    const step: Step = {
      id: "1", title: "Confirm", description: "", required: true, type: "yesno",
    };
    const schema = createStepSchema(step);
    expect(schema.safeParse("maybe").success).toBe(false);
    expect(schema.safeParse("yes").success).toBe(true);
    expect(schema.safeParse("no").success).toBe(true);
  });

  it("makes optional fields pass with empty value", () => {
    const step: Step = {
      id: "1", title: "Optional", description: "", required: false, type: "text",
    };
    const schema = createStepSchema(step);
    expect(schema.safeParse(undefined).success).toBe(true);
  });
});
