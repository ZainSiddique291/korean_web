/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'Jost', 'Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          50: '#f2f7f4',
          100: '#e1ece6',
          200: '#c3dacd',
          300: '#9ebfae',
          400: '#68977d',
          500: '#3d7758',
          600: '#2d5f45',
          700: '#244c38',
          800: '#1d3d2e',
          900: '#162f23',
        },
        brand: {
          50: '#faf6ed',
          100: '#f4ead1',
          200: '#edd8a7',
          300: '#dfbe73',
          400: '#d1a64b',
          500: '#be9037',
          600: '#a7792c',
          700: '#855b25',
        },
        surface: {
          50: '#fcfaf7',
          100: '#f7f3ec',
          200: '#ede4d6',
          300: '#ded2bf',
          DEFAULT: '#faf7f2',
        },
        sage: {
          50: '#f3f7f6',
          100: '#e2ede9',
          200: '#c5dbd3',
          500: '#6b9586',
          600: '#537c6d',
          700: '#3f6255',
        },
        kdark: {
          600: '#4b5550',
          700: '#333b36',
          800: '#212723',
          900: '#141815',
          DEFAULT: '#1a1f1c',
        },
        kaccent: {
          50: '#fef3f2',
          100: '#fee4e2',
          500: '#e05a47',
          600: '#cc4431',
        },
        accent: '#2d5f45',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};
