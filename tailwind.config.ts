import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ember: {
          900: "#1E1410",
          800: "#3A2418",
          500: "#D4724A",
          300: "#EBB97A",
          100: "#F5EBD8",
        },
      },
    },
  },
  plugins: [],
};

export default config;
