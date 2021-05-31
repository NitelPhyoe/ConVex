<script lang="ts">
	import Button from "./Button.svelte";
	import BtnSkeleton from "./Btn.Skeleton.svelte";
	import { decompressor, downloadBlob } from "../utils/convertor";
	import type { DpxFile } from "../utils/convertor";

	export const title = "From Other";

	let denyRvt = true;
	let showDownload = false;
	let rcode: string;
	let promise: Promise<DpxFile>;

	$: if (rcode?.length > 10) {
		denyRvt = false;
	} else {
		denyRvt = true;
		showDownload = false;
	}

	const revertHandler = () => {
		showDownload = true;
		promise = decompressor(rcode);
	};
</script>

<!-- Container -->
<div
	class="bg-yellow-400 p-3 mt-5  space-y-2 divide-y-2 divide-yellow-600 divide-dashed shadow-xl rounded-xl"
>
	<!-- Title -->
	<div class="text-2xl font-bold">{title}</div>
	<!-- Body -->
	<div class="flex flex-col">
		<textarea
			bind:value={rcode}
			class="w-80 h-52 max-w-sm md:w-96 md:max-w-lg lg:w-96 lg:h-52 lg:max-w-xl max-h-60 mt-4 mb-3 text-gray-500 text-sm resize border rounded-xl"
		/>
		<div class="flex flex-row justify-between items-center">
			<Button before="Revert" click={revertHandler} disable={denyRvt} />
			{#if showDownload}
				{#await promise}
					<BtnSkeleton />
				{:then { blob, meta: { name } }}
					<Button before="Download" click={() => downloadBlob(blob, name)} />
				{:catch e}
					<div
						class="text-red-500 text-sm bg-yellow-100 rounded-lg shadow-md p-1"
					>
						Error: {e}
					</div>
				{/await}
			{/if}
		</div>
	</div>
</div>
