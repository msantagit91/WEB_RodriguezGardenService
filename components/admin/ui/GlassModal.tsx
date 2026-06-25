"use client";

import { ReactNode } from "react";

type GlassModalProps = {
  abierto: boolean;
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
  onCerrar: () => void;
  ancho?: "normal" | "grande";
};

export default function GlassModal({
  abierto,
  titulo,
  subtitulo,
  children,
  onCerrar,
  ancho = "normal",
}: GlassModalProps) {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div
        onClick={onCerrar}
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-[modalBackdrop_350ms_ease-out_forwards]"
      />

      <section className="relative max-h-[92vh] w-full max-w-md overflow-hidden rounded-[34px] border border-white/10 bg-[#020604]/75 p-[1px] shadow-[0_0_90px_rgba(0,0,0,.75)] backdrop-blur-3xl opacity-0 scale-95 translate-y-6 animate-[modalShow_350ms_ease-out_forwards]">
        <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,rgba(214,168,91,0.35)_70deg,transparent_130deg,transparent_360deg)] opacity-40 animate-[glassBorder_5s_linear_infinite]" />

        <div className="relative max-h-[92vh] overflow-y-auto rounded-[33px] border border-white/10 bg-[#020604]/80 p-6 backdrop-blur-3xl">
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#d6a85b]/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#f0c779]/50 to-transparent" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d6a85b]">
                JARDIN ADMIN
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                {titulo}
              </h2>

              {subtitulo && (
                <p className="mt-2 text-sm text-white/45">{subtitulo}</p>
              )}
            </div>

            <button
              onClick={onCerrar}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/70 transition duration-300 hover:border-[#d6a85b]/40 hover:bg-[#d6a85b]/10 hover:text-[#f0c779]"
            >
              ✕
            </button>
          </div>

          <div className="relative mt-8">{children}</div>
        </div>
      </section>
    </div>
  );
}