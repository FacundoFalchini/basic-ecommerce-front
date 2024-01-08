/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        yellowButton: "#ffd814",
        yellowButtonHover: "#f8bc04",
        bgRingCreate: " #ccf4fc",
        navColor: "#181c24",
        searchButton: "#ffbc6c",
        searchButtonHover: "#f8ac44",
        searchSelectHover: "#d8d4d4",
        searchButtonBorderBg: "#ff9c04",
        optionsBar: "#232f3e",
      },
      borderColor: {
        borderLogin: "#047484 ",
        searchButtonBorder: "#ff9c04",
        serachSelectBorder: "#d0cccc",
      },
      ringColor: {
        borderRingLogin: " #ccf4fc",
        searchButtonBorderRing: "#ff9c04",
      },
      textColor: {
        blueText: "#3466c4 ",
        blackText: "#161616",
        grayText: "#707474",
      },
    },
  },
  plugins: [],
};
