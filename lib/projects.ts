import type { ServiceId } from "./config";

export type ProjectCategory =
  | "Todos"
  | "Cocinas"
  | "Vestidores"
  | "Living y oficina"
  | "Locales"
  | "Marmolería";

export interface ProjectItem {
  id: string;
  image: string;
  title: string;
  category: Exclude<ProjectCategory, "Todos">;
  serviceId: ServiceId;
  description: string;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Todos",
  "Cocinas",
  "Vestidores",
  "Living y oficina",
  "Locales",
  "Marmolería",
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "cocina-isla-marmol",
    image: "/images/cocina-isla-marmol.jpg",
    title: "Cocina integral con isla y mesada negra",
    category: "Cocinas",
    serviceId: "Cocina",
    description:
      "Módulos gris grafito con nicho cálido en madera, torre de hornos e isla con anafe y mesada oscura.",
  },
  {
    id: "cocina-barra-madera",
    image: "/images/cocina-barra-madera.jpg",
    title: "Cocina en U con barra desayunadora",
    category: "Cocinas",
    serviceId: "Cocina",
    description:
      "Bajo mesadas oscuros combinados con mesada de madera natural y estantes abiertos a medida.",
  },
  {
    id: "rack-tv-listonado",
    image: "/images/rack-tv-listonado.jpg",
    title: "Rack de TV con listonado y biblioteca",
    category: "Living y oficina",
    serviceId: "Mueble de living u oficina",
    description:
      "Panel central grafito con iluminación trasera, cajonera baja y listonado vertical en roble.",
  },
  {
    id: "living-rack-led",
    image: "/images/living-rack-led.jpg",
    title: "Módulo flotante de living con luz cálida",
    category: "Living y oficina",
    serviceId: "Mueble de living u oficina",
    description:
      "Rack suspendido con terminación neutra, estantería vertical y listonado acústico retroiluminado.",
  },
  {
    id: "oficina-sala-reuniones",
    image: "/images/oficina-sala-reuniones.jpg",
    title: "Sala de reuniones y guardado corporativo",
    category: "Locales",
    serviceId: "Local comercial",
    description:
      "Mesa ejecutiva con tapa en madera, conectividad integrada y mueble de guardado de piso a techo.",
  },
  {
    id: "biblioteca-mesa-marmol",
    image: "/images/biblioteca-mesa-marmol.jpg",
    title: "Biblioteca a medida y mesa con tapa marmolada",
    category: "Marmolería",
    serviceId: "Mesada / Marmolería",
    description:
      "Conjunto de guardado en madera de piso a techo acompañado de mesa comedor con tapa en piedra.",
  },
  {
    id: "vestidor-a-medida-placeholder",
    image: "/images/placeholder-vestidor.svg",
    title: "Vestidor y placard a medida",
    category: "Vestidores",
    serviceId: "Vestidor / Placard",
    description:
      "Diseño interior personalizado con cajoneras, pantaloneros, baulera superior e iluminación cálida.",
  },
];
