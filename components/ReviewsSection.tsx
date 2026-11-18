"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { INSTAGRAM_REVIEWS, SITE_CONFIG } from "@/lib/config";

export function ReviewsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    shouldReduceMotion
      ? []
      : [Autoplay({ delay: 4200, stopOnInteraction: true, stopOnMouseEnter: true })]
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
  }, [emblaApi, onSelect]);

  return (
    <section id="opiniones" className="py-10 sm:py-16 lg:py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7 sm:mb-10">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-red mb-2 inline-flex items-center gap-2">
              <Instagram className="w-3.5 h-3.5" />
              <span>Comentarios reales de nuestros clientes en Instagram</span>
            </p>
            <h2
              className="font-serif font-bold text-brand-charcoal leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)" }}
            >
              Lo que dicen quienes ya renovaron su espacio
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 mr-2">
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                aria-label="Reseña anterior"
                className="w-11 h-11 rounded-full border border-brand-charcoal/20 bg-white hover:border-brand-red hover:text-brand-red text-brand-charcoal flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                aria-label="Siguiente reseña"
                className="w-11 h-11 rounded-full border border-brand-charcoal/20 bg-white hover:border-brand-red hover:text-brand-red text-brand-charcoal flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-brand-charcoal/25 hover:border-brand-red hover:text-brand-red text-brand-charcoal font-display text-xs font-semibold uppercase tracking-[0.1em] px-4 py-2.5 min-h-[44px] rounded-xl bg-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>Ver más en Instagram</span>
            </a>
          </div>
        </div>

        {/* Embla Slider */}
        <div className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6 py-2">
            {INSTAGRAM_REVIEWS.map((review, idx) => {
              const initial = review.handle.replace("@", "").charAt(0).toUpperCase();
              const isActive = idx === selectedIndex;
              return (
                <div
                  key={review.handle}
                  className="flex-[0_0_80%] sm:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0"
                >
                  <motion.article
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : idx * 0.05 }}
                    className={`h-full bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between ${
                      isActive
                        ? "border-brand-wood shadow-editorial md:-translate-y-1"
                        : "border-brand-taupe shadow-sm"
                    }`}
                  >
                    <p className="font-serif text-lg sm:text-xl text-brand-charcoal leading-relaxed mb-5">
                      “{review.text}”
                    </p>

                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-brand-taupe/70">
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className="w-9 h-9 rounded-full bg-brand-red text-white font-display font-bold text-sm flex items-center justify-center shrink-0"
                          aria-hidden="true"
                        >
                          {initial}
                        </span>
                        <span className="font-display text-xs font-semibold text-brand-charcoal truncate">
                          {review.handle}
                        </span>
                      </div>
                      <Instagram className="w-4 h-4 text-brand-warmGray shrink-0" aria-hidden="true" />
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>

        {/* Animated Pagination Dots */}
        {scrollSnaps.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {scrollSnaps.map((_, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(idx)}
                  aria-label={`Ver opinión ${idx + 1}`}
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
    </section>
  );
}
