<script lang="ts">
	import { onMount } from "svelte";
	import { registerSW } from "virtual:pwa-register";
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";
	import config from "../utils/config";

	onMount(() => {
		registerSW();
	});

	const { name, developer } = config;
</script>

<svelte:head>
	<title>{name} • {developer}</title>
</svelte:head>

<div
	class="bg-floating-cogs bg-gray-700 text-white font-mono h-screen w-screen overflow-y-scroll grid grid-cols-1 place-items-center "
>
	<Header />

	<slot />

	<Footer />
</div>
