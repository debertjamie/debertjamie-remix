/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "aqua-haze": "#eff5f5",
        "geyser": "#d6e4e5",
        "lochmara": "#0077c0",
        "cod-gray": "#111",
      },
      gridTemplateColumns: {
        responsive: "repeat(auto-fit, minmax(15rem, 1fr))",
      },
    },
    fontSize: {
      xs: "0.75rem",
      sm: "1rem",
      base: "1.25rem",
      lg: "1.5rem",
      xl: "1.75rem",
      "2xl": "2rem",
      "3xl": "2.5rem",
      "4xl": "3rem",
      "5xl": "3.5rem",
      "6xl": "4rem",
      "7xl": "4.5rem",
      "8xl": "5rem",
      "9xl": "6rem",
    },
  },
  plugins: [],
};
