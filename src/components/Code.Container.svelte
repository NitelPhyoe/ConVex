<script lang="ts">
  import Button from "./Button.svelte";
  import BtnSkeleton from "./Btn.Skeleton.svelte";
  import Error from "./Error.svelte";
  import { decompressor, downloadBlob } from "../utils/convertor.old";
  import type { DpxFile } from "../utils/convertor.old";

  export let title = "From Other";

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
  class="bg-yellow-400 p-3 mx-3 md:mx-0 w-full max-w-sm md:max-w-lg lg:max-w-lg xl:max-w-xl divide-y-2 divide-yellow-600 divide-dashed space-y-2 shadow-xl rounded-xl"
>
  <!-- Title -->
  <div class="text-2xl font-bold">{title}</div>
  <!-- Body -->
  <div class="flex flex-col">
    <textarea
      bind:value={rcode}
      class="h-56 text-gray-500 mt-4 mb-3 text-sm resize-none border rounded-xl"
    />
    <div class="flex flex-row justify-between items-center">
      <Button before="Revert" click={revertHandler} disable={denyRvt} />
      {#if showDownload}
        {#await promise}
          <BtnSkeleton />
        {:then { blob, meta: { name } }}
          <Button before="Download" click={() => downloadBlob(blob, name)} />
        {:catch e}
          <Error error={e} />
        {/await}
      {/if}
    </div>
  </div>
</div>
