"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { SITE_CONFIG } from "@/lib/config";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[620px] h-[100svh] max-h-[920px] flex items-center justify-center overflow-hidden bg-brand-charcoal"
    >
      {/* Background image with Ken Burns + desktop parallax */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: yParallax }}
        className="absolute inset-0 w-full h-[112%] -top-[6%] pointer-events-none"
      >
        <motion.div
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.055, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={SITE_CONFIG.heroImage}
            alt={SITE_CONFIG.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* Dark charcoal overlay for AA contrast */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1E1E1E]/75 via-[#1E1E1E]/60 to-[#1E1E1E]/80"
        aria-hidden="true"
      />

      {/* Centered Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-14"
      >
        {/* Top Emblem */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-cream/95 flex items-center justify-center shadow-lg">
            <BrandMark size={30} />
          </div>
        </motion.div>

        {/* Small Label */}
        <motion.p
          variants={itemVariants}
          className="font-display text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-brand-taupe mb-3"
        >
          BANFIELD · MUEBLES A MEDIDA
        </motion.p>

        {/* H1 */}
        <motion.h1
          variants={itemVariants}
          className="font-serif font-bold text-white leading-[1.06] tracking-[-0.015em] mb-4 sm:mb-5"
          style={{ fontSize: "clamp(2.15rem, 5vw, 4.1rem)" }}
        >
          Muebles a medida que hacen realidad tus deseos
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          Diseñamos y fabricamos cocinas, vestidores y muebles a medida. Con fabricación propia, materiales de calidad y acompañamiento en cada etapa.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <motion.a
            href="#cotizar"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-red hover:bg-brand-redHover text-white font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.1em] px-7 py-3.5 min-h-[48px] rounded-xl shadow-editorial transition-colors group"
          >
            <span>Cotizar mi proyecto</span>
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2}
            />
          </motion.a>

          <a
            href="#trabajos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/60 hover:border-white hover:bg-white/10 text-white font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.1em] px-7 py-3.5 min-h-[48px] rounded-xl transition-colors"
          >
            <span>Ver trabajos</span>
          </a>
        </motion.div>

        {/* 3 trust points in a single line (also on mobile) */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center flex-nowrap gap-2 sm:gap-5 text-[11px] sm:text-sm text-brand-taupe font-medium overflow-x-auto no-scrollbar py-1"
        >
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <Check className="w-3.5 h-3.5 text-brand-wood shrink-0" strokeWidth={2.5} />
            Diseño a medida
          </span>
          <span className="text-white/40" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <Check className="w-3.5 h-3.5 text-brand-wood shrink-0" strokeWidth={2.5} />
            Fabricación propia
          </span>
          <span className="text-white/40" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <Check className="w-3.5 h-3.5 text-brand-wood shrink-0" strokeWidth={2.5} />
            Cotización al momento
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.a
        href="#servicios"
        aria-label="Deslizar hacia servicios"
        animate={shouldReduceMotion ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full border border-white/30 bg-brand-charcoal/40 text-white flex items-center justify-center hover:border-white transition-colors"
      >
        <ArrowDown className="w-4 h-4" strokeWidth={1.75} />
      </motion.a>
    </section>
  );
}
