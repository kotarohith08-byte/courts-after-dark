/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        script: ['"Caveat"', 'cursive'],
      },
      colors: {
        dark: {
          950: '#070b14',
          900: '#0c1222',
          850: '#11192e',
          800: '#17223b',
          700: '#1f2e4d',
          600: '#2c3e66',
        },
        electric: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          glow: '#00e5ff',
        },
        neon: {
          300: '#86efac',
          400: '#22c55e',
          500: '#16a34a',
          brand: '#00ff66',
          glow: '#00ff88',
        },
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(0, 229, 255, 0.45)',
        'glow-green': '0 0 25px -5px rgba(0, 255, 102, 0.45)',
        'glow-subtle': '0 0 15px -3px rgba(34, 197, 94, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
