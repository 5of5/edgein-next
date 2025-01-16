let colors = require('tailwindcss/colors');
delete colors.lightBlue;
delete colors.blueGray;
delete colors.coolGray;
delete colors.warmGray;
delete colors.trueGray;
colors = { ...colors };

const primary = {
  50: '#f4f4ff',
  100: '#e8e9ff',
  200: '#c6c8ff',
  300: '#a3a7ff',
  400: '#A05FFE',
  500: '#5E41FE',
  600: '#553be5',
  700: '#4731bf',
  800: '#2e207c',
  900: '#20123A',
};

const dark = {
  500: '#1D1D1F',
};

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/style.ts',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      mon_book: ['mon-book', ...defaultTheme.fontFamily.sans],
      mon_b: ['mon-b', ...defaultTheme.fontFamily.sans],
      mon_i: ['mon-i', ...defaultTheme.fontFamily.sans],
      mon_md: ['mon-md', ...defaultTheme.fontFamily.sans],
      mon_sbi: ['mon-sbi', ...defaultTheme.fontFamily.sans],
      mon_t: ['mon-t', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      fontSize: {
        base: '1rem',
      },
      colors: {
        ...colors,
        primary,
        dark: dark,
        gray: {
          25: '#fcfcfc',
        },
        linkedin: '#0A66C2',
        pink: {
          25: '#DE177A',
        },
        transparent: 'transparent',
        dark: {
          50: '#18181B',
          100: '#27272A',
          200: '#3F3F46',
          300: '#52525B',
          400: '#71717A',
          500: '#A1A1AA',
          600: '#D4D4D8',
          700: '#E4E4E7',
          800: '#F4F4F5',
          900: '#FAFAFA',
        },
        custom: {
          dark: '#222222',
        },
      },
      padding: {
        18: '72px',
      },
      spacing: {
        88: '22rem',
        112: '28rem',
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
      },
      scale: {
        102: '1.02',
        600: '6',
      },
      borderRadius: {
        '2lg': '1.125rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      opacity: {
        15: '.15',
      },
      boxShadow: {
        up: ' 0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 -1px 2px -1px rgb(0 0 0 / 0.1);',
        sm: ' 0 1px 2px 0 rgb(0 0 0/ 0.1);',
      },
      animation: {
        blob: 'blob 20s infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
      },
      keyframes: {
        blob: {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '25%': {
            transform: 'translate(20px, -50px) scale(1.1)',
          },
          '50%': {
            transform: 'translate(0, 20px) scale(1)',
          },
          '75%': {
            transform: 'translate(-20px, -15px) scale(0.9)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      transitionProperty: {
        transform: 'transform',
      },
      lineClamp: {
        7: '7',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
  darkMode: 'class',
};
