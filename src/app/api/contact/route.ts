import { Resend } from "resend";
import { site } from "@/content/site";

// Contact form endpoint. Accepts JSON (the export dialog) or a normal form post (no JS).
// Needs RESEND_API_KEY; CONTACT_TO / CONTACT_FROM are optional (see .env.example).

const FORMATS = new Set<string>(site.form.formats.map((f) => f.value));
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 2500;

// Basic per-IP rate limit: 5 messages per 10 minutes. In-memory, so it is per server
// instance — enough to blunt a bot hammering one instance, not a global guarantee.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

type Fields = { name: string; email: string; format: string; message: string; company: string; elapsed?: number };

function validate(f: Fields): string | null {
  if (!f.name || f.name.length > 100) return "Please add your name.";
  if (!EMAIL.test(f.email) || f.email.length > 200) return "Please add a valid email address.";
  if (!FORMATS.has(f.format)) return "Please choose a format.";
  if (f.message.length < 10) return "Please write a little more in your message.";
  if (f.message.length > 5000) return "That message is too long — please keep it under 5000 characters.";
  return null;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Response for browsers that posted the form without JS. */
function page(title: string, body: string, status = 200) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} — ${site.name}</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0d1b2a;color:#f5f0e8;font:18px/1.6 system-ui,sans-serif;padding:24px}main{max-width:36rem}p.l{font:12px ui-monospace,Menlo,monospace;letter-spacing:.12em;text-transform:uppercase;color:#c9a96e}a{color:#e0c48a}</style></head>
<body><main><p class="l">Export settings</p><h1>${title}</h1><p>${body}</p><p><a href="/#contact">Back to the site</a></p></main></body></html>`;
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export async function POST(request: Request) {
  const wantsJson = (request.headers.get("content-type") ?? "").includes("application/json");
  const reply = (ok: boolean, message: string, status: number) =>
    wantsJson
      ? Response.json(ok ? { ok: true } : { error: message }, { status })
      : page(ok ? "Message delivered." : "Not sent", escapeHtml(message), status);

  let raw: Record<string, unknown>;
  try {
    raw = wantsJson ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return reply(false, "That request could not be read.", 400);
  }

  const text = (k: string) => (typeof raw[k] === "string" ? (raw[k] as string).trim() : "");
  const fields: Fields = {
    name: text("name"),
    email: text("email"),
    format: text("format"),
    message: text("message"),
    company: text("company"),
    elapsed: typeof raw.elapsed === "number" ? raw.elapsed : undefined,
  };

  // Bots: a filled honeypot, or a form completed faster than a person can type. Pretend it worked.
  if (fields.company || (fields.elapsed !== undefined && fields.elapsed < MIN_FILL_MS)) {
    return reply(true, site.form.delivered, 200);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (limited(ip)) return reply(false, "Too many messages in a short time. Please try again in a few minutes, or email directly.", 429);

  const problem = validate(fields);
  if (problem) return reply(false, problem, 422);

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[contact] RESEND_API_KEY is not set; message not sent.");
    return reply(false, "The contact form is not configured yet.", 503);
  }

  const format = site.form.formats.find((f) => f.value === fields.format)!.label;
  const { error } = await new Resend(key).emails.send({
    from: process.env.CONTACT_FROM ?? `${site.name} portfolio <onboarding@resend.dev>`,
    to: process.env.CONTACT_TO ?? site.contact.email,
    replyTo: fields.email,
    subject: `New enquiry: ${format} — ${fields.name}`,
    text: `Name: ${fields.name}\nEmail: ${fields.email}\nFormat: ${format}\n\n${fields.message}\n`,
    html: `<p><strong>Name:</strong> ${escapeHtml(fields.name)}<br><strong>Email:</strong> ${escapeHtml(fields.email)}<br><strong>Format:</strong> ${escapeHtml(format)}</p><p style="white-space:pre-wrap">${escapeHtml(fields.message)}</p>`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return reply(false, "The message could not be sent right now.", 502);
  }
  return reply(true, site.form.delivered, 200);
}
