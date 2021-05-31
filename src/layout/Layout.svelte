<script lang="ts">
	import { onMount } from "svelte";
	import { registerSW } from "virtual:pwa-register";

	const year = new Date().getFullYear();
	const name = "ConVex";

	onMount(() => {
		registerSW();
	});
</script>

<div
	class="bg-floating-cogs bg-gray-700 h-screen w-screen text-white font-mono p-2 flex items-center justify-between flex-col overflow-y-scroll"
>
	<!-- Main Context -->
	<slot />
	<!-- Footer  -->
	<div
		class="bg-gray-700 px-1.5 py-0.5 mt-3 cursor-not-allowed select-none  border border-yellow-500 border-opacity-60 rounded-lg shadow-md"
	>
		<div
			class="bg-clip-text text-transparent bg-gradient-to-tr from-yellow-700 to-yellow-400 font-serif italic font-bold  "
		>
			{year} &copy; {name}
		</div>
	</div>
</div>
