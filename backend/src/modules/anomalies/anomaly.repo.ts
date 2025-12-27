import { query } from "../../db";
import { AnomalyRecord } from "./anomaly.model";

export const saveAnomaly = async (
  anomaly: AnomalyRecord
): Promise<void> => {
  const sql = `
    INSERT INTO anomalies (
      emp_code,
      payroll_month,
      type,
      severity,
      explanation,
      previous_value,
      current_value
    ) VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

  await query(sql, [
    anomaly.employee_id,
    anomaly.payroll_month,
    anomaly.type,
    anomaly.severity,
    anomaly.explanation,
    anomaly.previous_value ?? null,
    anomaly.current_value ?? null,
  ]);
};

export const getAnomaliesByMonth = async (
  payrollMonth: string
) => {
  const sql = `
    SELECT *
    FROM anomalies
    WHERE payroll_month = $1
    ORDER BY severity DESC, emp_code;
  `;

  return query(sql, [payrollMonth]);
};
