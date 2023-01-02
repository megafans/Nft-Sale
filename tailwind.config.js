// eslint-disable-next-line import/order
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      body: ['Rubik', 'sans-serif'],
      display: ['Montserrat', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: '#EE194B',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      violet: colors.violet,
      green: colors.green,
      purple: '#8447E9',
    },
    extend: {
      backgroundImage: () => ({
        site: "url('/bg-site.webp')",
        footer: "url('/bg-footer.svg')",
        profile: "url('/bg-profile.svg')",
      }),
    },
  },
  plugins: [],
}
