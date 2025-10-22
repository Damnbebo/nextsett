import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury nail business color palette
        nude: {
          50: '#F6EDE4',
          100: '#E8DED1',
          200: '#D4C4B0',
          300: '#C0A98F',
          400: '#AC8E6E',
          500: '#98734D',
          600: '#7A5C3E',
          700: '#5C452F',
          800: '#3E2E20',
          900: '#201711',
        },
        blush: {
          50: '#FDF9F7',
          100: '#F6EDE4',
          200: '#EDDBC8',
          300: '#E4C9AC',
          400: '#DBB790',
          500: '#D2A574',
          600: '#A8845D',
          700: '#7E6346',
          800: '#54422E',
          900: '#2A2117',
        },
        accent: {
          gold: '#D4AF37',
          rose: '#E8B4B8',
          sage: '#9CAF88',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
