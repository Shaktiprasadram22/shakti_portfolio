import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#09090b",
        accentA: "#0ea5e9",
        accentB: "#14b8a6",
        accentC: "#22c55e"
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 16px 50px rgba(14,165,233,0.12)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at 20% 20%, rgba(14,165,233,.14), transparent 30%), radial-gradient(circle at 80% 0%, rgba(20,184,166,.12), transparent 35%), radial-gradient(circle at 50% 100%, rgba(34,197,94,.10), transparent 30%)"
      }
    }
  },
  plugins: []
};

export default config;
