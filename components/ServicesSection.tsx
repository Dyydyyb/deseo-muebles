"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChefHat, Shirt, Sofa, Store, Layers, ArrowRight } from "lucide-react";
import { SERVICES, type ServiceId } from "@/lib/config";

const ICON_MAP = {
  chefHat: ChefHat,
  shirt: Shirt,
  sofa: Sofa,
  store: Store,
  layers: Layers,
};

interface ServicesSectionProps {
  onSelectService: (serviceId: ServiceId) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="servicios" className="py-10 sm:py-16 lg:py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-7 sm:mb-12"
        >
          <h2
            className="font-serif font-bold text-brand-charcoal leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)" }}
          >
            Soluciones integrales en carpintería y marmolería
          </h2>
        </motion.div>

        {/* Mobile: horizontal scroll-snap (~76% width cards). Desktop: 5-col / responsive grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-3 no-scrollbar md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-5 md:mx-0 md:px-0 md:pb-0 md:overflow-visible">
          {SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.iconName];
            return (
              <motion.article
                key={service.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : index * 0.06 }}
                className="w-[76vw] sm:w-[48vw] md:w-auto shrink-0 snap-start bg-white rounded-2xl overflow-hidden border border-brand-taupe shadow-editorial hover:shadow-editorialHover transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-brand-taupe">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 76vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/50 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-brand-cream/95 text-brand-red flex items-center justify-center shadow-sm">
                      <Icon className="w-4 h-4" strokeWidth={1.8} />
                    </span>
                  </div>

                  {/* Animated red line on hover */}
                  <div className="h-[2px] w-0 group-hover:w-full bg-brand-red transition-all duration-300" />

                  <div className="p-4 sm:p-5">
                    <h3 className="font-serif font-bold text-xl text-brand-charcoal leading-snug mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-sm text-brand-warmGray leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1">
                  <a
                    href="#cotizar"
                    onClick={() => onSelectService(service.id)}
                    className="w-full min-h-[44px] rounded-xl border border-brand-red/30 hover:bg-brand-red hover:text-white text-brand-red font-display text-xs font-semibold uppercase tracking-[0.1em] inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Cotizar</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
