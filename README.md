# Deseo Muebles — Landing Page

Landing page mobile-first desarrollada con **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Embla Carousel** y **React Hook Form + Zod**.

## Cómo actualizar textos, WhatsApp e imágenes

Toda la configuración de la marca está centralizada en dos archivos:

1. **`lib/config.ts`**:
   - Número de WhatsApp (`whatsappDisplay`, `whatsappNumber`, `whatsappBaseUrl`, `whatsappDirectLink`)
   - Textos de servicios, "Por qué elegirnos", "Cómo trabajamos" y reseñas de Instagram (`@deseo.muebles`)
   - Imagen principal del Hero (`heroImage`) y del banner de cierre (`closingImage`)

2. **`lib/projects.ts`**:
   - Lista de trabajos mostrados en el slider y lightbox.
   - Para sumar o reemplazar fotos, colocá los archivos en `public/images/` y actualizá la ruta `image` en `lib/projects.ts` (por ejemplo, reemplazar `/images/placeholder-vestidor.svg` por una foto real de vestidor).

3. **Logo**:
   - El archivo original del logo está en `public/logo.png` y el isotipo vectorial editable en `components/BrandMark.tsx`.

## Desarrollo local

```bash
npm install
npm run dev
```

## Deploy en Vercel

1. Subí este repositorio a GitHub.
2. Importalo desde [vercel.com/new](https://vercel.com/new) y hacé clic en **Deploy** (Next.js se detecta automáticamente).
