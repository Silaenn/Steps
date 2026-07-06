import type { Step } from "./step";

export interface FormTheme {
  primaryColor: string;
  fontFamily: string;
  borderRadius: "none" | "md" | "lg" | "xl" | "full";
  backgroundStyle: "solid" | "gradient";
  backgroundValue: string;
}

export const DEFAULT_THEME: FormTheme = {
  primaryColor: "#C75B39",
  fontFamily: "Space Grotesk, Outfit, system-ui, sans-serif",
  borderRadius: "lg",
  backgroundStyle: "solid",
  backgroundValue: "#ffffff",
};

export interface Form {
  id: string;
  title: string;
  description: string;
  steps: Step[];
  theme: FormTheme;
  createdAt: number;
  updatedAt: number;
  responseCount: number;
}
