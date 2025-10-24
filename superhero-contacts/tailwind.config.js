/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Share Tech Mono", "Courier New", "monospace"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      colors: {
        "gov-dark": "#0a0e27",
        "gov-blue": "#1a2332",
        "gov-cyan": "#00ffff",
        "gov-green": "#00ff41",
      },
      animation: {
        scan: "scan 2s linear infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
