import Image from "next/image";
import Link from "next/link";
import { brand, heroTrustItems } from "@/data/publicPage";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-[#F8FAF7] px-5 pb-20 pt-36 sm:px-8 sm:pt-40 lg:px-10 lg:pb-28"
    >
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(115deg,#F8FAF7_0%,#FFFFFF_42%,#F7FDF2_100%)]" />
      <div className="absolute -left-32 top-8 -z-10 size-96 rounded-full bg-[#63B32E]/24 blur-3xl" />
      <div className="absolute -right-24 top-20 -z-10 size-[28rem] rounded-full bg-[#F39C12]/22 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 -z-10 h-72 w-[54rem] -translate-x-1/2 rounded-full bg-[#0B6B2E]/12 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="max-w-3xl animate-[fadeUp_700ms_ease-out_both]">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/62 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0B6B2E] shadow-[0_12px_34px_rgba(31,41,55,0.08)] backdrop-blur-xl">
            <span className="size-2 rounded-full bg-[#F39C12] shadow-[0_0_18px_rgba(243,156,18,0.7)]" />
            Jardinería profesional
          </p>
          <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.04] tracking-normal text-[#1F2937] sm:text-5xl lg:text-6xl xl:text-[4.55rem]">
            Transformamos espacios verdes en lugares{" "}
            <span className="bg-gradient-to-r from-[#0B6B2E] via-[#63B32E] to-[#F39C12] bg-clip-text text-transparent">
              extraordinarios.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#1F2937]/72 sm:text-lg">
            Mantenimiento profesional, poda, césped y cercas vivas para hogares
            y empresas.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-[#0B6B2E] px-6 text-sm font-semibold text-white shadow-[0_20px_42px_rgba(11,107,46,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_55px_rgba(243,156,18,0.3)] sm:h-13 sm:px-7"
              href={brand.quoteHref}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0B6B2E] via-[#11883D] to-[#F39C12] opacity-0 transition duration-500 group-hover:opacity-100" />
              <span className="absolute -left-8 top-0 h-full w-8 skew-x-[-18deg] bg-white/24 opacity-0 blur-sm transition duration-700 group-hover:left-[112%] group-hover:opacity-100" />
              <span className="relative">Solicitar Cotización</span>
            </Link>
            <Link
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-[#25D366]/30 bg-white/76 px-5 text-sm font-semibold text-[#0B6B2E] shadow-[0_16px_36px_rgba(37,211,102,0.12)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#25D366]/60 hover:bg-white hover:shadow-[0_22px_48px_rgba(37,211,102,0.22)] sm:h-13 sm:px-7"
              href={brand.whatsappHref}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#25D366]/0 via-[#25D366]/10 to-[#F39C12]/10 opacity-0 transition duration-500 group-hover:opacity-100" />
              <span className="mr-2 grid size-6 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_0_18px_rgba(37,211,102,0.48)] transition duration-300 group-hover:scale-105">
                <svg
                  aria-hidden="true"
                  className="size-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2C6.58 2 2.14 6.34 2.14 11.68c0 1.88.56 3.64 1.52 5.12L2 22l5.36-1.6a10.1 10.1 0 0 0 4.68 1.16c5.46 0 9.9-4.34 9.9-9.68S17.5 2 12.04 2Zm0 17.86a8.4 8.4 0 0 1-4.28-1.18l-.3-.18-3.18.94.98-3.02-.2-.32a7.8 7.8 0 0 1-1.22-4.18c0-4.38 3.68-7.94 8.2-7.94s8.2 3.56 8.2 7.94-3.68 7.94-8.2 7.94Zm4.5-5.94c-.24-.12-1.44-.7-1.66-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.36-1.94-1.16-.72-.62-1.2-1.4-1.34-1.64-.14-.24-.02-.38.1-.5.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.28-.74-1.76-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.8-.84 1.96s.86 2.28.98 2.44c.12.16 1.7 2.52 4.12 3.54.58.24 1.02.38 1.38.5.58.18 1.1.16 1.52.1.46-.06 1.44-.58 1.64-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
                </svg>
              </span>
              <span className="relative">WhatsApp</span>
            </Link>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {heroTrustItems.map((item) => (
              <div
                className="group rounded-3xl border border-white/70 bg-white/58 px-4 py-4 shadow-[0_14px_40px_rgba(31,41,55,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(31,41,55,0.12)]"
                key={item.label}
              >
                <span
                  className={`mb-3 block size-2.5 rounded-full ${
                    item.tone === "orange"
                      ? "bg-[#F39C12] shadow-[0_0_20px_rgba(243,156,18,0.55)]"
                      : item.tone === "lime"
                        ? "bg-[#63B32E] shadow-[0_0_20px_rgba(99,179,46,0.45)]"
                        : "bg-[#0B6B2E] shadow-[0_0_20px_rgba(11,107,46,0.45)]"
                  }`}
                />
                <span className="block text-sm font-semibold text-[#1F2937]">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs font-medium text-[#1F2937]/56">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-[fadeUp_900ms_ease-out_120ms_both] pb-8 sm:pb-12">
          <div className="absolute -left-4 top-10 z-10 hidden animate-[floatSoft_6s_ease-in-out_infinite] rounded-[1.75rem] border border-white/70 bg-white/76 p-4 shadow-[0_24px_70px_rgba(31,41,55,0.18)] backdrop-blur-2xl sm:block">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F39C12]">
              Confianza
            </p>
            <p className="mt-1 font-heading text-xl font-semibold text-[#1F2937]">
              Servicio Profesional
            </p>
          </div>

          <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 animate-[floatSoft_7s_ease-in-out_800ms_infinite] rounded-[1.5rem] border border-white/70 bg-[#0B6B2E]/88 px-5 py-4 text-white shadow-[0_24px_70px_rgba(11,107,46,0.22)] backdrop-blur-2xl sm:block">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Atención
            </p>
            <p className="mt-1 text-sm font-semibold">Personalizada</p>
          </div>

          <div className="absolute bottom-4 left-8 z-10 hidden animate-[floatSoft_8s_ease-in-out_300ms_infinite] rounded-[1.5rem] border border-white/70 bg-white/80 px-5 py-4 shadow-[0_24px_70px_rgba(243,156,18,0.18)] backdrop-blur-2xl md:block">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F39C12]">
              Puntualidad
            </p>
            <p className="mt-1 text-sm font-semibold text-[#1F2937]">
              Coordinación clara
            </p>
          </div>

          <div className="relative min-h-[390px] overflow-hidden rounded-[2.25rem] border border-white/70 bg-[#0B6B2E]/10 shadow-[0_36px_110px_rgba(31,41,55,0.18)] sm:min-h-[520px] lg:min-h-[640px]">
            <Image
              src="/gallery/hero-garden-service.png"
              alt="Jardín profesional con zonas verdes cuidadas por Rodriguez Garden Service"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="scale-[1.02] object-cover transition duration-700 hover:scale-[1.05]"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_14%,rgba(243,156,18,0.28),transparent_24%),linear-gradient(180deg,rgba(11,107,46,0.02),rgba(11,107,46,0.34))]" />
            <div className="absolute inset-x-8 top-6 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          </div>

          <div className="absolute -bottom-2 left-5 right-5 z-20 rounded-[1.75rem] border border-white/70 bg-white/86 p-4 shadow-[0_20px_60px_rgba(31,41,55,0.16)] backdrop-blur-2xl sm:-bottom-1 sm:left-auto sm:right-8 sm:w-72">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0B6B2E]">
                  Respuesta clara
                </p>
                <p className="mt-1 text-sm font-semibold text-[#1F2937]">
                  Cotización para hogares y empresas.
                </p>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#F39C12] to-[#0B6B2E] text-sm font-bold text-white shadow-[0_12px_30px_rgba(243,156,18,0.35)]">
                +
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
