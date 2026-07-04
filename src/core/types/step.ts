export type StepType =
  | "info"
  | "text"
  | "email"
  | "number"
  | "textarea"
  | "select"
  | "multiselect"
  | "rating"
  | "date"
  | "phone"
  | "yesno";

export interface BaseStep {
  id: string;
  title: string;
  description: string;
  required: boolean;
}

export interface InfoStep extends BaseStep {
  type: "info";
  imageUrl?: string;
}

export interface TextStep extends BaseStep {
  type: "text";
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
}

export interface EmailStep extends BaseStep {
  type: "email";
  placeholder?: string;
}

export interface NumberStep extends BaseStep {
  type: "number";
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface TextareaStep extends BaseStep {
  type: "textarea";
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  rows?: number;
}

export interface SelectStep extends BaseStep {
  type: "select";
  options: string[];
  multiple: false;
}

export interface MultiSelectStep extends BaseStep {
  type: "multiselect";
  options: string[];
  multiple: true;
  maxSelections?: number;
}

export interface RatingStep extends BaseStep {
  type: "rating";
  maxRating: number;
  labels?: string[];
}

export interface DateStep extends BaseStep {
  type: "date";
  minDate?: string;
  maxDate?: string;
}

export interface PhoneStep extends BaseStep {
  type: "phone";
  placeholder?: string;
}

export interface YesNoStep extends BaseStep {
  type: "yesno";
  yesLabel?: string;
  noLabel?: string;
}

export type Step =
  | InfoStep
  | TextStep
  | EmailStep
  | NumberStep
  | TextareaStep
  | SelectStep
  | MultiSelectStep
  | RatingStep
  | DateStep
  | PhoneStep
  | YesNoStep;
