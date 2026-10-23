import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";

// Basic in-memory rate limit: 5 requests per 10 minutes per IP.
// On serverless this resets per instance. It slows casual abuse; use a shared store for strict limits.
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX;
}

const fail = (error: string, status: number, headers?: HeadersInit) =>
  NextResponse.json({ ok: false, error }, { status, headers });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return fail("Too many messages. Please try again later.", 429, { "Retry-After": "600" });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return fail("Please check the form and try again.", 400);
  const { name, email, message } = parsed.data;
  // Honeypot filled: the schema requires it to be empty, so bots are rejected above.

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  if (!key || !to) {
    console.error("Contact form is missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return fail("Message not sent.", 500);
  }

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio message from ${name.replace(/[\r\n]+/g, " ")}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (error) {
      console.error("Resend error", error.name);
      return fail("Message not sent.", 502);
    }
    return NextResponse.json({ ok: true });
  } catch {
    console.error("Contact form send failed");
    return fail("Message not sent.", 500);
  }
}
