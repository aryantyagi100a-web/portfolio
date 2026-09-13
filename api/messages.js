// GET /api/messages — Vercel serverless twin of server/index.js route.
// Requires the x-admin-password header.
import { db, ensureSchema } from "../api/_lib.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "method not allowed" });
  }

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
  const provided = req.headers["x-admin-password"] || "";
  if (!ADMIN_PASSWORD || provided !== ADMIN_PASSWORD) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }

  try {
    await ensureSchema();
    const result = await db.execute(
      `SELECT id, name, email, phone, message, notified, created_at
       FROM messages ORDER BY id DESC LIMIT 500`
    );
    return res.json({ ok: true, messages: result.rows });
  } catch (err) {
    console.error("[messages] failed:", err.message);
    return res.status(500).json({ ok: false, error: "could not load messages" });
  }
}
