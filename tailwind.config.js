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
  50: '#f4f4f4',
  100: '#e8e8e9',
  200: '#c7c7c7',
  300: '#a5a5a5',
  400: '#616162',
  500: '#1D1D1F',
  600: '#1a1a1c',
  700: '#161617',
  800: '#111113',
  900: '#0e0e0f',
};

const blue = {
  50: '#EFF6FF',
  100: '#DBEAFE',
  200: '#BFDBFE',
  300: '#93C5FD',
  400: '#60A5FA',
  500: '#3B82F6',
  600: '#2563EB',
  700: '#1D4ED8',
  800: '#1B01FE',
  900: '#1C01B7',
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
        blue,
        pink: {
          25: '#DE177A',
        },
        transparent: 'transparent',
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
};
