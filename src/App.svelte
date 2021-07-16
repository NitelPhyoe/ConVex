<script lang="ts">
	import { onMount } from "svelte";
	import { registerSW } from "virtual:pwa-register";

	import Layout from "./layout/Layout.svelte";
	import CodeContainer from "./components/Code.Container.svelte";
	import FileContainer from "./components/File.Container.svelte";
	import Calculate from "./components/Co2.Calculate.svelte";

	onMount(() => {
		registerSW();
	});
</script>

<main>
	<Layout>
		<FileContainer />
		<!-- <CodeContainer /> -->
		<Calculate />
	</Layout>
</main>
