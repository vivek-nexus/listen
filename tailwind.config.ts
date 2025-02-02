import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-900": "#055d57",
        "primary-800": "#008080",
        "primary-700": "#009497",
        "primary-600": "#00a9af",
        "primary-500": "#00b9c1",
        "primary-400": "#26c3c7",
        "primary-300": "#4dcecf",
        "primary-200": "#80dddb",
        "primary-100": "#b1eae8",
        "primary-50": "#dff7f6",
        "secondary-button-special": "#002727"
      },
      boxShadow: {
        "container-glow-on-pattern": "0px 0px 192px 28px var(--primary-900)",
        "container-glow-on-pattern-2": "0px 0px 480px 14px var(--primary-900)",
        "menu-container-glow": "var(--shadow-menu-container-glow)"
      }
    },
  },
  plugins: [],
}

export default config
