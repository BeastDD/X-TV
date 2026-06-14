// Tailwind config with neon extensions
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