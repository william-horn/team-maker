/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        page: "var(--bg-color-page)"
      },

      textColor: {
        primary: "var(--text-color-primary)",
        secondary: "var(--text-color-secondary)",
        muted: "var(--text-color-muted)",
        error: "var(--text-color-error)"
      }
    },
  },
  plugins: [],
}
