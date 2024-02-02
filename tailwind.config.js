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
        footerBackToTop: "#37475A",
        footerBgOptions: "#131A22",
        gridGray: "#f7f7f7",
      },
      borderColor: {
        borderLogin: "#047484 ",
        searchButtonBorder: "#ff9c04",
        serachSelectBorder: "#d0cccc",
        footerBorder: "37475A",
        graySelectBorderFooter: "CCCCCC",
        grayResultsBorder: "cccccc",
        gridGray: "#E8E8E8",
      },
      ringColor: {
        borderRingLogin: " #ccf4fc",
        searchButtonBorderRing: "#ff9c04",
      },
      textColor: {
        blueText: "#3466c4 ",
        blackText: "#161616",
        grayText: "#707474",
        grayTextFooter: "#999999",
        whiteTextFooter: "#DDDDDD",
        graySelectTextFooter: "#CCCCCC",
        productsText: "#0F1111",
      },
    },
  },
  plugins: [],
};
