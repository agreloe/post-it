import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        secondary: {
          light: 'var(--color-secondary-light)',
          dark: 'var(--color-secondary-dark)',
        },
        background: {
          light: 'var(--color-background-light)',
          dark: 'var(--color-background-dark)',
        },
        text: {
          light: 'var(--color-text-light)',
          dark: 'var(--color-text-dark)',
        },
      },
      borderColor: {
        light: 'var(--color-primary-light)',
        dark: 'var(--color-primary-dark)',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
      },
      animation: {
        bounce: 'bounce 1s infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

export default config;
