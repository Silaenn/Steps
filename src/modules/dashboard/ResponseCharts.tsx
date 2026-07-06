import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { Form, FormResponse, Step } from "../../core/types";
import { Star } from "lucide-react";

const COLORS = ["#7c3aed", "#a78bfa", "#c4b5fd", "#8b5cf6", "#6d28d9", "#5b21b6"];

interface ResponseChartsProps {
  form: Form;
  responses: FormResponse[];
}

function isChartsWithMultipleChoices(step: Step): step is Step & { options: string[]; multiple: boolean } {
  return (step.type === "select" || step.type === "multiselect") && "options" in step;
}

function isYesNoStep(step: Step): step is Step & { type: "yesno" } {
  return step.type === "yesno";
}

function isRatingStep(step: Step): step is Step & { type: "rating"; maxRating: number } {
  return step.type === "rating";
}

function SelectChart({ step, responses }: { step: Step; responses: FormResponse[] }) {
  if (!isChartsWithMultipleChoices(step)) return null;
  const counts: Record<string, number> = {};
  for (const opt of step.options) counts[opt] = 0;
  for (const r of responses) {
    const answer = r.answers[step.id];
    if (Array.isArray(answer)) {
      for (const a of answer) {
        if (counts[a] !== undefined) counts[a]!++;
      }
    } else if (typeof answer === "string" && counts[answer] !== undefined) {
      counts[answer]++;
    }
  }
  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));

  return (
    <div className="stepflow-card p-4">
      <h4 className="font-medium text-sm mb-3">{step.title}</h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" fill="#7c3aed" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function YesNoChart({ step, responses }: { step: Step; responses: FormResponse[] }) {
  if (!isYesNoStep(step)) return null;
  let yes = 0;
  let no = 0;
  for (const r of responses) {
    if (r.answers[step.id] === "yes") yes++;
    else if (r.answers[step.id] === "no") no++;
  }
  const data = [
    { name: "Yes", value: yes },
    { name: "No", value: no },
  ];

  return (
    <div className="stepflow-card p-4">
      <h4 className="font-medium text-sm mb-3">{step.title}</h4>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function RatingChart({ step, responses }: { step: Step; responses: FormResponse[] }) {
  if (!isRatingStep(step)) return null;
  const counts: Record<string, number> = {};
  for (let i = 1; i <= step.maxRating; i++) counts[String(i)] = 0;
  for (const r of responses) {
    const v = r.answers[step.id];
    if (typeof v === "number" && counts[String(v)] !== undefined) counts[String(v)]!++;
  }
  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));

  function RatingTick(props: any) {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject x={-14} y={-10} width={28} height={20}>
          <div className="flex items-center justify-center gap-0.5 text-xs text-gray-400">
            <Star size={10} strokeWidth={1.5} />
            <span>{payload.value}</span>
          </div>
        </foreignObject>
      </g>
    );
  }

  return (
    <div className="stepflow-card p-4">
      <h4 className="font-medium text-sm mb-3">{step.title}</h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={<RatingTick />} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" fill="#a78bfa" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ResponseCharts({ form, responses }: ResponseChartsProps) {
  const chartableSteps = form.steps.filter(
    (s) => s.type === "select" || s.type === "multiselect" || s.type === "yesno" || s.type === "rating",
  );

  if (chartableSteps.length === 0 || responses.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Analytics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chartableSteps.map((step) => {
          if (step.type === "yesno") return <YesNoChart key={step.id} step={step} responses={responses} />;
          if (step.type === "rating") return <RatingChart key={step.id} step={step} responses={responses} />;
          if (step.type === "select" || step.type === "multiselect") return <SelectChart key={step.id} step={step} responses={responses} />;
          return null;
        })}
      </div>
    </div>
  );
}
