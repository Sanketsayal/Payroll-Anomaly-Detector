import { Router } from "express";
import { getAnomaliesByMonth } from "./anomaly.repo";

const router = Router()
router.get("/:month", async (req, res) => {
  try {
    const { month } = req.params;
    const anomalies = await getAnomaliesByMonth(month);
    res.json(anomalies);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch anomalies" });
  }
});

export default router;