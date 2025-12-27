import { Router } from "express";
import { getPayrollByMonth, getEmployeePayrollForMonth } from "./payroll.repo";

const router = Router();

router.get("/:month", async (req, res) => {
  try {
    const { month } = req.params;
    const payroll = await getPayrollByMonth(month);
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payroll" });
  }
});

router.get("/:month/employee/:id", async (req, res) => {
  try {
    const { month, id } = req.params;
    const payroll = await getEmployeePayrollForMonth(Number(id), month);

    if (!payroll) {
      return res.status(404).json({ message: "Payroll not found" });
    }

    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employee payroll" });
  }
});

export default router;
