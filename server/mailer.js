import nodemailer from "nodemailer";

// Delivery channels, each active only when its env vars are set:
//   1. Gmail email  — GMAIL_USER + GMAIL_APP_PASSWORD
//   2. WhatsApp     — CALLMEBOT_PHONE + CALLMEBOT_APIKEY (CallMeBot free API)
// Every submission is ALWAYS saved to SQLite first; alerts are best-effort.
export function makeNotifier() {
  const {
    GMAIL_USER,
    GMAIL_APP_PASSWORD,
    NOTIFY_EMAIL,
    CALLMEBOT_PHONE,
    CALLMEBOT_APIKEY,
  } = process.env;

  const channels = [];

  // --- Channel 1: Gmail ---
  if (GMAIL_USER && GMAIL_APP_PASSWORD) {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD.replace(/\s+/g, ""),
      },
      pool: true,
    });

    const to = NOTIFY_EMAIL || GMAIL_USER;
    channels.push(async ({ name, email, phone, message }) => {
      await transport.sendMail({
        from: `"Portfolio" <${GMAIL_USER}>`,
        to,
        replyTo: email || undefined,
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
      });
    });
  }

  // --- Channel 2: WhatsApp via CallMeBot ---
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
      if (!res.ok) {
        throw new Error(`CallMeBot responded ${res.status}`);
      }
    });
  }

  if (channels.length === 0) {
    return async () => false; // nothing configured — submissions still save
  }

  // Fire every configured channel; success if at least one delivered.
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
