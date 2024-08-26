<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let worker: Worker;
  let compressedBase64: string = "";
  let decompressedData: Uint8Array = new Uint8Array();
  let decompressedFilename: string = "";
  let errorMessage: string = "";

  onMount(() => {
    worker = new Worker(new URL("../worker.ts", import.meta.url), {
      type: "module",
    });

    worker.onmessage = (e: MessageEvent) => {
      const { type, data, filename, error } = e.data;
      if (error) {
        errorMessage = `Error: ${error}`;
        return;
      }

      if (type === "compress") {
        compressedBase64 = data as string;
      } else if (type === "decompress") {
        decompressedData = new Uint8Array(data);
        decompressedFilename = filename || "decompressed_file";

        // Create a blob from the decompressed data and trigger a download
        const blob = new Blob([decompressedData]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = decompressedFilename;
        a.click();
        URL.revokeObjectURL(url);
      }
    };
  });

  async function handleFileChange(event: Event) {
    errorMessage = "";
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      alert("No file selected.");
      return;
    }

    if (file.size > 200 * 1024 * 1024) {
      alert(
        "File is too large to process smoothly on mobile. Consider using a smaller file."
      );
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    worker.postMessage({
      type: "compress",
      data: uint8Array,
      filename: file.name,
    });
  }

  function handleDecompress() {
    errorMessage = "";
    if (!compressedBase64) {
      alert("No compressed data available to decompress.");
      return;
    }

    worker.postMessage({ type: "decompress", data: compressedBase64 });
  }

  onDestroy(() => {
    worker.terminate();
  });
</script>

<main>
  <h1>File Compressor</h1>
  <input type="file" on:change={handleFileChange} />
  <button on:click={handleDecompress} disabled={!compressedBase64}
    >Decompress File</button
  >

  {#if compressedBase64}
    <p>Compressed Base64 String Length: {compressedBase64.length}</p>
  {/if}

  {#if decompressedFilename}
    <p>Decompressed Filename: {decompressedFilename}</p>
  {/if}

  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}
</main>

<style>
  /* Add your styles here */
</style>
