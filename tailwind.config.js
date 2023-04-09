let colors = require("tailwindcss/colors")
delete colors.lightBlue
delete colors.blueGray
delete colors.coolGray
delete colors.warmGray
delete colors.trueGray
colors = { ...colors }


const primary = {
  50: "#f4f4ff",
  100: "#e8e9ff",
  200: "#c6c8ff",
  300: "#a3a7ff",
  400: "#A05FFE",
  500: "#5E41FE",
  600: "#553be5",
  700: "#4731bf",
  800: "#2e207c",
  900: "#20123A",
}

const darkBlue = {
  50: "#f3f2f7",
  100: "#e7e6f0",
  200: "#c3bfd9",
  300: "#9f99c2",
  400: "#425466",
  500: "#0E0067",
  600: "#0d005d",
  700: "#0a2540",
  800: "#08003e",
  900: "#070032",
  950: "#0E0067",
}

const gray = {
  50: "#F2F5FA",
  100: "#eeeef1",
  200: "#d5d5db",
  250: "#E2E8F0",
  300: "#bcbcc5",
  400: "#425466",
  500: "#57586e",
  600: "#4e4f63",
  700: "#414253",
  800: "#343542",
  900: "#2b2b36"
}

const blue = {
  50: "#EFF6FF",
  100: "#DBEAFE",
  200: "#BFDBFE",
  300: "#93C5FD",
  400: "#60A5FA",
  500: "#3B82F6",
  600: "#2563EB",
  700: "#1D4ED8",
  800: "#1B01FE",
  900: "#1E3A8A"
}

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/style.ts"
  ],
  theme: {
    extend: {
      fontSize: {
        'base': '1rem',
      },
      colors: {
        ...colors,
        primary,
        dark: darkBlue,
        gray,
        blue,
        transparent: 'transparent',
      },
      padding: {
        '18': '72px',
      },
      spacing: {
        '88': '22rem',
        '112': '28rem'
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem'
      },
      scale: {
        '102': '1.02',
        '600': '6',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      opacity: {
        '15': '.15',
      },
      boxShadow: {
        'shadow': '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'blob': 'blob 20s infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
      },
      keyframes: {
        'blob': {
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
            transform: 'translateY(40px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
      transitionProperty: {
        'transform': 'transform',
      },
      lineClamp: {
        7: '7',
      }
    },
    fontFamily: {
      'sans': ['Metropolis', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require("@tailwindcss/forms")
  ],
}