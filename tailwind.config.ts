import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': {
          'purple': '#130E1C',
          'black': '#111113',
          'light-purple': '#1B1428',
        },
        'interactive': {
          'purple': {
            'dark': '#2B1A46',
            'medium': '#381F5E',
            'light': '#43266D',
          },
        },
        'border': {
          'purple': {
            'dark': '#4F317C',
            'medium': '#603F95',
            'light': '#7B50BE',
          },
        },
        'solid': {
          'purple': {
            'light': '#843CDD',
            'dark': '#772ACD',
          },
        },
        'text': {
          'purple': {
            'dark': '#C6A1FF',
            'light': '#E6DAFF',
          },
        },
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        floating: 'floating 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
