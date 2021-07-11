<script lang="ts">
	import { onMount } from "svelte";
	import { registerSW } from "virtual:pwa-register";

	import Layout from "./layout/Layout.svelte";
	import CodeContainer from "./components/Code.Container.svelte";
	import FileContainer from "./components/File.Container.svelte";

	onMount(() => {
		registerSW();
	});
</script>

<main>
	<Layout>
		<FileContainer />
		<CodeContainer />
	</Layout>
</main>
