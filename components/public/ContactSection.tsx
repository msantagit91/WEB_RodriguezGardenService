"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { brand } from "@/data/publicPage";

type FormState = {
  nombre: string;
  telefono: string;
  correo: string;
  mensaje: string;
};

const initialFormState: FormState = {
  nombre: "",
  telefono: "",
  correo: "",
  mensaje: "",
};

const contactItems = [
  {
    label: "Teléfono",
    value: brand.whatsappPhone,
  },
  {
    label: "Correo",
    value: "Cotizaciones y seguimiento",
  },
  {
    label: "Ubicación",
    value: "Atención a hogares y empresas",
  },
  {
    label: "Horario",
    value: "Coordinación según disponibilidad",
  },
];

const fieldClass =
  "w-full rounded-[1.2rem] border border-white/[0.12] bg-white/[0.05] px-4 py-3.5 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] outline-none backdrop-blur-[20px] transition duration-500 placeholder:text-white/38 focus:border-[#D4AF37]/42 focus:bg-white/[0.07] focus:shadow-[0_0_34px_rgba(212,175,55,0.08),inset_0_1px_0_rgba(255,255,255,0.12)]";

export function ContactSection() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  const updateField =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));

      if (status !== "idle") {
        setStatus("idle");
        setFeedback("");
      }
    };

  const handleSubmit = async (
    event?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    event?.preventDefault();

    const payload = {
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
      correo: form.correo.trim(),
      mensaje: form.mensaje.trim(),
    };

    if (!payload.nombre || !payload.telefono || !payload.mensaje) {
      setStatus("error");
      setFeedback("Completa nombre, teléfono y mensaje para solicitar la cotización.");
      return;
    }

    if (payload.correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.correo)) {
      setStatus("error");
      setFeedback("Ingresa un correo válido o deja ese campo vacío.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo enviar la solicitud.");
      }

      setForm(initialFormState);
      setStatus("success");
      setFeedback("Solicitud enviada correctamente. Te contactaremos pronto.");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "No se pudo enviar la solicitud. Inténtalo nuevamente.",
      );
    }
  };

  return (
    <section
      id="contacto"
      className="relative isolate overflow-hidden bg-[#050A06] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_18%_18%,rgba(30,143,71,0.14),transparent_32%),radial-gradient(circle_at_82%_20%,rgba(212,175,55,0.1),transparent_28%),linear-gradient(180deg,#07120B_0%,#06100A_48%,#030604_100%)]" />
      <div className="absolute -left-36 top-24 -z-20 size-[30rem] rounded-full bg-[#1E8F47]/12 blur-3xl" />
      <div className="absolute -right-40 bottom-10 -z-20 size-[34rem] rounded-full bg-[#D4AF37]/8 blur-3xl" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-14">
        <div>
          <ScrollReveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/78 shadow-[0_18px_50px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[30px]">
              <span className="size-2 rounded-full bg-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.38)]" />
              Contacto
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="mt-6 max-w-xl font-heading text-4xl font-semibold leading-[1.04] text-white sm:text-5xl lg:text-6xl">
              Hablemos de tu próximo proyecto.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={190}>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/66 sm:text-lg">
              Comparte lo que necesitas y coordinamos una cotización clara para
              tu hogar o empresa.
            </p>
          </ScrollReveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {contactItems.map((item, index) => (
              <ScrollReveal delay={280 + index * 80} key={item.label}>
                <div className="group min-h-32 rounded-[1.45rem] border border-white/[0.11] bg-[linear-gradient(145deg,rgba(255,255,255,0.052),rgba(255,255,255,0.024))] p-4 shadow-[0_18px_54px_rgba(0,0,0,0.2),0_0_42px_rgba(30,143,71,0.055),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[30px] transition duration-700 hover:-translate-y-1 hover:border-white/[0.18] hover:bg-white/[0.06]">
                  <span className="grid size-10 place-items-center rounded-2xl border border-white/[0.12] bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    <span className="size-2.5 rounded-full bg-[#1E8F47] shadow-[0_0_18px_rgba(30,143,71,0.28)]" />
                  </span>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    {item.value}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={180}>
          <form
            className="relative overflow-hidden rounded-[2.2rem] border border-white/[0.13] bg-[linear-gradient(145deg,rgba(255,255,255,0.052),rgba(255,255,255,0.024))] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.32),0_0_76px_rgba(30,143,71,0.08),0_0_70px_rgba(212,175,55,0.06),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[32px] sm:p-6 lg:p-7"
            onSubmit={handleSubmit}
          >
            <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/48 to-transparent" />
            <span className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-[#D4AF37]/8 blur-3xl" />
            <span className="pointer-events-none absolute -left-20 bottom-0 size-52 rounded-full bg-[#1E8F47]/10 blur-3xl" />

            <div className="relative grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/52">
                  Nombre
                </span>
                <input
                  className={fieldClass}
                  name="nombre"
                  onChange={updateField("nombre")}
                  placeholder="Tu nombre"
                  required
                  value={form.nombre}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/52">
                  Teléfono
                </span>
                <input
                  className={fieldClass}
                  name="telefono"
                  onChange={updateField("telefono")}
                  placeholder="Tu teléfono"
                  required
                  type="tel"
                  value={form.telefono}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/52">
                  Correo
                </span>
                <input
                  className={fieldClass}
                  name="correo"
                  onChange={updateField("correo")}
                  placeholder="tu@email.com"
                  type="email"
                  value={form.correo}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/52">
                  Mensaje
                </span>
                <textarea
                  className={`${fieldClass} min-h-36 resize-none`}
                  name="mensaje"
                  onChange={updateField("mensaje")}
                  placeholder="Cuéntanos sobre el espacio que deseas mejorar"
                  required
                  value={form.mensaje}
                />
              </label>
            </div>

            {feedback && (
              <p
                className={`relative mt-4 rounded-[1rem] border px-4 py-3 text-sm leading-6 ${
                  status === "success"
                    ? "border-[#1E8F47]/30 bg-[#1E8F47]/12 text-white/82"
                    : "border-[#D4AF37]/28 bg-[#D4AF37]/10 text-white/78"
                }`}
                role="status"
              >
                {feedback}
              </p>
            )}

            <button
              className="group relative mt-5 inline-flex h-13 w-full items-center justify-center overflow-hidden rounded-full bg-[#0B6B2E] px-7 text-sm font-semibold text-white shadow-[0_20px_42px_rgba(11,107,46,0.28),0_0_42px_rgba(30,143,71,0.14)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_26px_58px_rgba(30,143,71,0.3),0_0_52px_rgba(212,175,55,0.12)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              disabled={status === "loading"}
              onClick={handleSubmit}
              type="button"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0B6B2E] via-[#1E8F47] to-[#D4AF37] opacity-0 transition duration-700 group-hover:opacity-100" />
              <span className="absolute -left-8 top-0 h-full w-8 skew-x-[-18deg] bg-white/24 opacity-0 blur-sm transition duration-700 group-hover:left-[112%] group-hover:opacity-100" />
              <span className="relative">
                {status === "loading" ? "Enviando..." : "Solicitar Cotización"}
              </span>
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
