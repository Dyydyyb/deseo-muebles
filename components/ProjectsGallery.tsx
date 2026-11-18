"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowRight, Expand } from "lucide-react";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  type ProjectCategory,
  type ProjectItem,
} from "@/lib/projects";
import type { ServiceId } from "@/lib/config";

interface ProjectsGalleryProps {
  onSelectService: (serviceId: ServiceId) => void;
}

export function ProjectsGallery({ onSelectService }: ProjectsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("Todos");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects =
    activeCategory === "Todos"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: filteredProjects.length > 2,
      align: "start",
      dragFree: false,
    },
    shouldReduceMotion
      ? []
      : [Autoplay({ delay: 4500, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, activeCategory]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0);
    }
  }, [activeCategory, emblaApi]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!lightboxProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxProject(null);
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const navigateLightbox = (dir: number) => {
    if (!lightboxProject) return;
    const currentIdx = filteredProjects.findIndex((p) => p.id === lightboxProject.id);
    if (currentIdx === -1) return;
    const nextIdx = (currentIdx + dir + filteredProjects.length) % filteredProjects.length;
    setLightboxProject(filteredProjects[nextIdx]);
  };

  return (
    <section id="trabajos" className="py-10 sm:py-16 lg:py-20 bg-brand-taupe/55">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-7 sm:mb-10">
          <div>
            <h2
              className="font-serif font-bold text-brand-charcoal leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)" }}
            >
              Proyectos reales en hogares y locales
            </h2>
          </div>

          {/* Desktop arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Trabajo anterior"
              className="w-11 h-11 rounded-full border border-brand-charcoal/20 bg-white hover:border-brand-red hover:text-brand-red text-brand-charcoal flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Siguiente trabajo"
              className="w-11 h-11 rounded-full border border-brand-charcoal/20 bg-white hover:border-brand-red hover:text-brand-red text-brand-charcoal flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 sm:mb-8"
          role="tablist"
          aria-label="Filtrar trabajos por categoría"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 min-h-[44px] rounded-full font-display text-xs font-semibold uppercase tracking-[0.08em] whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-brand-warmGray bg-white/80 hover:bg-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeProjectFilter"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-brand-red"
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Carousel */}
        <div className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6 py-4">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const isDimmed = hoveredId !== null && hoveredId !== project.id;
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: isDimmed ? 0.65 : 1, scale: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="flex-[0_0_76%] sm:flex-[0_0_56%] md:flex-[0_0_46%] lg:flex-[0_0_32%] min-w-0"
                  >
                    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-editorial transition-all duration-300 md:hover:-translate-y-3 md:hover:scale-[1.03] md:hover:shadow-editorialHover">
                      <button
                        type="button"
                        onClick={() => setLightboxProject(project)}
                        aria-label={`Ampliar foto: ${project.title}`}
                        className="relative block w-full aspect-[4/3] overflow-hidden bg-brand-taupe text-left"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 76vw, (max-width: 1024px) 48vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Dark gradient overlay for readability */}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/85 via-brand-charcoal/25 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                          aria-hidden="true"
                        />
                        <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-brand-charcoal/65 text-white flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <Expand className="w-4 h-4" strokeWidth={1.75} />
                        </span>

                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                          <span className="inline-block font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-taupe mb-1">
                            {project.category}
                          </span>
                          <h3 className="font-serif font-bold text-lg sm:text-xl leading-snug text-white">
                            {project.title}
                          </h3>
                        </div>
                      </button>

                      <div className="p-4 flex items-center justify-between gap-3 border-t border-brand-taupe/70">
                        <p className="text-xs sm:text-sm text-brand-warmGray line-clamp-1">
                          {project.description}
                        </p>
                        <a
                          href="#cotizar"
                          onClick={() => onSelectService(project.serviceId)}
                          className="shrink-0 inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-[0.08em] text-brand-red hover:text-brand-redHover min-h-[44px] px-2"
                        >
                          <span>Quiero algo así</span>
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                        </a>
                      </div>
                    </article>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Animated Pagination Dots */}
        {scrollSnaps.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {scrollSnaps.map((_, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(idx)}
                  aria-label={`Ir al grupo de trabajos ${idx + 1}`}
                  className="p-2 min-w-[32px] min-h-[32px] flex items-center justify-center"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      active ? "w-7 bg-brand-red" : "w-2 bg-brand-warmGray/35"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-charcoal/90 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={lightboxProject.title}
            onClick={() => setLightboxProject(null)}
          >
            <motion.div
              initial={shouldReduceMotion ? {} : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={shouldReduceMotion ? {} : { scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-brand-cream rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setLightboxProject(null)}
                aria-label="Cerrar vista ampliada"
                className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-brand-charcoal/80 text-white hover:bg-brand-red flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full bg-brand-charcoal">
                <Image
                  src={lightboxProject.image}
                  alt={lightboxProject.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain"
                />

                <button
                  type="button"
                  onClick={() => navigateLightbox(-1)}
                  aria-label="Foto anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-charcoal/75 text-white hover:bg-brand-red flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateLightbox(1)}
                  aria-label="Siguiente foto"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-charcoal/75 text-white hover:bg-brand-red flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-brand-red">
                    {lightboxProject.category}
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-brand-charcoal mt-0.5">
                    {lightboxProject.title}
                  </h3>
                  <p className="text-sm text-brand-warmGray mt-1">
                    {lightboxProject.description}
                  </p>
                </div>

                <a
                  href="#cotizar"
                  onClick={() => {
                    onSelectService(lightboxProject.serviceId);
                    setLightboxProject(null);
                  }}
                  className="shrink-0 inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-redHover text-white font-display text-xs font-semibold uppercase tracking-[0.1em] px-5 py-3 min-h-[44px] rounded-xl transition-colors"
                >
                  <span>Quiero algo así</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
