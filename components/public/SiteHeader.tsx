"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { brand, navigationItems } from "@/data/publicPage";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [hoverNavIndex, setHoverNavIndex] = useState<number | null>(null);
  const headerBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    index?: number,
  ) => {
    if (!href.startsWith("#")) {
      return;
    }

    const target = document.querySelector<HTMLElement>(href);

    if (!target) {
      return;
    }

    event.preventDefault();

    const headerBottom =
      headerBarRef.current?.getBoundingClientRect().bottom ?? 92;
    const subtleGap = window.matchMedia("(max-width: 640px)").matches ? 10 : 14;
    const targetTop =
      href === "#inicio"
        ? 0
        : target.getBoundingClientRect().top + window.scrollY - headerBottom - subtleGap;

    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    window.history.pushState(null, "", href);
    setIsMenuOpen(false);

    if (typeof index === "number") {
      setActiveNavIndex(index);
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-3 transition-all duration-500 sm:px-5 ${
        isScrolled ? "pt-2" : "pt-4"
      }`}
    >
      <div
        ref={headerBarRef}
        className={`relative mx-auto flex w-full max-w-7xl items-center justify-between overflow-hidden rounded-[1.75rem] border px-4 transition-all duration-500 sm:px-5 lg:px-6 ${
          isScrolled
            ? "h-[4.15rem] border-white/82 bg-white/76 shadow-[0_24px_80px_rgba(31,41,55,0.17),0_0_50px_rgba(11,107,46,0.08),inset_0_0_0_1px_rgba(243,156,18,0.08)] backdrop-blur-2xl"
            : "h-[4.85rem] border-white/64 bg-white/36 shadow-[0_20px_70px_rgba(31,41,55,0.11),0_0_44px_rgba(11,107,46,0.08),inset_0_0_0_1px_rgba(243,156,18,0.07)] backdrop-blur-2xl"
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
          onClick={(event) => handleAnchorNavigation(event, "#inicio", 0)}
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
                onClick={(event) =>
                  handleAnchorNavigation(event, item.href, index)
                }
                onMouseEnter={() => setHoverNavIndex(index)}
              >
                {item.label}
              </Link>
            ))}
        </nav>

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
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden px-2">
          <nav
            className={`relative mx-auto mb-4 mt-2 max-w-md overflow-hidden rounded-[1.65rem] border border-white/[0.13] bg-[#06120D]/72 p-2.5 font-heading shadow-[0_26px_80px_rgba(0,0,0,0.34),0_0_46px_rgba(30,143,71,0.12),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[28px] transition duration-500 sm:mx-1 ${
              isMenuOpen
                ? "animate-mobileMenuIn"
                : "translate-y-[-8px] scale-[0.98] blur-sm"
            }`}
            aria-label="Navegación móvil"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(212,175,55,0.13),transparent_38%),radial-gradient(circle_at_92%_18%,rgba(30,143,71,0.18),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.018))]" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#F8DDA0]/58 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#1E8F47]/44 to-transparent" />
            <div className="pointer-events-none absolute -left-10 top-6 size-28 rounded-full bg-[#1E8F47]/16 blur-2xl" />
            <div className="pointer-events-none absolute -right-10 bottom-2 size-24 rounded-full bg-[#D4AF37]/11 blur-2xl" />

            <div className="relative z-10 grid gap-1">
            {navigationItems.map((item, index) => (
              <Link
                className={`group relative overflow-hidden rounded-[1.15rem] border px-4 py-3.5 text-sm font-semibold tracking-[0.01em] transition duration-500 hover:translate-x-1 hover:border-white/[0.16] hover:bg-white/[0.075] hover:text-white hover:shadow-[0_14px_34px_rgba(0,0,0,0.18),0_0_26px_rgba(212,175,55,0.08)] ${
                  index === activeNavIndex
                    ? "border-white/[0.14] bg-white/[0.075] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "border-transparent text-white/72"
                }`}
                href={item.href}
                key={item.href}
                onClick={(event) =>
                  handleAnchorNavigation(event, item.href, index)
                }
              >
                <span className="absolute inset-y-2 left-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/0 to-transparent transition duration-500 group-hover:via-[#D4AF37]/65" />
                <span className="absolute inset-0 bg-gradient-to-r from-white/[0.06] via-transparent to-[#D4AF37]/[0.045] opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="relative flex items-center justify-between">
                  <span>{item.label}</span>
                  <span
                    className={`size-1.5 rounded-full transition duration-500 ${
                      index === activeNavIndex
                        ? "bg-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.45)]"
                        : "bg-white/18 group-hover:bg-[#A7E164] group-hover:shadow-[0_0_16px_rgba(167,225,100,0.32)]"
                    }`}
                  />
                </span>
              </Link>
            ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
