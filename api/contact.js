// POST /api/contact — Vercel serverless twin of server/index.js route.
import { db, ensureSchema, notify, validate, rateLimited, clientIp } from "../api/_lib.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method not allowed" });
  }

  try {
    const ip = clientIp(req);
    if (rateLimited(ip)) {
      return res.status(429).json({ ok: false, error: "too many messages — try again later" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { name, email, phone, message, company, errors } = validate(body);

    // Honeypot filled → almost certainly a bot: pretend success, save nothing.
    if (company) return res.json({ ok: true });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ ok: false, errors });
    }

    await ensureSchema();

    let notified = 0;
    try {
      notified = (await notify({ name, email, phone, message })) ? 1 : 0;
    } catch (err) {
      console.error("[contact] notify threw:", err.message);
    }

    await db.execute({
      sql: `INSERT INTO messages (name, email, phone, message, ip, notified)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [name, email || null, phone || null, message, ip, notified],
    });

    console.log(`[contact] saved from ${name}${notified ? " (notified)" : ""}`);
    return res.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed:", err.message);
    return res.status(500).json({ ok: false, error: "could not save your message — try again" });
  }
}
