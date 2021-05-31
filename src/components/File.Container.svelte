<script lang="ts">
	import Button from "./Button.svelte";
	import Skeleton from "./SubCon.Skeleton.svelte";
	import Error from "./Error.svelte";
	import { compressor, splitString } from "../utils/convertor";

	export const title = "To Other";
	export const fileLabel = "Choose Your File";

	let files: FileList;
	let selectedFile: File;
	let promise: Promise<string>;
	let showResult = false;
	let denyCvt = true;
	let denyCpy = true;
	let resetCpyTxt = false;

	// Check file exist
	$: if (files) {
		selectedFile = files[0];
		denyCvt = false;
		resetCpyTxt = false;
	}

	// Check result exist
	$: if (showResult) {
		denyCpy = false;
	}

	const convertHandler = () => {
		promise = compressor(selectedFile);
		showResult = true;
		resetCpyTxt = true;
	};

	const copyHandler = async (txt: string) =>
		await navigator.clipboard.writeText(txt ?? (await promise));
</script>

<!-- Container -->
<div
	class="bg-yellow-400 p-3 mt-5  space-y-2 divide-y-2 divide-yellow-600 divide-dashed shadow-xl rounded-xl"
>
	<!-- Title -->
	<div class="text-2xl font-bold">{title}</div>
	<!-- Body -->
	<div
		class=" pt-2 pb-2 flex flex-col md:flex-row md:items-end md:space-x-2 space-y-2"
	>
		<div class="flex flex-col">
			<label for="cfile" class="pb-2">
				{fileLabel}
			</label>
			<input
				bind:files
				id="cfile"
				type="file"
				class="focus:outline-none focus:ring-2 focus:ring-yellow-200 border border-gray-200 rounded-md max-w-sm "
			/>
		</div>
		<div class="space-x-2">
			<Button before="Convert" click={convertHandler} disable={denyCvt} />
			<Button
				before="Copy All"
				after="Copied"
				click={copyHandler}
				disable={denyCpy}
				resetTxt={resetCpyTxt}
			/>
		</div>
	</div>

	<!-- Result -->
	{#if showResult}
		<div
			class=" py-2 overflow-y-scroll  max-w-xs max-h-36 md:max-w-lg lg:max-w-xl space-y-2"
		>
			{#await promise}
				<Skeleton />
				<Skeleton />
			{:then result}
				{#each splitString(result, 1200) as chunk, i}
					<!-- Sub Container -->
					<div
						class=" flex justify-between items-center bg-yellow-300 rounded-lg"
					>
						<div
							class="bg-gray-100 text-yellow-500 text-base text-center shadow-md  px-2.5 py-0.5 m-1 rounded-xl cursor-default"
						>
							{++i}
						</div>
						<div class="truncate">{chunk}</div>
						<div class="mx-1 ">
							<Button
								before="Copy"
								after="Copied"
								click={() => copyHandler(chunk)}
							/>
						</div>
					</div>
				{/each}
			{:catch e}
				<Error error={e} />
			{/await}
		</div>
	{/if}
</div>
