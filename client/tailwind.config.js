/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',   // blue
        secondary: '#10B981', // green
        accent: '#F59E0B',    // amber
        bg: '#F9FAFB',        // light background
      },
    },
  },
  plugins: [],
}
