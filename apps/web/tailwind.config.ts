// Legacy Tailwind v3 config (kept only for any tooling that still reads it).
// Primary theme, colors, and ALL CSS variables (including shadcn neutral + custom neon)
// are now defined in app/globals.css using modern Tailwind v4 syntax
// (@import "tailwindcss"; + @theme + full :root vars).
// The v4 PostCSS plugin (@tailwindcss/postcss) is the active processor.
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#a855f7',
          cyan: '#22d3ee',
        }
      }
    }
  }
};