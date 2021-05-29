module.exports = {
	mode: "jit",
	purge: ["./index.html", "./src/**/*.{js,ts,svelte}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				"floating-cogs": "url('/images/floating-cogs.svg')",
			}),
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
};
