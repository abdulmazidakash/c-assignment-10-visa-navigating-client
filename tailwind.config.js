/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#FE9900', // Custom primary color
        secondary: '#F59E0B', // Custom secondary color
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

