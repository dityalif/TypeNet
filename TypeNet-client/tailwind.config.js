/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          darkBg: '#0b1120',
          darkCard: '#1e293b',
          neonAccent: '#3EB489',
          neonError: '#ef4444',
          grayText: '#94a3b8',
        },
        fontFamily: {
          sans: ['Outfit', 'sans-serif'],
          mono: ['"Fira Code"', 'monospace'],
        }
      },
    },
    plugins: [],
  }