import { AnomalyRule, DetectionContext } from "./rule.interface";

const OVERTIME_HOURS_THRESHOLD = 15;

export const OvertimeAbuseRule: AnomalyRule = {
  type: "OVERTIME_ABUSE",

  apply(context: DetectionContext) {
    const { current } = context;

    if (current.overtime_hours > OVERTIME_HOURS_THRESHOLD) {
      return {
        type: this.type,
        severity: "MEDIUM",
        explanation: `Overtime hours (${current.overtime_hours}) exceed normal threshold`,
        current_value: current.overtime_hours,
      };
    }

    return null;
  },
};
