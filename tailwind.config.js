/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#050811',
          900: '#090e1d',
          850: '#0e162d',
          800: '#141f3d',
          700: '#1e2d56',
        },
        electric: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          glow: '#00e5ff',
        },
        neon: {
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981',
          glow: '#00ff88',
        },
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(0, 229, 255, 0.45)',
        'glow-green': '0 0 25px -5px rgba(0, 255, 136, 0.45)',
        'glow-subtle': '0 0 15px -3px rgba(56, 189, 248, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
