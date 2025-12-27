import { Router } from "express";
import { query } from "../db";
import payrollRoutes from "../modules/payroll/payroll.routes"
import detectionRoutes from "../services/detection.routes"
import anomalyRoutes from "../modules/anomalies/anomalies.routes"

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "API is running" });
});
router.get("/db-check", async (_req, res) => {
  const result = await query("SELECT NOW()");
  res.json({ dbTime: result[0] });
});

router.use("/payroll", payrollRoutes)
router.use("/detect", detectionRoutes);
router.use("/anomalies", anomalyRoutes);


export default router
