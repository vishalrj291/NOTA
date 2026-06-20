/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F5F0E8',
          50: '#FDFCF9',
          100: '#F9F6F0',
          200: '#F5F0E8',
          300: '#EDE5D4',
          400: '#DDD0BB',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          50: '#F5F5F5',
          100: '#E0E0E0',
          200: '#B0B0B0',
          300: '#808080',
          400: '#505050',
          500: '#303030',
          600: '#202020',
          700: '#1A1A1A',
          800: '#121212',
          900: '#0A0A0A',
        },
        navy: {
          DEFAULT: '#0D1B2A',
          50: '#E8EDF2',
          100: '#C5D2DE',
          200: '#8BA4B8',
          300: '#527691',
          400: '#1E4770',
          500: '#0D1B2A',
          600: '#091523',
          700: '#060F1A',
          800: '#040B12',
          900: '#020609',
        },
        saffron: {
          DEFAULT: '#E8861A',
          50: '#FEF3E2',
          100: '#FDE2B3',
          200: '#FBC97F',
          300: '#F9B04A',
          400: '#F49B28',
          500: '#E8861A',
          600: '#C97015',
          700: '#A85B11',
          800: '#87470E',
          900: '#663509',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero': 'clamp(3.5rem, 9vw, 8rem)',
        'display': 'clamp(2.5rem, 6vw, 5rem)',
        'heading': 'clamp(1.75rem, 3.5vw, 3rem)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}
