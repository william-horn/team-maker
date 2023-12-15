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
        "page": "var(--bg-color-page)",
        "button-primary": "var(--button-color-primary)",
        "button-hover-primary": "var(--button-hover-color-primary)",
        "search-bar": "var(--bg-color-search-bar)",
        "search-bar-list": "var(--bg-color-search-bar-list)",
        "search-bar-result": "var(--bg-color-search-bar-result)",
        "search-bar-result-hover": "var(--bg-color-hover-search-bar-result)",
      },

      textColor: {
        "primary": "var(--text-color-primary)",
        "secondary": "var(--text-color-secondary)",
        "search-bar-result": "var(--text-color-search-bar-result)",
        "search-bar-input": "var(--text-color-search-bar-input)",
        "search-history-result": "var(--text-color-search-history-result)",
        "muted": "var(--text-color-muted)",
        "error": "var(--text-color-error)"
      },
    },
  },
  plugins: [],
}
