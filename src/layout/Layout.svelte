<script lang="ts">
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";
	import config from "../utils/config";

	const { name, developer } = config;
</script>

<svelte:head>
	<title>{name} • {developer}</title>
</svelte:head>

<div
	class="bg-floating-cogs bg-gray-700 text-white font-mono flex flex-col h-screen justify-between items-center overflow-y-scroll"
>
	<Header />

	<div
		class="w-full flex flex-wrap lg:flex-nowrap justify-center items-center space-y-4 lg:space-y-0 lg:space-x-4 "
	>
		<slot />
	</div>
	<Footer />
</div>
