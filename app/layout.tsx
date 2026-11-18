import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/config";

export const viewport: Viewport = {
  themeColor: "#FAF7F3",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Deseo Muebles | Diseño y fabricación de muebles a medida en Banfield",
  description:
    "Diseñamos y fabricamos cocinas a medida, vestidores, placares, muebles de living, locales comerciales y marmolería en Banfield Este, Buenos Aires. Cotizá por WhatsApp.",
  keywords: [
    "muebles a medida Banfield",
    "cocinas a medida zona sur",
    "vestidores a medida",
    "marmolería mesadas",
    "carpintería Banfield Este",
    "Deseo Muebles",
  ],
  openGraph: {
    title: "Deseo Muebles | Muebles a medida en Banfield",
    description:
      "Hacemos realidad esos proyectos que tanto deseás. Cocinas, vestidores, locales y mesadas a medida con fabricación propia.",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: SITE_CONFIG.heroImage,
        width: 1200,
        height: 900,
        alt: SITE_CONFIG.heroImageAlt,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE_CONFIG.brandName,
    description: SITE_CONFIG.description,
    telephone: "+54 9 11 3478-8244",
    areaServed: {
      "@type": "Place",
      name: "Banfield Este, Lomas de Zamora, Zona Sur, Buenos Aires, Argentina",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Banfield Este",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
    sameAs: [SITE_CONFIG.instagramUrl],
  };

  return (
    <html lang="es-AR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-cream text-brand-charcoal font-sans antialiased pb-20 md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
