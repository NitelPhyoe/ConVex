<script lang="ts">
	let spo2: number;
	$: flowmeter = Math.max(0, Math.ceil((94 - spo2) / 4));
</script>

<div
	class="bg-yellow-400 space-y-2 divide-dashed divide-y-2 divide-yellow-600 p-3 mx-3  max-w-sm md:max-w-lg lg:max-w-lg xl:max-w-xl shadow-xl rounded-xl"
>
	<!-- Title -->
	<div class="text-2xl font-bold">
		Calculate O<sub class="text-sm">2</sub> Rate
	</div>
	{#if flowmeter}
		{flowmeter}
	{/if}
	<div class="py-2">
		<label class="inline-block relative">
			<span class="text-lg p-1 ">SPO<sub class="text-sm">2</sub>:</span>
			<input
				type="number"
				class=" py-1 px-2.5 border-none placeholder-gray-300 rounded-xl text-yellow-600 focus:ring-2 focus:border-yellow-600 focus:ring-yellow-600 shadow-sm "
				placeholder="95"
				min="0"
				max="99"
				bind:value={spo2}
			/>
			<span
				class="absolute text-yellow-400 inset-y-0 right-0 pr-2 flex items-center "
				>%</span
			>
		</label>
	</div>
</div>
