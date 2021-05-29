<script lang="ts">
	const title = "To Other";
	let result: string;
	let resultList: string[];
	let file: FileList;
</script>

<!-- Container -->
<div
	class="bg-yellow-400 p-3 mt-5  space-y-2 divide-y-2 divide-yellow-600 divide-dashed shadow-xl rounded-xl"
>
	<!-- Title -->
	<div class="text-2xl font-bold">{title}</div>
	<!-- Body -->
	<div class=" pt-2 pb-2">body</div>
	<!-- Result -->
	{#if result}
		<div
			class=" pt-2 pb-2 overflow-y-scroll  max-w-xs max-h-36 md:max-w-lg lg:max-w-xl space-y-2"
		/>
	{/if}
</div>
