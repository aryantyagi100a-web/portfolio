// Shared helpers for the Vercel serverless API.
// Local dev keeps using server/ (Express + file SQLite); this is the
// cloud twin so the same endpoints work on Vercel.
import { createClient } from "@libsql/client";

// --- Database (Turso — hosted SQLite) ------------------------------------
const dbUrl = process.env.TURSO_DATABASE_URL;
const dbToken = process.env.TURSO_AUTH_TOKEN;

export const db = dbUrl
  ? createClient({ url: dbUrl, authToken: dbToken || undefined })
  : null;

let schemaReady = false;
export async function ensureSchema() {
  if (!db) throw new Error("TURSO_DATABASE_URL is not configured");
  if (schemaReady) return;
  await db.execute(
    `CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      message TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'contact_form',
      ip TEXT,
      notified INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );`
  );
  schemaReady = true;
}

// --- Notification channels (best-effort; saving always succeeds first) ---
function makeNotifier() {
  const {
    RESEND_API_KEY,
    NOTIFY_EMAIL,
    RESEND_FROM,
    CALLMEBOT_PHONE,
    CALLMEBOT_APIKEY,
  } = process.env;

  const channels = [];

  // --- Channel 1: Email via Resend (HTTP — works on serverless) ---
  if (RESEND_API_KEY && NOTIFY_EMAIL) {
    channels.push(async ({ name, email, phone, message }) => {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: RESEND_FROM || "Portfolio <onboarding@resend.dev>",
          to: NOTIFY_EMAIL,
          reply_to: email || undefined,
          subject: `New website inquiry — ${name}`,
          text: [
            `Name: ${name}`,
            `Email: ${email || "—"}`,
            `Phone: ${phone || "—"}`,
            "",
            message,
            "",
            "— sent from your portfolio contact form",
          ].join("\n"),
        }),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`Resend responded ${res.status}: ${body.slice(0, 200)}`);
      }
    });
  }

  // --- Channel 2: WhatsApp via CallMeBot (HTTP — works on serverless) ---
  if (CALLMEBOT_PHONE && CALLMEBOT_APIKEY) {
    channels.push(async ({ name, email, phone, message }) => {
      const text = [
        `🔔 New inquiry — ${name}`,
        email ? `📧 ${email}` : null,
        phone ? `📱 ${phone}` : null,
        "",
        message.length > 600 ? message.slice(0, 600) + "…" : message,
      ]
        .filter(Boolean)
        .join("\n");

      const url =
        `https://api.callmebot.com/whatsapp.php` +
        `?phone=${encodeURIComponent("+" + String(CALLMEBOT_PHONE).replace(/^\+/, ""))}` +
        `&text=${encodeURIComponent(text)}` +
        `&apikey=${encodeURIComponent(CALLMEBOT_APIKEY)}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(`CallMeBot responded ${res.status}`);
    });
  }

  if (channels.length === 0) return async () => false;

  return async function notify(payload) {
    const results = await Promise.allSettled(channels.map((c) => c(payload)));
    for (const r of results) {
      if (r.status === "rejected") {
        console.error("[mailer] a channel failed:", r.reason?.message || r.reason);
      }
    }
    return results.some((r) => r.status === "fulfilled");
  };
}

export const notify = makeNotifier();

// --- Validation (mirrors server/index.js) --------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const trim = (v) => (typeof v === "string" ? v.trim().slice(0, 2000) : "");

export function validate(body) {
  const name = trim(body.name);
  const email = trim(body.email);
  const phone = trim(body.phone);
  const message = trim(body.message);
  const company = trim(body.company); // honeypot — bots fill hidden fields

  const errors = {};
  if (!name || name.length < 2) errors.name = "please tell me your name";
  if (!message || message.length < 10)
    errors.message = "a few words about your project help a lot";
  if (message.length > 2000) errors.message = "message is too long";
  if (!email && !phone) errors.contact = "add an email or phone so i can reply";
  if (email && !EMAIL_RE.test(email)) errors.email = "that email doesn't look right";

  return { name, email, phone, message, company, errors };
}

// --- Light per-instance rate limit: 5 submissions per hour per IP --------
const hits = new Map();
export function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return list.length > 5;
}

export function clientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  return (typeof fwd === "string" ? fwd.split(",")[0] : fwd?.[0]) || "unknown";
}
