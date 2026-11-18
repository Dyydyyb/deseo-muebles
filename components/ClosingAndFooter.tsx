"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, MessageCircle, Instagram, ArrowUpRight } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { NAV_LINKS, SITE_CONFIG, buildWhatsAppUrl } from "@/lib/config";

export function ClosingAndFooter() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* I) CONTACTO Y CIERRE */}
      <section className="relative bg-brand-charcoal text-white overflow-hidden">
        <div className="relative py-14 sm:py-20 lg:py-24">
          <Image
            src={SITE_CONFIG.closingImage}
            alt={SITE_CONFIG.closingImageAlt}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#1E1E1E]/90 via-[#1E1E1E]/80 to-[#1E1E1E]/75"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7"
            >
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-wood mb-3">
                {SITE_CONFIG.zone}
              </p>
              <h2
                className="font-serif font-bold text-white leading-tight mb-5"
                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
              >
                {SITE_CONFIG.closingHeadline}
              </h2>
              <p className="text-sm sm:text-base text-brand-taupe/90 leading-relaxed max-w-xl mb-7">
                Escribinos por WhatsApp, contanos tu idea y coordinamos el diseño con render y cotización al momento.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href={buildWhatsAppUrl(
                    "Hola Deseo Muebles! Quiero hacer una consulta por un mueble a medida."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-brand-whatsapp hover:bg-brand-whatsappDark text-brand-charcoal font-bold text-sm sm:text-base px-7 py-4 min-h-[52px] rounded-xl transition-colors shadow-editorial"
                >
                  <MessageCircle className="w-5 h-5" strokeWidth={2} />
                  <span>{SITE_CONFIG.mainCta}</span>
                </a>

                <a
                  href={SITE_CONFIG.whatsappDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/35 hover:border-white text-white font-display text-xs font-semibold uppercase tracking-[0.1em] px-5 py-3.5 min-h-[48px] rounded-xl transition-colors"
                >
                  <span>Mensaje directo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-brand-taupe">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-wood" />
                  {SITE_CONFIG.zone}
                </span>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-brand-whatsapp" />
                  WhatsApp {SITE_CONFIG.whatsappDisplay}
                </a>
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4 text-brand-wood" />
                  {SITE_CONFIG.instagramHandle}
                </a>
              </div>
            </motion.div>

            {/* Map of Banfield Este */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-brand-charcoal shadow-editorial h-60 sm:h-72">
                <iframe
                  title="Ubicación en Banfield Este, Buenos Aires"
                  src="https://www.google.com/maps?q=Banfield+Este,+Buenos+Aires,+Argentina&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0 grayscale-[25%] contrast-[1.05]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* J) FOOTER */}
      <footer className="bg-brand-charcoal text-brand-taupe py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <BrandMark size={34} className="[&_.dark-stroke]:stroke-white" />
            <div>
              <p className="font-display font-bold text-sm tracking-[0.14em] uppercase text-white">
                {SITE_CONFIG.brandName}
              </p>
              <p className="text-xs text-brand-taupe/80 mt-0.5">
                {SITE_CONFIG.description} · {SITE_CONFIG.zone}
              </p>
            </div>
          </div>

          <nav aria-label="Enlaces del pie" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-display uppercase tracking-[0.1em]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Deseo Muebles"
              className="w-11 h-11 rounded-xl border border-white/15 hover:border-brand-wood text-white flex items-center justify-center transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Deseo Muebles"
              className="w-11 h-11 rounded-xl border border-white/15 hover:border-brand-whatsapp text-white flex items-center justify-center transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-taupe/70">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.brandName}. Todos los derechos reservados.</p>
          <p>WhatsApp: {SITE_CONFIG.whatsappDisplay} · {SITE_CONFIG.instagramHandle}</p>
        </div>
      </footer>

      {/* K) ELEMENTOS FLOTANTES */}
      {/* Desktop floating WhatsApp button */}
      <motion.a
        href={buildWhatsAppUrl("Hola Deseo Muebles! Quiero hacer una consulta.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consultas por WhatsApp"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.03, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2.5 bg-brand-whatsapp hover:bg-brand-whatsappDark text-brand-charcoal font-bold text-sm px-5 py-3.5 min-h-[48px] rounded-full shadow-editorial transition-colors"
      >
        <MessageCircle className="w-5 h-5" strokeWidth={2} />
        <span>WhatsApp</span>
      </motion.a>

      {/* Mobile fixed bottom bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-brand-cream/95 backdrop-blur-md border-t border-brand-taupe px-4 py-2.5 flex items-center gap-3 shadow-lg">
        <a
          href={buildWhatsAppUrl("Hola Deseo Muebles! Quiero hacer una consulta.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] rounded-xl bg-brand-whatsapp text-brand-charcoal font-bold text-sm inline-flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" strokeWidth={2} />
          <span>WhatsApp</span>
        </a>
        <a
          href="#cotizar"
          className="flex-1 min-h-[44px] rounded-xl bg-brand-red text-white font-display font-semibold text-xs uppercase tracking-[0.1em] inline-flex items-center justify-center"
        >
          Cotizar
        </a>
      </div>
    </>
  );
}
