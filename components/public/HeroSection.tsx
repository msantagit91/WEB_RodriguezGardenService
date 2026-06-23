"use client";

import Link from "next/link";
import { useState } from "react";
import { brand, heroTrustItems } from "@/data/publicPage";

type HeroMotion = {
  x: number;
  y: number;
};

export function HeroSection() {
  const [motion, setMotion] = useState<HeroMotion>({ x: 0, y: 0 });

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setMotion({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const resetMotion = () => setMotion({ x: 0, y: 0 });

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[92svh] overflow-hidden bg-[#031008] px-5 pb-16 pt-32 text-white sm:px-8 sm:pt-36 lg:min-h-screen lg:px-10 lg:pb-24"
      onPointerLeave={resetMotion}
      onPointerMove={handlePointerMove}
    >
      <div className="absolute inset-0 -z-40 bg-[radial-gradient(circle_at_50%_0%,rgba(247,178,72,0.2),transparent_30%),radial-gradient(circle_at_16%_24%,rgba(42,142,76,0.36),transparent_34%),radial-gradient(circle_at_84%_28%,rgba(238,151,59,0.13),transparent_31%),linear-gradient(145deg,#020806_0%,#062012_48%,#020604_100%)]" />
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_28%,rgba(0,0,0,0.34)_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-20 h-72 bg-[radial-gradient(ellipse_at_top,rgba(255,223,153,0.18),transparent_68%)]" />
      <div className="absolute -left-24 top-20 -z-20 size-[22rem] rounded-full bg-[#1E8F47]/24 blur-3xl sm:size-[32rem]" />
      <div className="absolute -right-28 top-28 -z-20 size-[20rem] rounded-full bg-[#D4AF37]/15 blur-3xl sm:size-[30rem]" />
      <div className="absolute bottom-[-12rem] left-1/2 -z-20 h-[24rem] w-[42rem] -translate-x-1/2 rounded-full bg-[#0B6B2E]/34 blur-3xl" />
      <div className="absolute left-[8%] top-[34%] -z-10 h-40 w-60 rounded-[44%_56%_60%_40%] bg-white/[0.04] blur-2xl animate-[premiumBlob_12s_ease-in-out_infinite]" />
      <div className="absolute right-[8%] top-[22%] -z-10 h-44 w-56 rounded-[58%_42%_48%_52%] bg-[#F39C12]/[0.08] blur-2xl animate-[premiumBlob_14s_ease-in-out_1.5s_infinite]" />
      <div className="absolute left-1/2 top-24 -z-10 h-px w-[72vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/24 to-transparent" />
      <div className="absolute left-[12%] top-[18%] -z-10 size-1 rounded-full bg-[#F8DDA0]/70 shadow-[0_0_28px_8px_rgba(248,221,160,0.18)] animate-[lightParticle_8s_ease-in-out_infinite]" />
      <div className="absolute right-[22%] top-[58%] -z-10 size-1.5 rounded-full bg-[#D4AF37]/60 shadow-[0_0_30px_8px_rgba(212,175,55,0.16)] animate-[lightParticle_10s_ease-in-out_1s_infinite]" />

      <div
        className="pointer-events-none absolute left-1/2 top-[52%] -z-10 h-64 w-[115vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.055] bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_0_120px_rgba(30,143,71,0.12)] backdrop-blur-[2px] sm:h-80 sm:w-[86vw]"
        style={{
          transform: `translate3d(calc(-50% + ${motion.x * 10}px), calc(-50% + ${
            motion.y * 8
          }px), 0)`,
        }}
      />

      <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="animate-[fadeUp_760ms_cubic-bezier(0.16,1,0.3,1)_both] inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.07] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/78 shadow-[0_18px_56px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:text-xs">
            <span className="size-2 rounded-full bg-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.6)]" />
            Jardinería profesional
          </p>

          <h1 className="animate-[fadeUp_900ms_cubic-bezier(0.16,1,0.3,1)_120ms_both] mx-auto mt-7 max-w-[22rem] font-heading text-[2.35rem] font-semibold leading-[1.04] tracking-normal text-white drop-shadow-[0_24px_80px_rgba(0,0,0,0.28)] min-[390px]:max-w-[23.5rem] min-[390px]:text-[2.55rem] sm:max-w-4xl sm:text-6xl lg:text-7xl xl:text-[5.75rem]">
            Transformamos espacios verdes en lugares{" "}
            <span className="bg-gradient-to-r from-white via-[#F8DDA0] to-[#7BD167] bg-clip-text text-transparent drop-shadow-[0_18px_55px_rgba(212,175,55,0.16)]">
              extraordinarios.
            </span>
          </h1>

          <p className="animate-[fadeUp_900ms_cubic-bezier(0.16,1,0.3,1)_240ms_both] mx-auto mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
            Mantenimiento profesional, poda, césped y cercas vivas para hogares
            y empresas.
          </p>

          <div className="animate-[fadeUp_900ms_cubic-bezier(0.16,1,0.3,1)_340ms_both] mx-auto mt-8 grid w-full max-w-sm gap-3 sm:flex sm:max-w-none sm:justify-center">
            <Link
              className="group relative inline-flex h-13 items-center justify-center overflow-hidden rounded-full bg-white px-6 text-sm font-semibold text-[#062012] shadow-[0_24px_65px_rgba(0,0,0,0.28),0_0_40px_rgba(212,175,55,0.12)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_78px_rgba(0,0,0,0.34),0_0_55px_rgba(212,175,55,0.18)] sm:px-7"
              href={brand.quoteHref}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white via-[#F8DDA0] to-[#A7E164] opacity-0 transition duration-700 group-hover:opacity-100" />
              <span className="absolute -left-8 top-0 h-full w-8 skew-x-[-18deg] bg-white/70 opacity-0 blur-sm transition duration-700 group-hover:left-[112%] group-hover:opacity-100" />
              <span className="relative">Solicitar Cotización</span>
            </Link>

            <Link
              className="group relative inline-flex h-13 items-center justify-center overflow-hidden rounded-full border border-white/[0.16] bg-white/[0.075] px-6 text-sm font-semibold text-white shadow-[0_22px_58px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-[#25D366]/40 hover:bg-white/[0.12] sm:px-7"
              href={brand.whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#25D366]/0 via-[#25D366]/12 to-[#D4AF37]/12 opacity-0 transition duration-700 group-hover:opacity-100" />
              <span className="mr-2 grid size-6 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_0_18px_rgba(37,211,102,0.42)]">
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

          <div className="animate-[fadeUp_900ms_cubic-bezier(0.16,1,0.3,1)_450ms_both] mx-auto mt-10 grid max-w-3xl gap-2.5 min-[430px]:grid-cols-3 sm:gap-3">
            {heroTrustItems.map((item) => (
              <div
                className="rounded-[1.35rem] border border-white/[0.11] bg-white/[0.055] px-4 py-3 text-left shadow-[0_18px_50px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.09)] backdrop-blur-2xl"
                key={item.label}
              >
                <span
                  className={`mb-2 block size-2 rounded-full ${
                    item.tone === "orange"
                      ? "bg-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.52)]"
                      : item.tone === "lime"
                        ? "bg-[#A7E164] shadow-[0_0_18px_rgba(167,225,100,0.35)]"
                        : "bg-[#1E8F47] shadow-[0_0_18px_rgba(30,143,71,0.45)]"
                  }`}
                />
                <span className="block text-sm font-semibold text-white/88">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs font-medium text-white/48">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
