import express from "express";
// import cors from "cors";
import morgan from "morgan";
import { config } from "./config/env";
import routes from "./router";
import "./config/db"

const app = express();
const PORT = config.port;
/* ----------- Middleware ----------- */
// app.use(cors);
app.use(express.json());
app.use(morgan("dev"));

/* ----------- Routes ----------- */
app.use("/api", routes)

/* ----------- Health Check ----------- */
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Payroll Anomaly Detector",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
