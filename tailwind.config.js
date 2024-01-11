/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,vue,tsx}"],
  theme: {
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      white: "#fff",
      black: "#000",
      gray: {
        DEFAULT: "#8492a6",
        50: "rgb(249 250 251)",
        200: "rgb(229 231 235)",
      },
      primary: {
        DEFAULT: "#1c4622",
        light: "#398744",
        dark: "#1c4622",
      },
      secondary: {
        DEFAULT: "#5f6c91",
        light: "#f8fafd",
      },
    },
    opacity: {
      0: "0",
      20: "0.2",
      30: "0.3",
      40: "0.4",
      60: "0.6",
      80: "0.8",
      100: "1",
    },
    keyframes: {
      overlayShow: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      contentShow: {
        from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
        to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
      },
      enterFromRight: {
        from: { opacity: 0, transform: "translateX(200px)" },
        to: { opacity: 1, transform: "translateX(0)" },
      },
      enterFromLeft: {
        from: { opacity: 0, transform: "translateX(-200px)" },
        to: { opacity: 1, transform: "translateX(0)" },
      },
      exitToRight: {
        from: { opacity: 1, transform: "translateX(0)" },
        to: { opacity: 0, transform: "translateX(200px)" },
      },
      exitToLeft: {
        from: { opacity: 1, transform: "translateX(0)" },
        to: { opacity: 0, transform: "translateX(-200px)" },
      },
      scaleIn: {
        from: { opacity: 0, transform: "rotateX(-10deg) scale(0.9)" },
        to: { opacity: 1, transform: "rotateX(0deg) scale(1)" },
      },
      scaleOut: {
        from: { opacity: 1, transform: "rotateX(0deg) scale(1)" },
        to: { opacity: 0, transform: "rotateX(-10deg) scale(0.95)" },
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      fadeOut: {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
      slideDownAndFade: {
        from: { opacity: 0, transform: "translateY(-2px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
      slideLeftAndFade: {
        from: { opacity: 0, transform: "translateX(2px)" },
        to: { opacity: 1, transform: "translateX(0)" },
      },
      slideUpAndFade: {
        from: { opacity: 0, transform: "translateY(2px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
      slideRightAndFade: {
        from: { opacity: 0, transform: "translateX(-2px)" },
        to: { opacity: 1, transform: "translateX(0)" },
      },
    },
    animation: {
      overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      scaleIn: "scaleIn 200ms ease",
      scaleOut: "scaleOut 200ms ease",
      fadeIn: "fadeIn 200ms ease",
      fadeOut: "fadeOut 200ms ease",
      enterFromLeft: "enterFromLeft 250ms ease",
      enterFromRight: "enterFromRight 250ms ease",
      exitToLeft: "exitToLeft 250ms ease",
      exitToRight: "exitToRight 250ms ease",
      slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideRightAndFade:
        "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
    extend: {},
  },
  plugins: [],
};
