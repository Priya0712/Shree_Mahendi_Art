/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6B2E1F', // Deep Maroon
          light: '#8B3A2A',   // Mehendi Brown
          dark: '#4A1D13',
        },
        accent: {
          DEFAULT: '#D4AF37', // Gold
          light: '#E8B84B',   // Mustard
          dark: '#B08D26',
        },
        secondary: {
          DEFAULT: '#C1662F', // Henna Orange
          light: '#D3834E',
          dark: '#A05021',
        },
        cream: {
          DEFAULT: '#FFF8F0', // Warm Ivory/Cream
          dark: '#FCEFD8',
        },
        dark: {
          DEFAULT: '#2B1810', // Dark Brown/Black
          light: '#442B20',
        },
        bridal: {
          DEFAULT: '#7A1F2B', // Deep Maroon-Red
          dark: '#58111B',
        }
      },
      fontFamily: {
        heading: ['Rasa', 'Hind Vadodara', 'Noto Sans Gujarati', 'serif'],
        body: ['Noto Sans Gujarati', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.4)',
        'maroon-glow': '0 0 15px rgba(107, 46, 31, 0.2)',
      }
    },
  },
  plugins: [],
}
