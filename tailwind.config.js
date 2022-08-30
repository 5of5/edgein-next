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


const yellow = {
  50: "#FEFBEB",
  100: "#FEF8DD",
  200: "#FCF0B5",
  300: "#FBE993",
  400: "#F9E371",
  500: "#F8DA4B",
  600: "#F6CF0E",
  700: "#BB9D07",
  800: "#7B6705",
  900: "#403602"
}

const slate = {
  50: "#F8FAFC",
  200: "#E2E8F0",
  600: "#475569"
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
        dark,
        gray,
        blue,
        yellow,
        slate,
        transparent: 'transparent',
      },
      borderRadius: {
        '8xl': '4rem',
      },
      spacing: {
        '88': '22rem',
      },
      scale: {
        '102': '1.02',
        '600': '6',
      },
      animation: {
        //blob: 'blob 10s infinite',
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
      transitionTimingFunction: {
        'in-hoverTransition': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      },
      transitionProperty: {
        'transform': 'transform',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}