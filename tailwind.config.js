/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#100F0F",
      primary: {
        200: "#E1F8E1",
        300: "#C8F8C8",
        400: "#16BF16",
        DEFAULT: "#2FB42F",
      },
      secondary: {
        200: "#55F9D5",
        300: "#26E8BE",
        400: "#0BE1B2",
        DEFAULT: "#04DBAC",
        600: "#17B996",
      },
      gray: {
        300: "#fafafa",
        400: "#f2f2f2",
        500: "#e5e5e5",
        600: "#b2b2b2",
        700: "#808080",
        800: "#333333",
        900: "#212020",
        DEFAULT: "#141414",
      },
      alert: {
        danger: "#FF4E4E",
        success: "#10E649",
        warning: "#FEB72F",
      },
    },

    fontSize: {
      "8xl": [
        "58px",
        {
          lineHeight: "80px",
          letterSpacing: "-5px",
          fontWeight: "500",
        },
      ],
      "7xl": [
        "39px",
        {
          lineHeight: "50px",
          letterSpacing: "-2px",
          fontWeight: "600",
        },
      ],
      "6xl": [
        "34px",
        {
          lineHeight: "40px",
          letterSpacing: "-2px",
          fontWeight: "500",
        },
      ],
      "5xl": [
        "29px",
        {
          lineHeight: "38px",
          letterSpacing: "-1.600000023841858px",
          fontWeight: "500",
        },
      ],
      "4xl": [
        "26px",
        {
          lineHeight: "32px",
          letterSpacing: "-0.5px",
          fontWeight: "500",
        },
      ],
      "3xl": [
        "23px",
        {
          lineHeight: "34px",
          letterSpacing: "-0.800000011920929px",
          fontWeight: "500",
        },
      ],
      "2xl": [
        "22px",
        {
          lineHeight: "30px",
          letterSpacing: "-1px",
          fontWeight: "400",
        },
      ],
      xl: [
        "21px",
        {
          lineHeight: "30px",
          letterSpacing: "-1px",
          fontWeight: "400",
        },
      ],
      lg: [
        "20px",
        {
          lineHeight: "30px",
          letterSpacing: "-0.800000011920929px",
          fontWeight: "400",
        },
      ],
      base: [
        "19px",
        {
          lineHeight: "27px",
          fontWeight: "400",
        },
      ],
      sm: [
        "17px",
        {
          lineHeight: "25px",
          fontWeight: "400",
        },
      ],
      caption1: [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "400",
        },
      ],
      caption2: [
        "15px",
        {
          lineHeight: "20px",
          fontWeight: "400",
        },
      ],
      caption3: [
        "14px",
        {
          lineHeight: "18px",
          fontWeight: "400",
        },
      ],
      caption4: [
        "13px",
        {
          lineHeight: "15px",
          fontWeight: "400",
        },
      ],
    },

    borderRadius: {
      DEFAULT: "10px",
      full: "50%",
    },

    extend: {
      boxShadow: {
        "primary-400": "0 0 25px #734FFF",
        "secondary": "0 0 25px",
        "darkgray": "0 0 25px #444",
      },
    },
  },
  darkMode: "class",
  plugins: [],
}

