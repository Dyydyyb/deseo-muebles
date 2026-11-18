import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#A3191F",
          redHover: "#86141A",
          charcoal: "#1E1E1E",
          warmGray: "#3A3633",
          taupe: "#E9E1D8",
          cream: "#FAF7F3",
          wood: "#B08968",
          whatsapp: "#25D366",
          whatsappDark: "#1DA851",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        editorial: "0 14px 40px -12px rgba(30, 30, 30, 0.14)",
        editorialHover: "0 24px 54px -14px rgba(30, 30, 30, 0.24)",
      },
    },
  },
  plugins: [],
};

export default config;
