import { Router } from "express";
import {
  runPayrollDetectionForEmployee,
  runPayrollDetectionForMonth,
} from "./detection.service";


const router = Router();

/* ----------------------------------
   POST /api/detect/:month/employee/:id
---------------------------------- */
router.post("/:month/employee/:id", async (req, res) => {
  try {
    const { month, id } = req.params;

    const anomalies = await runPayrollDetectionForEmployee(
      Number(id),
      month
    );

    res.json({
      employee_id: id,
      payroll_month: month,
      anomalies,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

/* ----------------------------------
   POST /api/detect/:month
---------------------------------- */
router.post("/:month", async (req, res) => {
  try {
    const { month } = req.params;
    const result = await runPayrollDetectionForMonth(month);

    res.json({
      payroll_month: month,
      processed_employees: result.processed,
      total_anomalies: result.anomalies,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 
