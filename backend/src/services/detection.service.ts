import { query } from "../db";

import { getEmployeePayrollForMonth, getPreviousPayroll} from "../modules/payroll/payroll.repo";
import { detectAnomalies } from "../engine";
import { saveAnomaly } from "../modules/anomalies/anomaly.repo";

export const runPayrollDetectionForEmployee = async (
  employeeId: number,
  payrollMonth: string
) => {
  // 1. Fetch current payroll
  const currentPayroll = await getEmployeePayrollForMonth(
    employeeId,
    payrollMonth
  );

  if (!currentPayroll) {
    throw new Error("Current payroll not found");
  }

  // 2. Fetch previous payroll
  const previousPayroll = await getPreviousPayroll(
    employeeId,
    payrollMonth
  );

  // 3. Run anomaly engine
  const anomalies = detectAnomalies(
    currentPayroll,
    previousPayroll
  );

  // 4. Persist anomalies
  for (const anomaly of anomalies) {
    await saveAnomaly({
      employee_id: employeeId,
      payroll_month: payrollMonth,
      type: anomaly.type,
      severity: anomaly.severity,
      explanation: anomaly.explanation,
      previous_value: anomaly.previous_value,
      current_value: anomaly.current_value,
    });
  }

  // 5. Return result (API / UI)
  return anomalies;
};

export const runPayrollDetectionForMonth = async (
  payrollMonth: string
) => {
  const sql = `
    SELECT DISTINCT employee_id
    FROM payroll_runs
    WHERE payroll_month = $1;
  `;

  const employees = await query<{ employee_id: number }>(sql, [
    payrollMonth,
  ]);

  let totalAnomalies = 0;

  for (const emp of employees) {
    const anomalies = await runPayrollDetectionForEmployee(
      emp.employee_id,
      payrollMonth
    );
    totalAnomalies += anomalies.length;
  }

  return {
    processed: employees.length,
    anomalies: totalAnomalies,
  };
};