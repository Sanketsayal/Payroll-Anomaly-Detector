import { query } from "../../db";

export interface PayrollRun {
  id: number;
  emp_code: String;
  payroll_month: string;
  base_salary: number;
  overtime_hours: number;
  overtime_amount: number;
  deductions: number;
  net_pay: number;
}

export const getPayrollByMonth = async (
  payrollMonth: string
): Promise<PayrollRun[]> => {
  const sql = `
    SELECT
      id,
      emp_code,
      payroll_month,
      base_salary,
      overtime_hours,
      overtime_amount,
      deductions,
      net_pay
    FROM payroll_records
    WHERE payroll_month = $1
    ORDER BY emp_code;
    `;

    return query<PayrollRun>(sql, [payrollMonth])
};

export const getEmployeePayrollForMonth = async (
  employeeId: number,
  payrollMonth: string
): Promise<PayrollRun | null> => {
  const sql = `
    SELECT *
    FROM payroll_records
    WHERE emp_code = $1
      AND payroll_month = $2
    LIMIT 1;
  `;

  const result = await query<PayrollRun>(sql, [employeeId, payrollMonth]);
  return result[0] || null;
};

export const getPreviousPayroll = async (
  employeeId: number,
  payrollMonth: string
): Promise<PayrollRun | null> => {
  const sql = `
    SELECT *
    FROM payroll_records
    WHERE emp_code = $1
      AND payroll_month < $2
    ORDER BY payroll_month DESC
    LIMIT 1;
  `;

  const result = await query<PayrollRun>(sql, [employeeId, payrollMonth]);
  return result[0] || null;
};
