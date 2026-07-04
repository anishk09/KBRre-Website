/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: '#1E3A5F',
            light: '#2E5280',
            dark: '#0F2440',
          },
          gold: {
            DEFAULT: '#C9A962',
            light: '#D9C48A',
            dark: '#A88842',
          },
          dark: {
            DEFAULT: '#1A1A1A',
            light: '#2D2D2D',
            muted: '#4A4A4A',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        premium: '0 4px 24px -4px rgba(30, 58, 95, 0.12)',
        'premium-lg': '0 12px 48px -8px rgba(30, 58, 95, 0.18)',
      },
      letterSpacing: {
        luxury: '0.08em',
      },
    },
  },
  plugins: [],
};
