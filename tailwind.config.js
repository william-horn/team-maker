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
        // General
        "landing-page": "var(--bg-color-landing-page)",
        "button-primary": "var(--bg-color-button-primary)",
        "button-hover-primary": "var(--bg-color-button-primary-hover)",

        // Search bar
        "search-bar": "var(--bg-color-search-bar)",
        "search-bar-dropdown": "var(--bg-color-search-bar-dropdown)",
        "search-bar-result": "var(--bg-color-search-bar-result)",
        "search-bar-result-hover": "var(--bg-color-hover-search-bar-result)",

        // General background colors
        "primary": "var(--bg-color-primary)",
        "primary-inset": "var(--bg-color-primary-inset)",
        "secondary": "var(--bg-color-secondary)",
        "secondary-inset": "var(--bg-color-secondary-inset)",

        // Scrollbar
        "scrollbar": "var(--bg-color-scroll-bar)",
        "scrollbar-hover": "var(--bg-color-scroll-bar-hover)",
      },

      fontFamily: {
        "gf-1": "var(--google-font-1)",
        "gf-2": "var(--google-font-2)",
      },

      textColor: {
        // General
        "primary": "var(--text-color-primary)",
        "muted": "var(--text-color-muted)",
        "error": "var(--text-color-error)",

        // Search bar
        "search-bar-result": "var(--text-color-search-bar-result)",
        "search-bar-input": "var(--text-color-search-bar-input)",
        "search-history-result": "var(--text-color-search-history-result)",
      },
    },
  },
  plugins: [],
}
