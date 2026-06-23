"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { services } from "@/data/publicPage";

const accentStyles = {
  green: {
    orb: "bg-[#1E8F47]",
    glow: "rgba(30,143,71,0.34)",
    line: "from-[#1E8F47]/0 via-[#1E8F47]/42 to-[#1E8F47]/0",
  },
  orange: {
    orb: "bg-[#D4AF37]",
    glow: "rgba(212,175,55,0.3)",
    line: "from-[#D4AF37]/0 via-[#D4AF37]/44 to-[#D4AF37]/0",
  },
  lime: {
    orb: "bg-[#1E8F47]",
    glow: "rgba(30,143,71,0.28)",
    line: "from-[#1E8F47]/0 via-[#D4AF37]/36 to-[#1E8F47]/0",
  },
};

type AccentKey = keyof typeof accentStyles;

type TiltState = {
  index: number;
  rotateX: number;
  rotateY: number;
};

export function ServicesSection() {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [tilt, setTilt] = useState<TiltState | null>(null);
  const flipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (flipTimer.current) {
        clearTimeout(flipTimer.current);
      }
    };
  }, []);

  const handleCardActivation = (index: number) => {
    if (flipTimer.current) {
      clearTimeout(flipTimer.current);
    }

    setActiveCardIndex(index);
    flipTimer.current = setTimeout(() => {
      setActiveCardIndex(null);
    }, 5000);
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.pointerType === "touch") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      index,
      rotateX: y * -5,
      rotateY: x * 6,
    });
  };

  const handlePointerLeave = () => setTilt(null);

  return (
    <section
      id="servicios"
      className="relative isolate overflow-hidden bg-[#07120B] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <Image
        src="/gallery/hero-garden-service.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-30 object-cover opacity-26 blur-[2px] scale-105"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(5,18,9,0.86),rgba(5,18,9,0.78)_42%,rgba(5,18,9,0.92))]" />
      <div className="absolute -left-36 top-24 -z-10 size-[28rem] rounded-full bg-[#1E8F47]/22 blur-3xl" />
      <div className="absolute -right-36 bottom-16 -z-10 size-[30rem] rounded-full bg-[#D4AF37]/14 blur-3xl" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/82 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-[20px]">
            <span className="size-2 rounded-full bg-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.42)]" />
            Servicios especializados
          </p>
          <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Capacidades profesionales para espacios verdes exigentes.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">
            Servicios diseñados para conservar, renovar y proteger áreas verdes
            con precisión, presencia y una experiencia visual de alto nivel.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {services.map((service, index) => {
            const accent = accentStyles[service.accent as AccentKey];
            const serviceNumber = String(index + 1).padStart(2, "0");
            const isActive = activeCardIndex === index;
            const currentTilt = tilt?.index === index ? tilt : null;

            const transform = isActive
              ? "rotateY(180deg)"
              : currentTilt
                ? `rotateX(${currentTilt.rotateX}deg) rotateY(${currentTilt.rotateY}deg) scale(1.03) translateY(-12px)`
                : "rotateX(0deg) rotateY(0deg) scale(1) translateY(0)";

            return (
              <button
                className="group block min-h-[18rem] w-full cursor-pointer rounded-[2rem] text-left outline-none [perspective:1400px] focus-visible:ring-4 focus-visible:ring-[#D4AF37]/24 sm:min-h-[19rem]"
                key={service.title}
                type="button"
                aria-label={`Ver imagen de ${service.title}`}
                aria-pressed={isActive}
                onClick={() => handleCardActivation(index)}
                onPointerMove={(event) => handlePointerMove(event, index)}
                onPointerLeave={handlePointerLeave}
              >
                <span
                  className="relative block h-full min-h-[18rem] rounded-[2rem] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] sm:min-h-[19rem]"
                  style={{ transform }}
                >
                  <span className="absolute inset-0 rounded-[2rem] [backface-visibility:hidden]">
                    <span
                      className="relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-[2rem] border border-white/[0.15] bg-white/[0.06] p-5 text-white shadow-[0_18px_34px_rgba(0,0,0,0.18),0_34px_90px_rgba(0,0,0,0.26),0_0_54px_var(--service-glow),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(212,175,55,0.1)] backdrop-blur-[20px] transition duration-[800ms] group-hover:border-white/28 group-hover:shadow-[0_22px_42px_rgba(0,0,0,0.2),0_42px_110px_rgba(0,0,0,0.34),0_0_74px_var(--service-glow),inset_0_1px_0_rgba(255,255,255,0.24),inset_0_-1px_0_rgba(212,175,55,0.16)] sm:min-h-[19rem] sm:p-6"
                      style={
                        {
                          "--service-glow": accent.glow,
                        } as React.CSSProperties
                      }
                    >
                      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/46 to-transparent" />
                      <span className="pointer-events-none absolute left-0 top-8 h-28 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/24 to-transparent" />
                      <span className="pointer-events-none absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/24 to-transparent" />
                      <span
                        className={`pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r opacity-70 transition duration-700 group-hover:opacity-100 ${accent.line}`}
                      />
                      <span className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-white/[0.07] blur-3xl transition duration-700 group-hover:bg-white/[0.1]" />
                      <span className="pointer-events-none absolute -left-24 bottom-0 size-44 rounded-full bg-[#1E8F47]/12 blur-3xl" />

                      <span className="relative flex items-start justify-between gap-5">
                        <span className="font-heading text-sm font-semibold tracking-[0.24em] text-white/42">
                          {serviceNumber}
                        </span>
                        <span className="grid size-11 place-items-center rounded-2xl border border-white/[0.15] bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                          <span
                            className={`size-2.5 rounded-full ${accent.orb}`}
                          />
                        </span>
                      </span>

                      <span className="relative mt-auto block">
                        <span className="block max-w-[19rem] font-heading text-xl font-semibold leading-snug text-white">
                          {service.title}
                        </span>
                        <span className="mt-4 block text-sm leading-7 text-white/70">
                          {service.description}
                        </span>
                      </span>

                      <span className="relative mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/58">
                        <span className="h-px w-8 bg-white/20 transition-all duration-700 group-hover:w-12 group-hover:bg-[#D4AF37]/48" />
                        Servicio especializado
                      </span>
                    </span>
                  </span>

                  <span className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/[0.16] bg-[#0B6B35]/18 shadow-[0_22px_42px_rgba(0,0,0,0.22),0_42px_110px_rgba(0,0,0,0.35)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <Image
                      src={service.imageSrc}
                      alt={`Imagen temporal de ${service.title}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`object-cover ${isActive ? "animate-serviceImageZoom" : ""}`}
                    />
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,107,53,0.08),rgba(2,10,5,0.74))]" />
                    <span className="absolute inset-x-6 top-5 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                    <span className="absolute bottom-5 left-5 right-5 rounded-[1.45rem] border border-white/20 bg-black/26 p-4 text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-[18px]">
                      <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                        Vista del servicio
                      </span>
                      <span className="mt-1 block font-heading text-lg font-semibold leading-snug">
                        {service.title}
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
