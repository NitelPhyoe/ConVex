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
	class="bg-floating-cogs bg-gray-700  h-screen w-screen overflow-y-scroll flex flex-col items-center justify-between"
>
	<!-- Header	 -->
	<div
		class="sticky top-0 select-none backdrop-filter backdrop-blur-md w-full py-1 px-3 md:px-7 inline-flex items-center justify-between  "
	>
		<!-- Logo -->
		<div class="inline-flex items-center  ">
			<img
				class="h-12 w-12 object-fill bg-gradient-to-tr from-yellow-700 to-yellow-400 rounded-full shadow-lg"
				src="/images/logo.png"
				alt="Logo"
			/>
			<div
				class=" bg-clip-text text-transparent bg-gradient-to-tr from-yellow-700 to-yellow-400 font-zcool font-extrabold text-xl tracking-widest pl-2 "
			>
				ConVex
			</div>
		</div>
		<!-- Setting -->
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-8 w-8 text-yellow-500 hover:text-yellow-400 cursor-pointer "
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg>
		</div>
	</div>
	<!-- Main Context -->
	<div
		class="text-white font-mono p-2 flex items-center justify-between flex-col "
	>
		<slot />
	</div>
	<!-- Footer  -->
	<div
		class="bg-gray-700  px-1.5 py-0.5 m-2 cursor-not-allowed select-none  border border-yellow-500 border-opacity-60 rounded-lg shadow-md"
	>
		<div
			class=" bg-clip-text text-transparent bg-gradient-to-tr from-yellow-700 to-yellow-400 font-serif italic font-bold  "
		>
			{year} &copy; {name}
		</div>
	</div>
</div>
