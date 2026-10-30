/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#16211d',
        forest: '#123f32',
        emerald: '#16805f',
        canvas: '#f6f7f4',
        line: '#e7eae5',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        soft: '0 12px 35px rgba(22, 33, 29, 0.055)',
        card: '0 2px 8px rgba(22, 33, 29, 0.035), 0 14px 32px rgba(22, 33, 29, 0.035)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 400ms ease-out both',
      },
    },
  },
  plugins: [],
};
