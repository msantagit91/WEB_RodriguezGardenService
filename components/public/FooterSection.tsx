"use client";

import Image from "next/image";
import Link from "next/link";
import { brand, socialLinks as socialUrls } from "@/data/publicPage";

const footerSocialLinks = [
  {
    label: "WhatsApp",
    href: socialUrls.whatsapp,
    icon: (
      <path d="M12.04 2C6.58 2 2.14 6.34 2.14 11.68c0 1.88.56 3.64 1.52 5.12L2 22l5.36-1.6a10.1 10.1 0 0 0 4.68 1.16c5.46 0 9.9-4.34 9.9-9.68S17.5 2 12.04 2Zm0 17.86a8.4 8.4 0 0 1-4.28-1.18l-.3-.18-3.18.94.98-3.02-.2-.32a7.8 7.8 0 0 1-1.22-4.18c0-4.38 3.68-7.94 8.2-7.94s8.2 3.56 8.2 7.94-3.68 7.94-8.2 7.94Zm4.5-5.94c-.24-.12-1.44-.7-1.66-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.36-1.94-1.16-.72-.62-1.2-1.4-1.34-1.64-.14-.24-.02-.38.1-.5.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.28-.74-1.76-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.8-.84 1.96s.86 2.28.98 2.44c.12.16 1.7 2.52 4.12 3.54.58.24 1.02.38 1.38.5.58.18 1.1.16 1.52.1.46-.06 1.44-.58 1.64-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    ),
  },
  {
    label: "Instagram",
    href: socialUrls.instagram,
    icon: (
      <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7.25A4.75 4.75 0 1 1 7.25 12 4.76 4.76 0 0 1 12 7.25Zm0 2A2.75 2.75 0 1 0 14.75 12 2.75 2.75 0 0 0 12 9.25Zm5.15-2.05a1.15 1.15 0 1 1-1.15 1.15 1.15 1.15 0 0 1 1.15-1.15Z" />
    ),
  },
  {
    label: "Facebook",
    href: socialUrls.facebook,
    icon: (
      <path d="M14.1 8.18V6.7c0-.72.48-.9.82-.9h2.08V2.18L14.14 2.17c-3.18 0-3.9 2.38-3.9 3.9v2.1H7.73v3.73h2.5V22h3.87V11.9h2.88l.14-3.72H14.1Z" />
    ),
  },
];

export function FooterSection() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#020806] px-5 py-12 text-white sm:px-8 lg:px-10 lg:py-14">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_50%_0%,rgba(30,143,71,0.18),transparent_34%),radial-gradient(circle_at_86%_20%,rgba(212,175,55,0.09),transparent_30%),linear-gradient(145deg,#020806_0%,#06140D_54%,#020403_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-20 h-px bg-gradient-to-r from-transparent via-[#F8DDA0]/70 to-transparent" />
      <div className="absolute inset-x-8 top-px -z-20 h-px bg-gradient-to-r from-transparent via-[#1E8F47]/45 to-transparent" />
      <div className="absolute left-1/2 top-0 -z-20 h-40 w-[34rem] -translate-x-1/2 rounded-full bg-[#1E8F47]/11 blur-3xl" />
      <div className="absolute bottom-0 right-1/2 -z-20 size-64 translate-x-1/2 rounded-full bg-[#D4AF37]/7 blur-3xl" />

      <div className="mx-auto max-w-4xl">
        <div className="rounded-[1.75rem] border border-white/[0.1] bg-white/[0.035] px-5 py-8 text-center shadow-[0_28px_90px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[24px] sm:px-8 sm:py-10">
          <div className="inline-flex flex-col items-center">
            <span className="grid size-16 place-items-center overflow-hidden rounded-[1.35rem] border border-white/20 bg-white/92 shadow-[0_16px_44px_rgba(0,0,0,0.22),0_0_34px_rgba(212,175,55,0.1)]">
              <Image
                src={brand.logoSrc}
                alt="Logo de Rodriguez Garden Service"
                width={52}
                height={52}
                className="h-12 w-12 object-contain"
              />
            </span>

            <p className="mt-5 font-heading text-lg font-semibold tracking-[0.12em] text-white">
              RODRIGUEZ
            </p>
            <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              Garden Service
            </p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/58">
              Mantenimiento y transformación de espacios verdes.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {footerSocialLinks.map((social) => (
              <Link
                className="group grid size-12 place-items-center rounded-full border border-white/[0.11] bg-white/[0.045] text-white/72 shadow-[0_16px_38px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[18px] transition duration-500 hover:-translate-y-1 hover:border-[#D4AF37]/30 hover:bg-white/[0.085] hover:text-white hover:shadow-[0_20px_48px_rgba(0,0,0,0.24),0_0_26px_rgba(212,175,55,0.12)]"
                href={social.href}
                key={social.label}
                aria-label={social.label}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <svg
                  aria-hidden="true"
                  className="size-5 fill-current transition duration-500 group-hover:scale-105"
                  viewBox="0 0 24 24"
                >
                  {social.icon}
                </svg>
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-xl border-t border-white/[0.08] pt-5 text-center text-xs font-medium leading-6 text-white/42">
  <p>© 2026 Rodriguez Garden Service. Todos los derechos reservados.</p>

  <p className="mt-1 text-white/34">
    Transformando jardines, creando experiencias.
  </p>
</div>

<div className="mt-6 text-center">
  <Link
    href="/admin"
    className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/20 transition-all duration-500 hover:text-[#D4AF37]"
  >
    Operations Access

    <span className="translate-x-0 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
      →
    </span>
  </Link>
</div>
        
      </div>
      
    </footer>
  );
}
