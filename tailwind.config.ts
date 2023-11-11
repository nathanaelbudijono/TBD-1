/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "typography-50": "#fafafa",
        "typography-100": "#f5f5f5",
        "typography-200": "#e5e5e5",
        "typography-300": "#d4d4d4",
        "typography-400": "#a3a3a3",
        "typography-500": "#737373",
        "typography-600": "#525252",
        "typography-700": "#404040",
        "typography-800": "#262626",
        "typography-900": "#171717",
        "typography-950": "#0a0a0a",

        "ready-400": "#4ade80",
        "ready-500": "#22c55e",
        "ready-600": "#16a34a",

        "danger-400": "#f87171",
        "danger-500": "#ef4444",
        "danger-600": "#dc2626",
        "danger-700": "#b91c1c",

        "color-100": "#F9F7F7",

        "d-100": "#FBD1D3",
        "d-200": "#F198AF",
        "d-300": "#EBB2D6",
        "d-400": "#DBE2EF",
        "d-500": "#9F81CD",
        "d-600": "#766DC1",
        "d-700": "#18406E",

        "n-100": "#281036",
        "n-200": "#632A6C",
        "n-300": "#C86B98",
        "n-400": "#F09F9C",
        "n-500": "#FFC1A0",
        "n-600": "#FD9C7F",

        "primary-100": "#FCFAEC",
        "primary-200": "#BBC6A6",
        "primary-300": "#879273",
        "primary-400": "#566044",
        "primary-500": "#293319",
        "primary-600": "#729E2F",
        "primary-700": "#6D9971",
        "primary-800": "#8F9973",
        "primary-900": "#359BA8",

        "secondary-100": "#F9F871",
        "secondary-200": "#C1C23C",
        "secondary-300": "#D8D953",
        "secondary-400": "#8A8F00",
        "secondary-500": "#FFCA80",
        "secondary-600": "#FFB896",
        "secondary-700": "#C4AA36",

        "tertiary-500": "#DA0032",
        "tertiary-400": "#FF3463",
        "tertiary-300": "#FF6791",
        "tertiary-200": "#FF97BC",
        "tertiary-100": "#FFBAD6",

        "quaternary-100": "#FAFAFA",
        "quaternary-200": "#FD98F5",
        "quaternary-300": "#F46AE9",
        "quaternary-400": "#FF00EB",
        "quaternary-500": "#D19F9C",
      },
      screens: {
        xs: "400px",
      },
      keyframes: {
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translateY(-2rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0rem)",
          },
        },
        fadeOutLeft: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
