import { defineConfig } from "vite";
import svelte from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	plugins: [
		svelte(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				short_name: "ConVex",
				name: "ConVex by Nitel Phyoe",
				description: "Send file via text",
				icons: [
					{
						src: "images/chrome/chrome-extensionmanagementpage-48-48.png",
						sizes: "48x48",
					},
					{
						src: "images/chrome/chrome-favicon-16-16.png",
						sizes: "16x16",
					},
					{
						src: "images/chrome/chrome-installprocess-128-128.png",
						sizes: "128x128",
					},
					{
						src: "images/firefox/firefox-marketplace-512-512.png",
						sizes: "512x512",
					},
					{
						src: "images/firefox/firefox-marketplace-128-128.png",
						sizes: "128x128",
					},
					{
						src: "images/firefox/firefox-general-256-256.png",
						sizes: "256x256",
					},
					{
						src: "images/firefox/firefox-general-128-128.png",
						sizes: "128x128",
					},
					{
						src: "images/firefox/firefox-general-90-90.png",
						sizes: "90x90",
					},
					{
						src: "images/firefox/firefox-general-64-64.png",
						sizes: "64x64",
					},
					{
						src: "images/firefox/firefox-general-48-48.png",
						sizes: "48x48",
					},
					{
						src: "images/firefox/firefox-general-32-32.png",
						sizes: "32x32",
					},
					{
						src: "images/firefox/firefox-general-16-16.png",
						sizes: "16x16",
					},
				],
				start_url: "/",
				background_color: "#f59e0b",
				display: "standalone",
				scope: "/",
				theme_color: "#f59e0b",
			},
		}),
	],
});
