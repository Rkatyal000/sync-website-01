/** @type {import('tailwindcss').Config} */
export default {
  // The site uses pure CSS theming with CSS variables; Tailwind is only used
  // here for its base reset/normalize (`@tailwind base`) which preserves the
  // exact baseline styling CRA produced. No utility classes are used in
  // application code, so the theme/colors block from the shadcn template has
  // been removed.
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
