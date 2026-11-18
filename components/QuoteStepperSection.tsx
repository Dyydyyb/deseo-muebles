"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChefHat,
  Shirt,
  Sofa,
  Store,
  Layers,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";
import { buildWhatsAppUrl, type ServiceId } from "@/lib/config";

const quoteSchema = z.object({
  servicio: z.enum([
    "Cocina",
    "Vestidor / Placard",
    "Mueble de living u oficina",
    "Local comercial",
    "Mesada / Marmolería",
    "Otro",
  ]),
  medidas: z.string().max(80).optional(),
  material: z.enum(["Melamina", "Laminado", "Madera", "Todavía no sé"]),
  mesada: z.enum(["Sí", "No", "No sé"]),
  idea: z.enum(["Sí tengo fotos o plano", "Quiero que me asesoren"]),
  nombre: z.string().min(2, "Ingresá tu nombre"),
  zona: z.string().min(2, "Indicá tu zona o barrio"),
  plazo: z.enum(["Lo antes posible", "En 1 a 3 meses", "Estoy averiguando"]),
  comentarios: z.string().max(400).optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const SERVICE_OPTIONS: { id: ServiceId; label: string; icon: React.ElementType }[] = [
  { id: "Cocina", label: "Cocina", icon: ChefHat },
  { id: "Vestidor / Placard", label: "Vestidor / Placard", icon: Shirt },
  { id: "Mueble de living u oficina", label: "Living u oficina", icon: Sofa },
  { id: "Local comercial", label: "Local comercial", icon: Store },
  { id: "Mesada / Marmolería", label: "Mesada / Marmolería", icon: Layers },
  { id: "Otro", label: "Otro proyecto", icon: Sparkles },
];

const MATERIAL_OPTIONS: QuoteFormValues["material"][] = [
  "Melamina",
  "Laminado",
  "Madera",
  "Todavía no sé",
];

const MESADA_OPTIONS: QuoteFormValues["mesada"][] = ["Sí", "No", "No sé"];

const IDEA_OPTIONS: QuoteFormValues["idea"][] = [
  "Sí tengo fotos o plano",
  "Quiero que me asesoren",
];

const PLAZO_OPTIONS: QuoteFormValues["plazo"][] = [
  "Lo antes posible",
  "En 1 a 3 meses",
  "Estoy averiguando",
];

function generateMessage(v: Partial<QuoteFormValues>): string {
  const nombre = v.nombre?.trim() || "[Tu nombre]";
  const zona = v.zona?.trim() || "[Tu zona]";
  const servicio = v.servicio || "un mueble a medida";
  const medidasPart = v.medidas?.trim() ? ` Medidas aprox.: ${v.medidas.trim()}.` : "";
  const materialPart = ` Material: ${v.material || "Todavía no sé"}.`;
  const mesadaPart =
    v.mesada === "Sí"
      ? " Incluye mesada/marmolería."
      : v.mesada === "No"
      ? " Sin mesada."
      : " Mesada a definir.";
  const ideaPart = ` ${v.idea || "Quiero que me asesoren"}.`;
  const plazoPart = ` Me gustaría empezar ${v.plazo?.toLowerCase() || "lo antes posible"}.`;
  const comentariosPart = v.comentarios?.trim() ? ` Comentarios: ${v.comentarios.trim()}.` : "";

  return `Hola Deseo Muebles! Soy ${nombre}, de ${zona}. Quiero cotizar ${servicio}.${medidasPart}${materialPart}${mesadaPart}${ideaPart}${plazoPart}${comentariosPart} ¿Me pueden asesorar y pasar una cotización? Gracias!`;
}

interface QuoteStepperSectionProps {
  selectedService?: ServiceId;
}

export function QuoteStepperSection({ selectedService }: QuoteStepperSectionProps) {
  const [step, setStep] = useState(1);
  const [customMessage, setCustomMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      servicio: selectedService || "Cocina",
      medidas: "",
      material: "Melamina",
      mesada: "No sé",
      idea: "Quiero que me asesoren",
      nombre: "",
      zona: "",
      plazo: "En 1 a 3 meses",
      comentarios: "",
    },
  });

  const values = watch();

  useEffect(() => {
    if (selectedService) {
      setValue("servicio", selectedService);
    }
  }, [selectedService, setValue]);

  useEffect(() => {
    if (step === 4) {
      setCustomMessage(generateMessage(values));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleNext = async () => {
    if (step === 3) {
      const valid = await trigger(["nombre", "zona"]);
      if (!valid) return;
    }
    setStep((s) => Math.min(4, s + 1));
  };

  const handleCopy = async () => {
    const text = customMessage || generateMessage(values);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked
    }
  };

  const progressPercent = (step / 4) * 100;

  return (
    <section id="cotizar" className="py-10 sm:py-16 lg:py-20 bg-brand-taupe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-6 sm:mb-10">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-red mb-2">
            Armá tu consulta
          </p>
          <h2
            className="font-serif font-bold text-brand-charcoal leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)" }}
          >
            Cotizá tu proyecto en 4 pasos simples
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left / Main Stepper Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-8 border border-brand-wood/30 shadow-editorial">
            {/* Progress Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-display font-semibold uppercase tracking-[0.12em] text-brand-warmGray mb-2">
                <span>Paso {step} de 4</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="h-2 w-full bg-brand-taupe rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
                  className="h-full bg-brand-red rounded-full"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="font-serif font-bold text-2xl text-brand-charcoal mb-4">
                    ¿Qué necesitás fabricar?
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {SERVICE_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      const active = values.servicio === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setValue("servicio", opt.id)}
                          aria-pressed={active}
                          className={`p-3.5 sm:p-4 min-h-[82px] rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                            active
                              ? "border-brand-red bg-brand-red/5 ring-1 ring-brand-red text-brand-charcoal"
                              : "border-brand-taupe hover:border-brand-wood text-brand-warmGray"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${active ? "text-brand-red" : "text-brand-wood"}`}
                            strokeWidth={1.75}
                          />
                          <span className="font-display text-xs sm:text-sm font-semibold leading-tight">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <h3 className="font-serif font-bold text-2xl text-brand-charcoal">
                    Detalles de tu proyecto
                  </h3>

                  <div>
                    <label
                      htmlFor="input-medidas"
                      className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-brand-warmGray mb-1.5"
                    >
                      Medidas aproximadas (opcional)
                    </label>
                    <input
                      id="input-medidas"
                      type="text"
                      placeholder="Ej: 3,20m x 2,40m"
                      {...register("medidas")}
                      className="w-full min-h-[44px] rounded-xl border border-brand-taupe px-3.5 py-2 text-sm text-brand-charcoal bg-brand-cream/40"
                    />
                  </div>

                  <div>
                    <span className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-brand-warmGray mb-1.5">
                      Material o terminación
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {MATERIAL_OPTIONS.map((mat) => {
                        const active = values.material === mat;
                        return (
                          <button
                            key={mat}
                            type="button"
                            onClick={() => setValue("material", mat)}
                            aria-pressed={active}
                            className={`min-h-[44px] px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                              active
                                ? "bg-brand-red text-white border-brand-red"
                                : "bg-white text-brand-warmGray border-brand-taupe hover:border-brand-wood"
                            }`}
                          >
                            {mat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-brand-warmGray mb-1.5">
                        ¿Incluye mesada / marmolería?
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {MESADA_OPTIONS.map((m) => {
                          const active = values.mesada === m;
                          return (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setValue("mesada", m)}
                              aria-pressed={active}
                              className={`min-h-[44px] px-2 rounded-xl border text-xs font-semibold transition-colors ${
                                active
                                  ? "bg-brand-charcoal text-white border-brand-charcoal"
                                  : "bg-white text-brand-warmGray border-brand-taupe"
                              }`}
                            >
                              {m}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-brand-warmGray mb-1.5">
                        ¿Ya tenés diseño o idea?
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {IDEA_OPTIONS.map((idea) => {
                          const active = values.idea === idea;
                          return (
                            <button
                              key={idea}
                              type="button"
                              onClick={() => setValue("idea", idea)}
                              aria-pressed={active}
                              className={`min-h-[44px] px-2.5 py-1.5 rounded-xl border text-[11px] font-semibold leading-tight transition-colors ${
                                active
                                  ? "bg-brand-charcoal text-white border-brand-charcoal"
                                  : "bg-white text-brand-warmGray border-brand-taupe"
                              }`}
                            >
                              {idea}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <h3 className="font-serif font-bold text-2xl text-brand-charcoal">
                    Tus datos para la cotización
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="input-nombre"
                        className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-brand-warmGray mb-1.5"
                      >
                        Nombre *
                      </label>
                      <input
                        id="input-nombre"
                        type="text"
                        placeholder="Ej: Sofía"
                        {...register("nombre")}
                        className="w-full min-h-[44px] rounded-xl border border-brand-taupe px-3.5 py-2 text-sm text-brand-charcoal bg-brand-cream/40"
                      />
                      {errors.nombre && (
                        <p className="text-xs text-brand-red mt-1 font-medium">
                          {errors.nombre.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="input-zona"
                        className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-brand-warmGray mb-1.5"
                      >
                        Zona o barrio *
                      </label>
                      <input
                        id="input-zona"
                        type="text"
                        placeholder="Ej: Banfield Este"
                        {...register("zona")}
                        className="w-full min-h-[44px] rounded-xl border border-brand-taupe px-3.5 py-2 text-sm text-brand-charcoal bg-brand-cream/40"
                      />
                      {errors.zona && (
                        <p className="text-xs text-brand-red mt-1 font-medium">
                          {errors.zona.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-brand-warmGray mb-1.5">
                      ¿Cuándo querés empezar?
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {PLAZO_OPTIONS.map((p) => {
                        const active = values.plazo === p;
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setValue("plazo", p)}
                            aria-pressed={active}
                            className={`min-h-[44px] px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                              active
                                ? "bg-brand-red text-white border-brand-red"
                                : "bg-white text-brand-warmGray border-brand-taupe"
                            }`}
                          >
                            {p}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="input-comentarios"
                      className="block text-xs font-display font-semibold uppercase tracking-[0.08em] text-brand-warmGray mb-1.5"
                    >
                      Comentarios opcionales
                    </label>
                    <textarea
                      id="input-comentarios"
                      rows={2}
                      placeholder="Contanos algún detalle extra si querés..."
                      {...register("comentarios")}
                      className="w-full rounded-xl border border-brand-taupe px-3.5 py-2 text-sm text-brand-charcoal bg-brand-cream/40"
                    />
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <h3 className="font-serif font-bold text-2xl text-brand-charcoal">
                    ¡Listo! Revisá tu mensaje y envialo
                  </h3>
                  <p className="text-sm text-brand-warmGray">
                    Podés editar el texto antes de abrir WhatsApp o copiarlo directamente.
                  </p>

                  <label htmlFor="preview-mensaje" className="sr-only">
                    Vista previa del mensaje para WhatsApp
                  </label>
                  <textarea
                    id="preview-mensaje"
                    rows={5}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full rounded-xl border border-brand-wood/50 bg-brand-cream p-4 text-sm text-brand-charcoal leading-relaxed"
                  />

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <a
                      href={buildWhatsAppUrl(customMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-h-[48px] rounded-xl bg-brand-whatsapp hover:bg-brand-whatsappDark text-brand-charcoal font-bold text-sm px-6 py-3 inline-flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-5 h-5" strokeWidth={2} />
                      <span>Enviar por WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="min-h-[48px] rounded-xl border border-brand-charcoal/25 hover:border-brand-red text-brand-charcoal font-semibold text-sm px-5 py-3 inline-flex items-center justify-center gap-2 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-brand-red" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? "¡Mensaje copiado!" : "Copiar mensaje"}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper Footer Navigation */}
            <div className="mt-6 pt-5 border-t border-brand-taupe flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  className="min-h-[44px] px-4 py-2 rounded-xl border border-brand-taupe hover:border-brand-charcoal text-brand-warmGray font-display text-xs font-semibold uppercase tracking-[0.08em] inline-flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>
              ) : (
                <span className="text-xs text-brand-warmGray">
                  Cotización sin cargo en el momento
                </span>
              )}

              {step < 4 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="min-h-[44px] px-6 py-2.5 rounded-xl bg-brand-red hover:bg-brand-redHover text-white font-display text-xs font-semibold uppercase tracking-[0.1em] inline-flex items-center gap-2 transition-colors ml-auto"
                >
                  <span>{step === 3 ? "Ver mensaje" : "Siguiente"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Live Summary Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 bg-brand-charcoal text-white rounded-2xl p-6 shadow-editorial sticky top-24">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-wood mb-2">
              Resumen de tu consulta
            </p>
            <h3 className="font-serif font-bold text-2xl text-white mb-5">
              Deseo Muebles
            </h3>

            <dl className="space-y-3 text-sm border-t border-white/10 pt-4">
              <div className="flex justify-between gap-3">
                <dt className="text-brand-taupe/70">Servicio</dt>
                <dd className="font-semibold text-right">{values.servicio}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-brand-taupe/70">Medidas</dt>
                <dd className="text-right">{values.medidas?.trim() || "A definir"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-brand-taupe/70">Material</dt>
                <dd className="text-right">{values.material}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-brand-taupe/70">Mesada</dt>
                <dd className="text-right">{values.mesada}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-brand-taupe/70">Diseño</dt>
                <dd className="text-right">{values.idea}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-brand-taupe/70">Plazo</dt>
                <dd className="text-right">{values.plazo}</dd>
              </div>
              {(values.nombre || values.zona) && (
                <div className="flex justify-between gap-3 pt-2 border-t border-white/10">
                  <dt className="text-brand-taupe/70">Contacto</dt>
                  <dd className="text-right">
                    {[values.nombre, values.zona].filter(Boolean).join(" · ")}
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
