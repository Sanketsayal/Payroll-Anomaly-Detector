import { PayrollRun } from "../modules/payroll/payroll.repo";
import { Anomaly, DetectionContext } from "./rules/rule.interface";
import { SalarySpikeRule } from "./rules/salarySpike.rule";
import { OvertimeAbuseRule } from "./rules/overtimeAbuse.rule";

const rules = [
    SalarySpikeRule,
    OvertimeAbuseRule,
]

export const detectAnomalies = (
    current: PayrollRun,
    previous: PayrollRun | null,
): Anomaly[] => {
    const context: DetectionContext = {current, previous};
    const anomalies: Anomaly[] = [];

    for (const rule of rules) {
        const result = rule.apply(context)
        if(result) {
            anomalies.push(result);
        }
    }

    return anomalies;
}