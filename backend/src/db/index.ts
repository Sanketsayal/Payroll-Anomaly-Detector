import { pool } from "../config/db";

export const query = async <T = any>(
  text: string,
  params?: any[]
): Promise<T[]> => {
  const result = await pool.query(text, params);
  return result.rows;
};
