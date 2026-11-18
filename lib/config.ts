export type ServiceId =
  | "Cocina"
  | "Vestidor / Placard"
  | "Mueble de living u oficina"
  | "Local comercial"
  | "Mesada / Marmolería"
  | "Otro";

export const SITE_CONFIG = {
  brandName: "Deseo Muebles",
  description: "Diseño y fabricación de muebles a medida en Banfield",
  zone: "Banfield Este, Buenos Aires",
  tagline: "Hacemos realidad esos proyectos que tanto deseás",
  closingHeadline: "Hagamos realidad ese proyecto que tanto deseás",
  mainCta: "Consultas por WhatsApp",
  whatsappDisplay: "11 3478-8244",
  whatsappNumber: "5491134788244",
  whatsappBaseUrl: "https://wa.me/5491134788244",
  whatsappDirectLink: "https://wa.me/message/4UGQRQA7U6MCG1",
  instagramHandle: "@deseo.muebles",
  instagramUrl: "https://www.instagram.com/deseo.muebles/",
  heroImage: "/images/cocina-isla-marmol.jpg",
  heroImageAlt:
    "Cocina moderna a medida fabricada por Deseo Muebles con isla, mesada de granito oscuro y alzada iluminada",
  closingImage: "/images/living-rack-led.jpg",
  closingImageAlt:
    "Mueble de living a medida con listonado de madera e iluminación cálida",
} as const;

export function buildWhatsAppUrl(message?: string): string {
  if (!message) return SITE_CONFIG.whatsappBaseUrl;
  return `${SITE_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Trabajos", href: "#trabajos" },
  { label: "Cómo trabajamos", href: "#como-trabajamos" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Cotizá", href: "#cotizar" },
] as const;

export interface ServiceItem {
  id: ServiceId;
  title: string;
  description: string;
  image: string;
  iconName: "chefHat" | "shirt" | "sofa" | "store" | "layers";
}

export const SERVICES: ServiceItem[] = [
  {
    id: "Cocina",
    title: "Cocinas a medida",
    description:
      "Bajo mesadas, alacenas, islas y torres de electrodomésticos diseñadas al milímetro.",
    image: "/images/cocina-isla-marmol.jpg",
    iconName: "chefHat",
  },
  {
    id: "Vestidor / Placard",
    title: "Vestidores y placares",
    description:
      "Interiores organizados, frentes corredizos o batientes y aprovechamiento total de altura.",
    image: "/images/placeholder-vestidor.svg",
    iconName: "shirt",
  },
  {
    id: "Mueble de living u oficina",
    title: "Muebles para living, comedor y oficina",
    description:
      "Racks de TV, bibliotecas, escritorios y mesas pensadas para cada ambiente.",
    image: "/images/rack-tv-listonado.jpg",
    iconName: "sofa",
  },
  {
    id: "Local comercial",
    title: "Locales comerciales",
    description:
      "Mobiliario corporativo, salas de reunión, mostradores y exhibidores a medida.",
    image: "/images/oficina-sala-reuniones.jpg",
    iconName: "store",
  },
  {
    id: "Mesada / Marmolería",
    title: "Marmolería y mesadas",
    description:
      "Servicio integral de mesadas, barras y revestimientos en piedra y madera.",
    image: "/images/biblioteca-mesa-marmol.jpg",
    iconName: "layers",
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Diseño a medida",
    description: "Cada espacio es único, creamos soluciones para vos.",
    iconName: "ruler" as const,
  },
  {
    title: "Calidad en materiales",
    description: "Trabajamos con las mejores marcas de placas y herrajes.",
    iconName: "award" as const,
  },
  {
    title: "Fabricación propia",
    description: "Controlamos cada detalle del proceso.",
    iconName: "hammer" as const,
  },
  {
    title: "Experiencia",
    description: "Proyectos que combinan estética, funcionalidad y durabilidad.",
    iconName: "sparkles" as const,
  },
  {
    title: "Acompañamiento",
    description: "Te asesoramos en todas las etapas, desde la idea hasta la instalación.",
    iconName: "handshake" as const,
  },
];

export const WORK_PROCESS = [
  {
    step: 1,
    title: "Escuchamos tu necesidad",
    description: "Una vez que nos contactás, escuchamos tus necesidades.",
    iconName: "messageCircle" as const,
  },
  {
    step: 2,
    title: "Diseñamos con render",
    description:
      "Diseñamos la idea juntos: te mostramos el render y ajustamos cada detalle del proyecto.",
    iconName: "penTool" as const,
  },
  {
    step: 3,
    title: "Definimos materiales",
    description:
      "Definimos el proyecto con las medidas, materiales y terminaciones que más se adapten a vos.",
    iconName: "sliders" as const,
  },
  {
    step: 4,
    title: "Cotización en el momento",
    description:
      "Y lo cotizamos en el momento, para que puedas tomar tu decisión con toda la información.",
    iconName: "calculator" as const,
  },
];

export interface InstagramReview {
  handle: string;
  text: string;
}

export const INSTAGRAM_REVIEWS: InstagramReview[] = [
  {
    handle: "@milugarenlapatagonia",
    text: "Cambiaron mí Cocina! Hoy es mí espacio favorito...",
  },
  {
    handle: "@elcontra_cateringartesanal",
    text: "Comprometidos en cada proyecto! Años de confianza",
  },
  {
    handle: "@elsecoconstrucciones",
    text: "La experiencia con @deseo.muebles fue Genial! Recomiendo al 100%!!!",
  },
  {
    handle: "@anandazenyogainfancias",
    text: "Sin dudas son los mejores!!!! Ya quiero renovar mi casa para que vengan a ponerla bonita!!!",
  },
  {
    handle: "@chino_supersport",
    text: "Recomiendo al 100%",
  },
  {
    handle: "@somoscoral.ok",
    text: "Y buena gente!!!",
  },
  {
    handle: "@camperizarbanfield.airelibre",
    text: "Una belleza",
  },
];
