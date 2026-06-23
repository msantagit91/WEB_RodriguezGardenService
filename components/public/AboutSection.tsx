import { ScrollReveal } from "@/components/public/ScrollReveal";

const trustCards = [
  {
    title: "Calidad",
    description: "Acabados limpios, consistentes y pensados para durar.",
  },
  {
    title: "Experiencia",
    description: "Criterio profesional para cuidar cada detalle exterior.",
  },
  {
    title: "Compromiso",
    description: "Trabajo responsable, puntual y enfocado en resultados.",
  },
  {
    title: "Atención Personalizada",
    description: "Trato cercano y soluciones ajustadas a cada espacio.",
  },
];

export function AboutSection() {
  return (
    <section
      id="nosotros"
      className="relative isolate overflow-hidden bg-[#06100A] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_18%_12%,rgba(30,143,71,0.13),transparent_32%),radial-gradient(circle_at_84%_24%,rgba(212,175,55,0.085),transparent_28%),linear-gradient(180deg,#040906_0%,#07150C_44%,#07120B_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-20 h-28 bg-gradient-to-b from-[#040906] to-transparent" />
      <div className="absolute -left-40 top-20 -z-20 size-[34rem] rounded-full bg-[#1E8F47]/12 blur-3xl" />
      <div className="absolute -right-40 bottom-10 -z-20 size-[32rem] rounded-full bg-[#D4AF37]/8 blur-3xl" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/78 shadow-[0_18px_50px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[30px]">
              <span className="size-2 rounded-full bg-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.38)]" />
              Nosotros
            </p>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <h2 className="mx-auto mt-6 max-w-4xl font-heading text-4xl font-semibold leading-[1.04] text-white sm:text-5xl lg:text-6xl">
              Transformamos espacios exteriores con pasión y precisión.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/66 sm:text-lg">
              Somos un equipo enfocado en mantener, renovar y elevar espacios
              verdes con trato cercano, criterio profesional y atencion al
              detalle.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={320}>
          <div className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-[2rem] border border-white/[0.11] bg-[linear-gradient(145deg,rgba(255,255,255,0.044),rgba(255,255,255,0.018))] px-5 py-7 text-center shadow-[0_22px_70px_rgba(0,0,0,0.24),0_0_58px_rgba(30,143,71,0.055),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[32px] sm:px-8 sm:py-8">
            <span className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <span className="pointer-events-none absolute -right-20 -top-20 size-52 rounded-full bg-[#D4AF37]/7 blur-3xl" />
            <span className="pointer-events-none absolute -left-20 bottom-0 size-48 rounded-full bg-[#1E8F47]/8 blur-3xl" />
            <p className="relative mx-auto max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              Cada proyecto se trabaja con orden, comunicacion clara y una
              mirada enfocada en conservar la belleza natural del espacio sin
              perder funcionalidad.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustCards.map((card, index) => (
            <ScrollReveal delay={420 + index * 80} key={card.title}>
              <div className="group h-full rounded-[1.45rem] border border-white/[0.11] bg-[linear-gradient(145deg,rgba(255,255,255,0.052),rgba(255,255,255,0.024))] p-5 text-center shadow-[0_18px_54px_rgba(0,0,0,0.2),0_0_42px_rgba(30,143,71,0.055),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[30px] transition duration-700 hover:-translate-y-1 hover:border-white/[0.18] hover:bg-white/[0.06]">
                <span className="mx-auto grid size-11 place-items-center rounded-2xl border border-white/[0.12] bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  <span className="size-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.28)]" />
                </span>
                <div className="mt-5">
                  <span className="block font-heading text-lg font-semibold text-white">
                    {card.title}
                  </span>
                  <span className="mx-auto mt-2 block max-w-56 text-sm leading-6 text-white/62">
                    {card.description}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
