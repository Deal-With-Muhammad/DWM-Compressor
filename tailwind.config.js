const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  // Primary is the logo colour (public/icon.svg); the accent picker can still change it.
  plugins: [
    heroui({
      themes: {
        light: { colors: { primary: { DEFAULT: "#e2533b", foreground: "#ffffff" } } },
        dark: { colors: { primary: { DEFAULT: "#e2533b", foreground: "#ffffff" } } },
      },
    }),
  ],
};
