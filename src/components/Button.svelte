<script lang="ts">
	export let click: Function;
	export let before: string;
	export let after = "";
	export let disable = false;

	let current = before;

	const handler = (e: MouseEvent) => {
		e.preventDefault();
		if (after) {
			current = after;
		}
		click();
	};
</script>

<button
	on:click={handler}
	class="bg-white hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-200 text-yellow-500 font-semibold px-3 h-7  rounded-xl shadow-md"
	disabled={disable}
>
	{current}
</button>
