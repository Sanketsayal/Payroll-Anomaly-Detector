export interface AnomalyRecord {
  id?: number;
  employee_id: number;
  payroll_month: string;
  type: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  explanation: string;
  previous_value?: number;
  current_value?: number;
  created_at?: string;
}
