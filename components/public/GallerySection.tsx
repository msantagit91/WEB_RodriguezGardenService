"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { galleryProjects } from "@/data/publicPage";

const AUTOPLAY_INTERVAL_MS = 6500;

type Motion = {
  x: number;
  y: number;
};

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [motion, setMotion] = useState<Motion>({ x: 0, y: 0 });

  const activeProject = galleryProjects[activeIndex];
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsPaused(false);
  };

  useEffect(() => {
    if (lightboxIndex !== null || isPaused) {
      return;
    }

    const autoplay = setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % galleryProjects.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(autoplay);
  }, [isPaused, lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const setProject = (nextIndex: number) => {
    if (nextIndex === activeIndex) {
      return;
    }

    setActiveIndex(nextIndex);
  };

  const moveGallery = (direction: 1 | -1) => {
    const total = galleryProjects.length;
    setProject((activeIndex + direction + total) % total);
  };

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

  const openLightbox = (index: number) => {
    setIsPaused(true);
    setLightboxIndex(index);
  };

  return (
    <section
      id="galeria"
      className={`relative isolate overflow-hidden bg-[#030806] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-24 ${
        lightboxIndex !== null ? "z-[70]" : "z-0"
      }`}
      onPointerLeave={resetMotion}
      onPointerMove={handlePointerMove}
    >
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_20%_12%,rgba(30,143,71,0.17),transparent_32%),radial-gradient(circle_at_82%_24%,rgba(212,175,55,0.1),transparent_30%),linear-gradient(145deg,#030806_0%,#07160C_54%,#020403_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-20 h-56 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.055),transparent_70%)]" />
      <div className="absolute -left-32 top-28 -z-20 size-[28rem] rounded-full bg-[#1E8F47]/12 blur-3xl" />
      <div className="absolute -right-32 bottom-10 -z-20 size-[30rem] rounded-full bg-[#D4AF37]/8 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
        <div className="relative z-20 max-w-xl">
          <p className="animate-[fadeUp_760ms_cubic-bezier(0.16,1,0.3,1)_both] inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.045] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/76 shadow-[0_18px_50px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[26px]">
            <span className="size-2 rounded-full bg-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.42)]" />
            Trabajos reales / Resultados visuales
          </p>
          <h2 className="animate-[fadeUp_860ms_cubic-bezier(0.16,1,0.3,1)_120ms_both] mt-5 font-heading text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-6xl">
            Nuestros proyectos
          </h2>
          <p className="animate-[fadeUp_860ms_cubic-bezier(0.16,1,0.3,1)_220ms_both] mt-4 text-base leading-8 text-white/66 sm:text-lg">
            Proyectos que transforman espacios verdes en experiencias visuales.
          </p>

          <div className="animate-[fadeUp_860ms_cubic-bezier(0.16,1,0.3,1)_320ms_both] mt-6 rounded-[1.25rem] border border-white/[0.09] bg-white/[0.045] p-4 shadow-[0_18px_48px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[24px]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              {activeProject.category} / {activeProject.location}
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold">
              {activeProject.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/58">
              {activeProject.description}
            </p>
          </div>

          <div className="animate-[fadeUp_860ms_cubic-bezier(0.16,1,0.3,1)_420ms_both] mt-5 flex items-center gap-3">
            <button
              className="grid size-11 place-items-center rounded-full border border-white/[0.11] bg-white/[0.045] text-lg text-white/76 shadow-[0_16px_42px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[26px] transition duration-500 hover:-translate-y-0.5 hover:bg-white/[0.075] hover:text-white"
              type="button"
              aria-label="Proyecto anterior"
              onClick={() => moveGallery(-1)}
            >
              &lsaquo;
            </button>
            <button
              className="grid size-11 place-items-center rounded-full border border-white/[0.11] bg-white/[0.045] text-lg text-white/76 shadow-[0_16px_42px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[26px] transition duration-500 hover:-translate-y-0.5 hover:bg-white/[0.075] hover:text-white"
              type="button"
              aria-label="Siguiente proyecto"
              onClick={() => moveGallery(1)}
            >
              &rsaquo;
            </button>
            <div className="ml-2 flex items-center gap-2">
              {galleryProjects.map((project, index) => (
                <button
                  className={`h-1.5 rounded-full transition-all duration-700 ${
                    activeIndex === index
                      ? "w-10 bg-[#D4AF37]"
                      : "w-2 bg-white/22 hover:bg-white/42"
                  }`}
                  key={project.title}
                  type="button"
                  aria-label={`Ir a ${project.title}`}
                  onClick={() => setProject(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="relative min-w-0 animate-[galleryFloatIn_1000ms_cubic-bezier(0.16,1,0.3,1)_260ms_both]"
          onPointerEnter={() => setIsPaused(true)}
          onPointerLeave={() => {
            setIsPaused(false);
            resetMotion();
          }}
          style={{
            transform: `translate3d(${motion.x * 9}px, ${motion.y * 7}px, 0)`,
          }}
        >
          <button
            className="group relative block w-full overflow-visible text-left"
            type="button"
            aria-label={`Abrir vista ampliada de ${activeProject.title}`}
            onClick={() => openLightbox(activeIndex)}
          >
            <span className="pointer-events-none absolute -inset-4 rounded-[2.2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.14),transparent_48%),radial-gradient(circle_at_20%_100%,rgba(30,143,71,0.18),transparent_46%)] blur-2xl transition duration-700 group-hover:opacity-90" />
            <span className="pointer-events-none absolute inset-x-12 -top-px z-20 h-px bg-gradient-to-r from-transparent via-[#F8DDA0]/72 to-transparent" />
            <span className="pointer-events-none absolute inset-x-16 -bottom-px z-20 h-px bg-gradient-to-r from-transparent via-[#1E8F47]/45 to-transparent" />

            <span className="relative block aspect-[4/3] overflow-hidden rounded-[1.65rem] border border-white/[0.09] bg-white/[0.025] shadow-[0_28px_85px_rgba(0,0,0,0.34),0_0_70px_rgba(30,143,71,0.1),0_0_60px_rgba(212,175,55,0.08),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[18px] sm:aspect-[16/11] lg:aspect-[16/10]">
              <Image
                key={activeProject.imageSrc}
                src={activeProject.imageSrc}
                alt={`Proyecto destacado: ${activeProject.title}`}
                fill
                sizes="(max-width: 1024px) 92vw, 58vw"
                className="animate-galleryImage object-cover"
                priority={activeIndex === 0}
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,6,0.02),rgba(3,8,6,0.12)_48%,rgba(3,8,6,0.42))]" />
              <span className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.09)_32%,transparent_48%)] opacity-50" />
              <span className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/38 to-transparent" />
            </span>
          </button>

          <div className="mt-4 grid grid-cols-6 gap-2 sm:mt-5 sm:gap-3">
            {galleryProjects.map((project, index) => (
              <button
                className={`relative aspect-[1.08] overflow-hidden rounded-[1rem] border p-[2px] transition duration-500 hover:-translate-y-0.5 ${
                  activeIndex === index
                    ? "border-[#D4AF37]/50 bg-[#D4AF37]/12 shadow-[0_12px_34px_rgba(212,175,55,0.14)]"
                    : "border-white/[0.1] bg-white/[0.035] opacity-72 hover:opacity-100"
                }`}
                key={project.title}
                type="button"
                aria-label={`Ver ${project.title}`}
                onClick={() => setProject(index)}
              >
                <span className="relative block h-full overflow-hidden rounded-[0.82rem]">
                  <Image
                    src={project.imageSrc}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 14vw, 9vw"
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-black/16" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/68 px-5 py-8 backdrop-blur-xl animate-[fadeUp_360ms_cubic-bezier(0.16,1,0.3,1)_both]"
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${galleryProjects[lightboxIndex].title}`}
          onClick={closeLightbox}
        >
          <button
            ref={closeButtonRef}
            className="fixed right-5 top-5 z-[100] grid size-12 place-items-center rounded-full border border-white/24 bg-black/38 text-2xl leading-none text-white shadow-[0_16px_50px_rgba(0,0,0,0.34)] backdrop-blur-[20px] transition hover:bg-white/[0.14]"
            type="button"
            aria-label="Cerrar galeria"
            data-testid="gallery-close"
            onClick={closeLightbox}
          >
            &times;
          </button>
          <div
            className="relative h-[74vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/[0.16] bg-white/[0.06] p-1.5 shadow-[0_40px_120px_rgba(0,0,0,0.5),0_0_90px_rgba(212,175,55,0.12)] backdrop-blur-[22px] animate-[fadeUp_420ms_cubic-bezier(0.16,1,0.3,1)_both]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-full overflow-hidden rounded-[1.65rem]">
              <Image
                src={galleryProjects[lightboxIndex].imageSrc}
                alt={`Vista ampliada: ${galleryProjects[lightboxIndex].title}`}
                fill
                sizes="100vw"
                className="animate-lightboxImage object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,18,11,0.04),rgba(7,18,11,0.52))]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.35rem] border border-white/[0.16] bg-black/26 p-5 text-white shadow-[0_18px_55px_rgba(0,0,0,0.32)] backdrop-blur-[18px]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                  {galleryProjects[lightboxIndex].category}
                </p>
                <h3 className="mt-1 font-heading text-2xl font-semibold">
                  {galleryProjects[lightboxIndex].title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
