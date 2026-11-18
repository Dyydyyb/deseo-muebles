"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Menu, X, MessageCircle, Instagram } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { NAV_LINKS, SITE_CONFIG, buildWhatsAppUrl } from "@/lib/config";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: shouldReduceMotion ? scrollYProgress : scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand-red origin-left z-50 pointer-events-none"
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-brand-cream/95 backdrop-blur-md shadow-sm border-b border-brand-taupe"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus-visible:rounded-lg"
            aria-label={`${SITE_CONFIG.brandName} - Inicio`}
          >
            <BrandMark
              size={34}
              className={`transition-transform duration-300 group-hover:scale-105 ${
                scrolled ? "" : "[&_.dark-stroke]:stroke-white"
              }`}
            />
            <div className="flex flex-col leading-none">
              <span
                className={`font-display font-bold text-sm sm:text-base tracking-[0.14em] uppercase transition-colors ${
                  scrolled ? "text-brand-charcoal" : "text-white"
                }`}
              >
                {SITE_CONFIG.brandName}
              </span>
              <span
                className={`font-display text-[10px] tracking-[0.18em] uppercase mt-0.5 transition-colors ${
                  scrolled ? "text-brand-warmGray" : "text-white/80"
                }`}
              >
                Banfield · A medida
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-display text-xs font-semibold uppercase tracking-[0.12em] transition-colors underline-offset-4 hover:underline ${
                  scrolled
                    ? "text-brand-warmGray hover:text-brand-red"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + Mobile Trigger */}
          <div className="flex items-center gap-2">
            <a
              href={buildWhatsAppUrl("Hola Deseo Muebles! Quiero hacer una consulta por un mueble a medida.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-brand-whatsapp hover:bg-brand-whatsappDark text-brand-charcoal font-semibold text-xs md:text-sm px-4 py-2.5 min-h-[44px] rounded-xl transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={2} />
              <span>Cotizar por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileOpen}
              className={`lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl transition-colors ${
                scrolled
                  ? "text-brand-charcoal hover:bg-brand-taupe"
                  : "text-white hover:bg-white/15"
              }`}
            >
              <Menu className="w-6 h-6" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-brand-cream flex flex-col justify-between p-6 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menú móvil"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <BrandMark size={32} />
                <span className="font-display font-bold text-sm tracking-[0.14em] uppercase text-brand-charcoal">
                  {SITE_CONFIG.brandName}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
                className="w-11 h-11 rounded-xl bg-brand-taupe/70 text-brand-charcoal flex items-center justify-center"
              >
                <X className="w-6 h-6" strokeWidth={1.75} />
              </button>
            </div>

            <nav aria-label="Menú móvil" className="flex flex-col gap-3 my-auto">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="font-serif text-3xl font-semibold text-brand-charcoal hover:text-brand-red py-2 border-b border-brand-taupe flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-brand-wood text-base font-display">→</span>
                </motion.a>
              ))}
            </nav>

            <div className="space-y-3 pt-4 border-t border-brand-taupe">
              <a
                href={buildWhatsAppUrl("Hola Deseo Muebles! Quiero hacer una consulta.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] rounded-xl bg-brand-whatsapp text-brand-charcoal font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" strokeWidth={2} />
                <span>{SITE_CONFIG.mainCta}</span>
              </a>
              <div className="flex items-center justify-between text-xs text-brand-warmGray pt-1">
                <span>{SITE_CONFIG.zone}</span>
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium hover:text-brand-red"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{SITE_CONFIG.instagramHandle}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
