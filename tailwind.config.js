/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fc',
          400: '#38abf8',
          500: '#0e8fd9',
          600: '#0270b3',
          700: '#035a92',
          800: '#074c79',
          900: '#0c4065',
          950: '#082842',
        },
        brand: {
          blue: '#1E40AF',
          gold: '#F59E0B',
          emerald: '#10B981',
          navy: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(14, 143, 217, 0.25)',
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
      }
    },
  },
  plugins: [],
};
