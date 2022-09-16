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
  5: "#00000010",
  10: "#475569",
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

const darkblue = {
  600: "#0077B5"
}


// const yellow = {
//   50: "#FEFBEB",
//   100: "#FEF8DD",
//   200: "#FCF0B5",
//   300: "#FBE993",
//   400: "#F9E371",
//   500: "#F8DA4B",
//   600: "#F6CF0E",
//   700: "#BB9D07",
//   800: "#7B6705",
//   900: "#403602"
// }

const purple = {
  50: "#5E41FE"
}

const slate = {
  50: "#F8FAFC",
  200: "#E2E8F0",
  400: "#94A3B8",
  500: "#64748B",
  600: "#475569"
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
        dark,
        gray,
        blue,
        //yellow,
        slate,
        transparent: 'transparent',
        purple,
        darkblue,
      },
      borderRadius: {
        '8xl': '4rem',
      },
      spacing: {
        '88': '22rem',
        '112': '28rem'
      },
      scale: {
        '102': '1.02',
        '600': '6',
      },
      opacity: {
        '15': '.15',
      },
      boxShadow: {
        'shadow': '0px 2px 4px rgba(0, 0, 0, 0.1)',
        'inner-top': 'inset 0px 2px 2px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'blob': 'blob 20s infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
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
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-40px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
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
    },
    fontFamily: {
      'sans': ['Metropolis', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    animationDelay: {
      'none': '0s',
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      400: '400ms',
      500: '500ms',
      600: '600ms',
      700: '700ms',
      800: '800ms',
      900: '900ms',
      1000: '1000ms',
      1100: '1100ms',
      1200: '1200ms',
      1300: '1300ms',
      1400: '1400ms',
      1500: '1500ms',
      2000: '2000ms',
      3000: '3000ms',
      4000: '4000ms',
      5000: '5000ms',
      6000: '6000ms',
      7000: '7000ms',
      8000: '8000ms',
      9000: '9000ms',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}