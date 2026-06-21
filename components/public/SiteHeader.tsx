"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { brand, navigationItems } from "@/data/publicPage";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [hoverNavIndex, setHoverNavIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-3 transition-all duration-500 sm:px-5 ${
        isScrolled ? "pt-2" : "pt-4"
      }`}
    >
      <div
        className={`relative mx-auto flex w-full max-w-7xl items-center justify-between overflow-hidden rounded-[1.75rem] border px-4 transition-all duration-500 sm:px-5 lg:px-6 ${
          isScrolled
            ? "h-[4.15rem] border-white/80 bg-white/78 shadow-[0_22px_70px_rgba(31,41,55,0.16),inset_0_0_0_1px_rgba(243,156,18,0.08)] backdrop-blur-2xl"
            : "h-[4.85rem] border-white/60 bg-white/34 shadow-[0_18px_60px_rgba(31,41,55,0.1),inset_0_0_0_1px_rgba(243,156,18,0.07)] backdrop-blur-xl"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#F39C12]/24 to-transparent" />
        <div className="pointer-events-none absolute -left-16 top-1/2 size-36 -translate-y-1/2 rounded-full bg-[#63B32E]/16 blur-2xl" />
        <div className="pointer-events-none absolute -right-8 top-3 h-20 w-24 rounded-full bg-[#F39C12]/8 blur-2xl" />

        <Link
          className="group relative flex min-w-0 items-center gap-3"
          href="#inicio"
          aria-label="Ir al inicio"
          onClick={() => setIsMenuOpen(false)}
        >
          <span
            className={`grid shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/75 bg-white shadow-[0_14px_40px_rgba(11,107,46,0.2)] transition duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_20px_52px_rgba(243,156,18,0.25)] ${
              isScrolled ? "size-11" : "size-12"
            }`}
          >
            <Image
              src={brand.logoSrc}
              alt="Logo de Rodriguez Garden Service"
              width={44}
              height={44}
              className="h-10 w-10 object-contain"
            />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-heading text-[0.86rem] font-semibold tracking-[0.08em] text-[#0B6B2E] sm:text-[0.95rem]">
              RODRIGUEZ
            </span>
            <span className="truncate text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#F39C12]">
              Garden Service
            </span>
          </span>
        </Link>

        <nav
          className="relative hidden w-[34rem] grid-cols-5 rounded-full border border-white/85 bg-white/38 p-1 text-sm font-semibold text-[#1F2937]/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.88),inset_0_-1px_0_rgba(11,107,46,0.08),0_16px_42px_rgba(31,41,55,0.09)] backdrop-blur-2xl lg:grid"
          onMouseLeave={() => setHoverNavIndex(null)}
        >
          <span
            className="pointer-events-none absolute bottom-1 top-1 rounded-full border border-white/95 bg-white/82 shadow-[0_14px_36px_rgba(31,41,55,0.13),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(243,156,18,0.16),inset_1px_0_0_rgba(243,156,18,0.08)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              left: "0.25rem",
              width: "calc((100% - 0.5rem) / 5)",
              transform: `translateX(${(hoverNavIndex ?? activeNavIndex) * 100}%)`,
            }}
          />
          <span
            className="pointer-events-none absolute bottom-1 left-1 h-8 rounded-full border-r border-[#F39C12]/20 bg-white/8 blur-[1px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: "calc((100% - 0.5rem) / 5)",
              transform: `translateX(${(hoverNavIndex ?? activeNavIndex) * 100}%)`,
            }}
          />
          {navigationItems.map((item, index) => (
              <Link
                className={`relative z-10 flex h-10 items-center justify-center rounded-full px-3 transition duration-300 hover:-translate-y-px hover:text-[#0B6B2E] ${
                  index === activeNavIndex
                    ? "text-[#064A20]"
                    : "text-[#1F2937]/88"
                }`}
                href={item.href}
                key={item.href}
                onClick={() => setActiveNavIndex(index)}
                onMouseEnter={() => setHoverNavIndex(index)}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="relative hidden items-center gap-3 lg:flex">
          <Link
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-[#0B6B2E] px-5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(11,107,46,0.32),0_0_0_1px_rgba(255,255,255,0.35)_inset] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_rgba(11,107,46,0.34),0_12px_40px_rgba(243,156,18,0.22)]"
            href={brand.quoteHref}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#0B6B2E] via-[#11883D] to-[#F39C12] opacity-0 transition duration-500 group-hover:opacity-100" />
            <span className="absolute -left-8 top-0 h-full w-8 skew-x-[-18deg] bg-white/26 opacity-0 blur-sm transition duration-700 group-hover:left-[115%] group-hover:opacity-100" />
            <span className="relative">Solicitar Cotización</span>
          </Link>
        </div>

        <button
          className="relative inline-flex size-11 items-center justify-center rounded-full border border-white/70 bg-white/62 text-[#0B6B2E] shadow-[0_12px_30px_rgba(31,41,55,0.1)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white lg:hidden"
          type="button"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition ${
                isMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition ${
                isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`grid transition-all duration-300 lg:hidden ${
          isMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="mx-2 mb-4 mt-2 rounded-[1.75rem] border border-white/70 bg-white/88 p-3 shadow-[0_22px_60px_rgba(31,41,55,0.16)] backdrop-blur-2xl sm:mx-3">
            {navigationItems.map((item) => (
              <Link
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-[#1F2937]/76 transition hover:bg-[#F39C12]/10 hover:text-[#0B6B2E]"
                href={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="mt-2 flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#0B6B2E] to-[#F39C12] px-5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(243,156,18,0.2)]"
              href={brand.quoteHref}
              onClick={() => setIsMenuOpen(false)}
            >
              Solicitar Cotización
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
