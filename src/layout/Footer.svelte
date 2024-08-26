<script lang="ts">
	import config from "../utils/config";

	const { name, year } = config;
</script>

<div
	class=" bg-gray-700  px-1.5 py-0.5 m-2 cursor-not-allowed select-none  border border-yellow-500 border-opacity-60 rounded-lg shadow-md"
>
	<div
		class=" bg-clip-text text-transparent bg-gradient-to-tr from-yellow-700 to-yellow-400 font-serif italic font-bold  "
	>
		{year} &copy; {name}
	</div>
</div>
