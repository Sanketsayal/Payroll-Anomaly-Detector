import { Pool } from "pg";
import { config } from "./env";

export const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

pool.on("connect", ()=> {
    console.log("Postgress Connected")
})

pool.on("error", (err)=> {
    console.error("Unexpected PG error", err);
    process.exit(1);
})
