import { z } from "zod";
import type { Step } from "../types";

export function createStepSchema(step: Step) {
  switch (step.type) {
    case "info":
      return z.any();
    case "text":
      if (step.required) {
        let s = z.string().min(1, "This field is required");
        if (step.minLength) s = s.min(step.minLength);
        if (step.maxLength) s = s.max(step.maxLength);
        return s;
      }
      return z.string().optional();
    case "email":
      if (step.required) {
        return z.string().min(1, "This field is required").email("Invalid email");
      }
      return z.string().email("Invalid email").optional().or(z.literal(""));
    case "number": {
      let n = z.number({ required_error: "This field is required" });
      if (step.min !== undefined) n = n.min(step.min);
      if (step.max !== undefined) n = n.max(step.max);
      return step.required ? n : n.optional();
    }
    case "textarea":
      if (step.required) {
        let s = z.string().min(1, "This field is required");
        if (step.minLength) s = s.min(step.minLength);
        if (step.maxLength) s = s.max(step.maxLength);
        return s;
      }
      return z.string().optional();
    case "select":
      return step.required
        ? z.string().min(1, "Please make a selection")
        : z.string().optional();
    case "multiselect":
      return step.required
        ? z.array(z.string()).min(1, "Please select at least one")
        : z.array(z.string()).optional();
    case "rating":
      if (step.required) {
        return z.number({ required_error: "Please provide a rating" }).min(1);
      }
      return z.number().optional();
    case "date":
      if (step.required) {
        return z.string().min(1, "Please select a date");
      }
      return z.string().optional();
    case "phone":
      if (step.required) {
        return z
          .string()
          .min(1, "This field is required")
          .regex(/^[\d\s\-\(\)\+]{7,}$/, "Invalid phone number");
      }
      return z.string().optional();
    case "yesno":
      return step.required
        ? z.enum(["yes", "no"], { required_error: "Please make a selection" })
        : z.enum(["yes", "no"]).optional();
    default:
      return z.string().optional();
  }
}
