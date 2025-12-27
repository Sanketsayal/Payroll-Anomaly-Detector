import { Router } from "express";
import { query } from "../db";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "API is running" });
});
router.get("/db-check", async (_req, res) => {
  const result = await query("SELECT NOW()");
  res.json({ dbTime: result[0] });
});
export default router
