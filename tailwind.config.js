/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,svelte}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "floating-cogs": "url('/images/floating-cogs.svg')",
      }),
      fontFamily: {
        zcool: ['"ZCOOL KuaiLe"', "cursive"],
      },
    },
  },

  plugins: [],
};
