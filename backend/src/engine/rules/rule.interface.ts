import { PayrollRun } from "../../modules/payroll/payroll.repo";

export interface Anomaly {
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  explanation: string;
  previous_value?: number;
  current_value?: number;
}

export interface DetectionContext {
  current: PayrollRun;
  previous: PayrollRun | null;
}

export interface AnomalyRule {
  type: string;
  apply(context: DetectionContext): Anomaly | null;
}
