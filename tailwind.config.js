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
  600: "#171fe6",
  700: "#141abf",
  800: "#101499",
  900: "#0d117d",
}

const dark = {
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
}

const gray = {
  50: "#F2F5FA",
  100: "#eeeef1",
  200: "#d5d5db",
  300: "#bcbcc5",
  400: "#425466",
  500: "#57586e",
  600: "#4e4f63",
  700: "#414253",
  800: "#343542",
  900: "#2b2b36"
}

const blue = {
  50: "#f4f4ff",
  100: "#e8e9ff",
  200: "#c6c8ff",
  300: "#a3a7ff",
  400: "#5f64ff",
  500: "#1A22FF",
  600: "#171fe6",
  700: "#141abf",
  800: "#101499",
  900: "#0d117d"
}

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Metropolis', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    extend: {
      fontSize: {
        'base': '1rem',
      },
      colors: {
        ...colors,
        primary,
        blue,
        dark,
        gray,
      },
      borderRadius: {
        '8xl': '4rem',
        '14xl': '7rem',
      },
      width: {
        'full2': '200%',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      minHeight: {
        '48': '12rem',
      },
      scale: {
        '102': '1.02',
      },
      boxShadow: {
        // '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        'right-bottom': [
          '5.5px 2.9px 3px rgba(0, 0, 0, 0.038)',
          '15.2px 7.9px 8.4px rgba(0, 0, 0, 0.055)',
          '36.5px 19px 20.2px rgba(0, 0, 0, 0.072)',
          '121px 63px 67px rgba(0, 0, 0, 0.11)'
        ],
        'light-to-dark': [
          '-10px -10px 15px rgba(255, 255, 255, 0.5)',
          '10px 10px 15px rgba(70, 70, 70, 0.12)',
          'inset -10px -10px 15px rgba(255, 255, 255, 0.5)',
          'inset 10px 10px 15px rgba(70, 70, 70, 0.12)'
        ],
        'card-large': [
          '0 30px 60px -12px rgba(50,50,93,0.25)',
          '0 18px 36px -18px rgba(0,0,0,0.3)'
        ],
      },
      // animation: {
      //   blob: 'blob 10s infinite',
      // },
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
      },
      transitionTimingFunction: {
        'in-hoverTransition': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      },
      transitionProperty: {
        'transform': 'transform',
      }
    },
  },
  plugins: [],
}