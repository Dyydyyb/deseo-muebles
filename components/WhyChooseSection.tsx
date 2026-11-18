"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Ruler, Award, Hammer, Sparkles, Handshake } from "lucide-react";
import { WHY_CHOOSE_US } from "@/lib/config";

const ICON_MAP = {
  ruler: Ruler,
  award: Award,
  hammer: Hammer,
  sparkles: Sparkles,
  handshake: Handshake,
};

export function WhyChooseSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-7 sm:mb-12"
        >
          <p className="font-script text-2xl sm:text-3xl text-brand-red mb-1">
            ¿Por qué elegir Deseo Muebles?
          </p>
          <h2
            className="font-serif font-bold text-brand-charcoal leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)" }}
          >
            Cada proyecto pensado para durar
          </h2>
        </motion.div>

        {/* 2 columns on mobile, 5 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-5">
          {WHY_CHOOSE_US.map((item, idx) => {
            const Icon = ICON_MAP[item.iconName];
            const isLastOdd = idx === WHY_CHOOSE_US.length - 1;
            return (
              <motion.div
                key={item.title}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
                className={`bg-white rounded-2xl p-4 sm:p-5 border border-brand-taupe shadow-sm flex flex-col justify-between ${
                  isLastOdd ? "col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="pb-3 mb-3 border-b border-brand-wood/30">
                    <Icon className="w-5 h-5 text-brand-red" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-brand-charcoal leading-snug mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-warmGray leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
