// tailwind.config.ts
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        gy: {
          // keep slate scale, then override specific stops + our tokens
          ...colors.slate,
          50:  "#f5f8f8",
          100: "#e8f0ef",
          200: "#cfe0e3",
          300: "#a9c8c9",
          400: "#7aa9ad",
          500: "#4fa892", // primary accent (blue-gray-green)
          600: "#3c6f76",
          700: "#2b3a5f",
          800: "#27484c",
          900: "#1d3538",
          accent: "#4fa892",
          canvas: "#F7FBF9", // near-white with a calm green hint (Sage Mist)
        },

        // existing spring-matte tokens
        paper: {
          50:  "#F6FBF8",
          100: "#EFF8F2",
        },

        hairline: "#E7F0EA",

        // general accent scale (kept as-is)
        accent: {
          400: "#2DD4BF",
          600: "#0F766E",
          700: "#0D5F59",
          800: "#0B4945",
        },
      },

      // Card shadow stays as is
      boxShadow: {
        card:
          "0 1px 2px rgba(17, 24, 39, 0.06), 0 1px 1px rgba(17, 24, 39, 0.04)",
      },

      // Lock base typography scale (consistent rhythm)
      fontSize: {
        xs: ["12px", { lineHeight: "1.6" }],
        sm: ["14px", { lineHeight: "1.7" }],
        base: ["16px", { lineHeight: "1.7" }],
        lg: ["18px", { lineHeight: "1.7" }],
        xl: ["20px", { lineHeight: "1.5" }],
        "2xl": ["24px", { lineHeight: "1.3" }],
        "3xl": ["30px", { lineHeight: "1.2" }],
        "4xl": ["36px", { lineHeight: "1.1" }],
      },
    },
  },
  plugins: [],
};

export default config;
