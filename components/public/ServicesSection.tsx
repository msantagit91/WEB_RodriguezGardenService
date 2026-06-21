import { services } from "@/data/publicPage";

const accentStyles = {
  green: {
    orb: "bg-[#0B6B2E]",
    glow: "shadow-[0_0_28px_rgba(11,107,46,0.22)]",
    line: "from-[#0B6B2E]/0 via-[#0B6B2E]/36 to-[#0B6B2E]/0",
  },
  orange: {
    orb: "bg-[#F39C12]",
    glow: "shadow-[0_0_28px_rgba(243,156,18,0.2)]",
    line: "from-[#F39C12]/0 via-[#F39C12]/40 to-[#F39C12]/0",
  },
  lime: {
    orb: "bg-[#63B32E]",
    glow: "shadow-[0_0_28px_rgba(99,179,46,0.22)]",
    line: "from-[#63B32E]/0 via-[#63B32E]/38 to-[#63B32E]/0",
  },
};

type AccentKey = keyof typeof accentStyles;

export function ServicesSection() {
  return (
    <section
      id="servicios"
      className="relative isolate overflow-hidden bg-[#F8FAF7] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="absolute -left-28 top-20 -z-10 size-80 rounded-full bg-[#0B6B2E]/10 blur-3xl" />
      <div className="absolute -right-28 bottom-10 -z-10 size-96 rounded-full bg-[#F39C12]/10 blur-3xl" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#0B6B2E]/16 to-transparent" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/62 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0B6B2E] shadow-[0_12px_34px_rgba(31,41,55,0.08)] backdrop-blur-xl">
            <span className="size-2 rounded-full bg-[#F39C12] shadow-[0_0_16px_rgba(243,156,18,0.55)]" />
            Servicios especializados
          </p>
          <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-[#1F2937] sm:text-4xl lg:text-5xl">
            Capacidades profesionales para espacios verdes exigentes.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#1F2937]/68">
            Una selección clara de servicios para mantener, renovar y proteger
            jardines residenciales y zonas verdes comerciales.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {services.map((service, index) => {
            const accent = accentStyles[service.accent as AccentKey];
            const serviceNumber = String(index + 1).padStart(2, "0");

            return (
              <article
                className="group relative min-h-[13.5rem] overflow-hidden rounded-[1.75rem] border border-white/72 bg-white/56 p-5 shadow-[0_18px_50px_rgba(31,41,55,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-white/90 hover:bg-white/72 hover:shadow-[0_28px_70px_rgba(31,41,55,0.13),inset_0_1px_0_rgba(255,255,255,0.92)] sm:p-6"
                key={service.title}
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
                <div
                  className={`pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r opacity-70 transition duration-500 group-hover:opacity-100 ${accent.line}`}
                />
                <div className="pointer-events-none absolute -right-14 -top-14 size-32 rounded-full bg-white/38 blur-2xl transition duration-500 group-hover:bg-white/58" />

                <div className="relative flex items-start justify-between gap-5">
                  <span className="font-heading text-sm font-semibold tracking-[0.2em] text-[#1F2937]/34">
                    {serviceNumber}
                  </span>
                  <span
                    className={`grid size-10 place-items-center rounded-2xl border border-white/70 bg-white/72 ${accent.glow}`}
                  >
                    <span className={`size-2.5 rounded-full ${accent.orb}`} />
                  </span>
                </div>

                <div className="relative mt-8">
                  <h3 className="max-w-[18rem] font-heading text-xl font-semibold leading-snug text-[#1F2937]">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#1F2937]/64">
                    {service.description}
                  </p>
                </div>

                <div className="relative mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#0B6B2E]/72">
                  <span className="h-px w-8 bg-[#0B6B2E]/24 transition-all duration-500 group-hover:w-12 group-hover:bg-[#F39C12]/45" />
                  Servicio premium
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
