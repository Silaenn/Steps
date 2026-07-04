import type { Step } from "../../core/types";
import { InfoStepRenderer } from "./StepTypes/InfoStep";
import { TextStepRenderer } from "./StepTypes/TextStep";
import { EmailStepRenderer } from "./StepTypes/EmailStep";
import { NumberStepRenderer } from "./StepTypes/NumberStep";
import { TextareaStepRenderer } from "./StepTypes/TextareaStep";
import { SelectStepRenderer } from "./StepTypes/SelectStep";
import { MultiSelectStepRenderer } from "./StepTypes/MultiSelectStep";
import { RatingStepRenderer } from "./StepTypes/RatingStep";
import { DateStepRenderer } from "./StepTypes/DateStep";
import { PhoneStepRenderer } from "./StepTypes/PhoneStep";
import { YesNoStepRenderer } from "./StepTypes/YesNoStep";

interface StepRendererProps {
  step: Step;
  value: unknown;
  error?: string;
  onChange: (value: unknown) => void;
}

export function StepRenderer({ step, value, error, onChange }: StepRendererProps) {
  switch (step.type) {
    case "info": return <InfoStepRenderer step={step} value={value} error={error} onChange={onChange} />;
    case "text": return <TextStepRenderer step={step} value={value} error={error} onChange={onChange} />;
    case "email": return <EmailStepRenderer step={step} value={value} error={error} onChange={onChange} />;
    case "number": return <NumberStepRenderer step={step} value={value} error={error} onChange={onChange} />;
    case "textarea": return <TextareaStepRenderer step={step} value={value} error={error} onChange={onChange} />;
    case "select": return <SelectStepRenderer step={step} value={value} error={error} onChange={onChange} />;
    case "multiselect": return <MultiSelectStepRenderer step={step} value={value} error={error} onChange={onChange} />;
    case "rating": return <RatingStepRenderer step={step} value={value} error={error} onChange={onChange} />;
    case "date": return <DateStepRenderer step={step} value={value} error={error} onChange={onChange} />;
    case "phone": return <PhoneStepRenderer step={step} value={value} error={error} onChange={onChange} />;
    case "yesno": return <YesNoStepRenderer step={step} value={value} error={error} onChange={onChange} />;
    default: return <div>Unknown step type</div>;
  }
}


