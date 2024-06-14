import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundPosition: {
        "grad-pos-start": "0% 0%",
        "grad-pos-end": "20% 70%",
      },
      backgroundSize: {
        "grad-size": "300% 200%",
      },
      colors: {
        brand: {
          default: "#ba52dd",
          100: "#c268e1",
          200: "#ba52dd",
          300: "#b13dd9",
          400: "#a829d3",
          500: "#9725be",
          600: "#8621a9",
          700: "#751d93",
          800: "#64197e",
          900: "#531469",
        },
        dark: {
          default: "#0d0d0d",
          100: "#808080",
          200: "#737373",
          300: "#666666",
          400: "#595959",
          500: "#4d4d4d",
          600: "#404040",
          700: "#333333",
          800: "#262626",
          900: "#1a1a1a",
        },
        light: {
          default: "#ffffff",
          100: "#ffffff",
          200: "#e6e6e6",
          300: "#ccc",
          400: "#b3b3b3",
          500: "#999",
          600: "#808080",
          700: "#666",
          800: "#4d4d4d",
          900: "#333",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
