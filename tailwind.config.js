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
      },
      borderColor: {
        borderLogin: "#047484 ",
      },
      ringColor: {
        borderRingLogin: " #ccf4fc",
      },
      textColor: {
        blueText: "#3466c4 ",
        blackText: "#161616",
      },
    },
  },
  plugins: [],
};
