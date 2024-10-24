<script lang="ts">
  import Button from "./Button.svelte";
  import Skeleton from "./SubCon.Skeleton.svelte";
  import Error from "./Error.svelte";
  import { onDestroy, onMount } from "svelte";
  import config from "../utils/config";
  import { chunkString, splitString } from "../utils/convertor.old";
  import { writable } from "svelte/store";

  export let title = "To Other";
  export let fileLabel = "Choose Your File";

  let files: FileList;
  let selectedFile: File;
  let promise: Promise<string>;
  let showResult = false;
  let denyCvt = true;
  let denyCpy = true;
  let resetCpyTxt = false;

  let worker: Worker;
  let compressedBase64: string = "";
  let errorMessage: string = "";
  let isProcessing = writable(false); // Reactive variable for processing state

  onMount(() => {
    worker = new Worker(config.worker_url, { type: "module" });

    worker.onmessage = (e: MessageEvent) => {
      const { type, data, error } = e.data;

      isProcessing.set(false); // Processing is complete when message is received

      if (error) {
        errorMessage = `Error: ${error}`;
        return;
      }

      if (type === "compress") {
        compressedBase64 = data as string;
      }
    };
  });

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

  const convertHandler = async () => {
    errorMessage = "";

    const arrayBuffer = await selectedFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    isProcessing.set(true); // Set processing state to true before starting compression

    worker.postMessage({
      type: "compress",
      data: uint8Array,
      filename: selectedFile.name,
    });

    showResult = true;
    resetCpyTxt = true;
  };

  const copyHandler = async (txt: string) =>
    await navigator.clipboard.writeText(txt ?? compressedBase64);

  onDestroy(() => {
    worker.terminate(); // Terminate the worker when the component is destroyed
  });
</script>

<!-- Container -->
<div
  class="bg-yellow-400 p-3 mx-3 md:mx-0 w-full max-w-sm md:max-w-lg lg:max-w-lg xl:max-w-xl divide-y-2 divide-yellow-600 divide-dashed space-y-2 shadow-xl rounded-xl"
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
        class="focus:outline-none focus:ring-2 focus:ring-yellow-200 border border-gray-200 rounded-md max-w-sm"
      />
    </div>
    <div
      class="w-full space-y-2 md:flex md:flex-col md:items-center lg:space-x-2 xl:justify-center xl:space-y-0 xl:flex-row"
    >
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

  {#if $isProcessing}
    <p>Processing... Please wait.</p>
    <!-- Show processing message -->
  {/if}

  {#if compressedBase64}
    <p>Compressed Base64 String Length: {compressedBase64.length}</p>
  {/if}

  <!-- Result -->
  {#if showResult}
    <div class="py-2 max-h-36 overflow-y-scroll space-y-2">
      {#if $isProcessing}
        <Skeleton />
        <Skeleton />
        <Skeleton />
      {:else if errorMessage.length > 0}
        <Error error={errorMessage} />
      {:else}
        {#each chunkString(compressedBase64, 1200) as chunk, i}
          <!-- Sub Container -->
          <div
            class=" flex justify-between items-center bg-yellow-300 rounded-lg"
          >
            <div
              class="bg-gray-100 text-yellow-500 text-base text-center shadow-md px-2.5 py-0.5 m-1 rounded-xl cursor-default"
            >
              {++i}
            </div>
            <div class="truncate">{chunk}</div>
            <div class="mx-1">
              <Button
                before="Copy"
                after="Copied"
                click={() => copyHandler(chunk)}
              />
            </div>
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</div>
