"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, PenTool, SlidersHorizontal, Calculator } from "lucide-react";
import { WORK_PROCESS } from "@/lib/config";

const ICON_MAP = {
  messageCircle: MessageCircle,
  penTool: PenTool,
  sliders: SlidersHorizontal,
  calculator: Calculator,
};

export function ProcessSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="como-trabamos" className="py-10 sm:py-16 lg:py-20 bg-white border-y border-brand-taupe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-14">
          <h2
            className="font-serif font-bold text-brand-charcoal leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)" }}
          >
            Cómo trabajamos: del primer mensaje a tu mueble instalado
          </h2>
        </div>

        {/* Horizontal timeline: scroll-snap on mobile, 4-col connected timeline on desktop */}
        <div className="relative">
          {/* Animated connecting line on desktop */}
          <div
            className="hidden md:block absolute top-6 left-[12%] right-[12%] h-[2px] bg-brand-taupe overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full bg-brand-wood origin-left"
            />
          </div>

          <ol className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-3 no-scrollbar md:grid md:grid-cols-4 md:gap-6 md:mx-0 md:px-0 md:pb-0 md:overflow-visible">
            {WORK_PROCESS.map((item, idx) => {
              const Icon = ICON_MAP[item.iconName];
              return (
                <motion.li
                  key={item.step}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : idx * 0.1 }}
                  className="w-[74vw] sm:w-[46vw] md:w-auto shrink-0 snap-start bg-brand-cream/70 md:bg-transparent rounded-2xl p-5 md:p-0 border border-brand-taupe md:border-0 relative z-10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-12 h-12 rounded-full bg-brand-cream border-2 border-brand-red text-brand-red flex items-center justify-center shadow-sm shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-[#7C583A]">
                      Paso {item.step}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-brand-charcoal mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-warmGray leading-relaxed">
                    {item.description}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-script text-2xl sm:text-3xl text-brand-red text-center mt-8 sm:mt-12"
        >
          “Y lo cotizamos en el momento”
        </motion.p>
      </div>
    </section>
  );
}
