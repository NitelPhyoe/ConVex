<script lang="ts">
	import Layout from "./layout/Layout.svelte";
	import CodeContainer from "./components/Code.Container.svelte";
	import FileContainer from "./components/File.Container.svelte";
</script>

<main>
	<Layout>
		<FileContainer />
		<CodeContainer />
	</Layout>
</main>
