// tailwind.config.ts
import type { Config } from "tailwindcss"
import colors from "tailwindcss/colors"

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Keep old classes like text-gy-800, border-gy-200, etc.
        gy: colors.slate,

        // Your new spring-matte tokens
        paper: {
          50:  "#F6FBF8",
          100: "#EFF8F2",
        },
        hairline: "#E7F0EA",
        accent: {
          400: "#2DD4BF",
          600: "#0F766E",
          700: "#0D5F59",
          800: "#0B4945",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(17, 24, 39, 0.06), 0 1px 1px rgba(17, 24, 39, 0.04)",
      },
    },
  },
  plugins: [],
}

export default config
