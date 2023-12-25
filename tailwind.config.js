/*eslint-env node*/
/** @type {import("tailwindcss").Config} */
export default {
  darkMode: false,
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    darkMode: true,
    extend: {
      colors: {
        primary: "#015AB8",
        secondary: "#DEDFE0",
        "interface-black": "#000000",
        "interface-dark-1": "#21343D",
        "interface-dark-2": "#657178",
        "interface-white-1": "#FFFFFF",
        "interface-white-2": "#F0F4F5",
      },
      buttons: {
        bipper: {
          borderRadius: '4px',
          flex: '1',
          shadow: 'md',
          outline: '0.5px solid #cacaca',
          justifyContent: 'center',
          alignItems: 'center',
          width: '200px',
          height: '90px',
          borderRadius: '3xl',
          fontSize: '2xl',
          gap: '3',
        },
      },
        fontFamily: {
          bannerCaps: ["Banner-Caps", "sans-serif"],
        },
        boxShadow: {
          "big-shadow": "0px 0px 40px 0px #00000014",
          "small-shadow": "0px 0px 20px 0px #0000001A",
        },
        screens: {
          sm: "320px",
          md: "640px",
          lg: "1080px",
          xl: "1280px",
        },
      },
    },
  };
