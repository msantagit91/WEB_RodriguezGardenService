import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  nombre?: unknown;
  telefono?: unknown;
  correo?: unknown;
  mensaje?: unknown;
};

type NormalizedContact = {
  nombre: string;
  telefono: string;
  correo: string;
  mensaje: string;
  fecha: string;
};

const contactToEmail = process.env.CONTACT_TO_EMAIL ?? "moisake1726@gmail.com";
const contactFromEmail =
  process.env.CONTACT_FROM_EMAIL ??
  "Rodriguez Garden Service <onboarding@resend.dev>";

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validatePayload(payload: ContactPayload): NormalizedContact {
  const contact = {
    nombre: normalizeText(payload.nombre),
    telefono: normalizeText(payload.telefono),
    correo: normalizeText(payload.correo),
    mensaje: normalizeText(payload.mensaje),
    fecha: new Date().toISOString(),
  };

  if (!contact.nombre || !contact.telefono || !contact.mensaje) {
    throw new Error("Completa nombre, teléfono y mensaje.");
  }

  if (contact.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.correo)) {
    throw new Error("Ingresa un correo válido.");
  }

  return contact;
}

async function saveToSupabase(contact: NormalizedContact) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase no está configurado.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/contactos`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(contact),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Supabase contact insert failed", details);
    throw new Error("No se pudo guardar la solicitud.");
  }
}

function buildEmailText(contact: NormalizedContact) {
  return [
    "Nuevo lead recibido desde la landing de Rodriguez Garden Service.",
    "",
    `Nombre: ${contact.nombre}`,
    `Teléfono: ${contact.telefono}`,
    `Correo: ${contact.correo || "No indicado"}`,
    `Fecha: ${contact.fecha}`,
    "",
    "Mensaje:",
    contact.mensaje,
  ].join("\n");
}

function buildEmailHtml(contact: NormalizedContact) {
  const safe = {
    nombre: escapeHtml(contact.nombre),
    telefono: escapeHtml(contact.telefono),
    correo: escapeHtml(contact.correo || "No indicado"),
    mensaje: escapeHtml(contact.mensaje).replace(/\n/g, "<br />"),
    fecha: escapeHtml(contact.fecha),
  };

  return `
    <div style="font-family: Arial, sans-serif; color: #17231b; line-height: 1.6;">
      <h1 style="font-size: 22px; margin: 0 0 16px;">Nuevo lead - Rodriguez Garden Service</h1>
      <p style="margin: 0 0 18px;">Se recibió una nueva solicitud desde la landing.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 620px;">
        <tr><td style="padding: 8px 0; font-weight: 700;">Nombre</td><td>${safe.nombre}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Teléfono</td><td>${safe.telefono}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Correo</td><td>${safe.correo}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700;">Fecha</td><td>${safe.fecha}</td></tr>
      </table>
      <div style="margin-top: 18px;">
        <p style="font-weight: 700; margin: 0 0 8px;">Mensaje</p>
        <p style="margin: 0; padding: 14px; background: #f3f7f1; border-radius: 12px;">${safe.mensaje}</p>
      </div>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendLeadEmail(contact: NormalizedContact) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("RESEND_API_KEY is not configured.");
    throw new Error("La solicitud se guardó, pero el correo no está configurado.");
  }

  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from: contactFromEmail,
    to: contactToEmail,
    subject: "Nuevo lead - Rodriguez Garden Service",
    text: buildEmailText(contact),
    html: buildEmailHtml(contact),
  });

  if (error) {
    console.error("Resend email failed", error);
    throw new Error("La solicitud se guardó, pero no se pudo enviar el correo.");
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const contact = validatePayload(payload);

    await saveToSupabase(contact);
    await sendLeadEmail(contact);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "No se pudo procesar la solicitud.",
      },
      { status: 400 },
    );
  }
}
