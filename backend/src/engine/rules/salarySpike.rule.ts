import { AnomalyRule, DetectionContext } from "./rule.interface";

const SALARY_SPIKE_THRESHOLD = 1.3; // 30%

export const SalarySpikeRule: AnomalyRule = {
  type: "SALARY_SPIKE",

  apply(context: DetectionContext) {
    const { current, previous } = context;

    // No previous payroll → cannot compare
    if (!previous) return null;

    const prevSalary = previous.base_salary;
    const currSalary = current.base_salary;

    if (currSalary > prevSalary * SALARY_SPIKE_THRESHOLD) {
      const increasePct = Math.round(
        ((currSalary - prevSalary) / prevSalary) * 100
      );

      return {
        type: this.type,
        severity: "HIGH",
        explanation: `Salary increased by ${increasePct}% compared to previous month`,
        previous_value: prevSalary,
        current_value: currSalary,
      };
    }

    return null;
  },
};
