<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let worker: Worker;
  let compressedBase64: string = ""; // Holds the LZ-String compressed Base64 string
  let decompressedData: Uint8Array = new Uint8Array(); // Holds the decompressed binary data

  // Initialize the Web Worker
  onMount(() => {
    worker = new Worker(new URL("../..//worker.ts", import.meta.url), {
      type: "module",
    });

    // Listen for messages from the worker
    worker.onmessage = (e: MessageEvent) => {
      const { type, data } = e.data;
      if (type === "compress") {
        compressedBase64 = data as string; // Store the compressed Base64 string
      } else if (type === "decompress") {
        decompressedData = new Uint8Array(data); // Store the decompressed binary data
        // Trigger download of the decompressed file
        const blob = new Blob([decompressedData]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "decompressed_file";
        a.click();
        URL.revokeObjectURL(url);
      }
    };
  });

  async function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      alert("No file selected.");
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      alert(
        "File is too large to process smoothly on mobile. Consider using a smaller file."
      );
      return;
    }

    // Read the file as an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Send the binary data to the worker for compression
    worker.postMessage({ type: "compress", data: uint8Array });
  }

  function handleDecompress() {
    if (!compressedBase64) {
      alert("No compressed data available to decompress.");
      return;
    }

    const test =
      "BoRQgmDmYCIPQMUg7mALgawwewEwwFYAjAgRgCU4AtACwCFgAzMAMQFcBDAYwBNhSQPOgAYA7Mg4BPAHbk6ACRYBlYQEclkAKoBxNgCdhAN2xcCoyZKVcM5NjBlc2kHgA4A6gFFyIADIYAChgAcgAqGAC2PgCSPGB0ANQscB5gAGqqPABSALK42UockAAe4ch5HgCW0h6p/tqGAMJ6Df5UBOTCmTBRAKZERAAsLuHZ8j4EUaIwHkSQHpkAzATaRUo0PuQcIKosGJKiAPIEYJI+jDxGQR7RkgAObABe8qmM2BxuPYZsQWwuhhUVADSmnkMxYdBcYAIBwqABsXICDlRcJlNP5cAMQFFAeFwgA2GhwA5uOg8HzyVpwVTZPRRVLCMQeYBKB7IDxwTThDhseQ8ACcmhcwFSsPCoj50nkwga4Qa5H80qKIHCPRCFUYwgwAE1ARxVKQlNk+f55DRYaRVBVMiBsHB5HoFqoHjBYaIWKRGHoij14pAGiBshUWARbhwwGxkANtHQokR/rgeAArTJuXBorUeKKkUrS25RLha4RoKKaBaQZD8yB6eINXBwE1awwEcJwBYweKGNAwB4PROMEIHA6GSSkNhUbALeQIY1FCBAA==";

    // Send the compressed Base64 string to the worker for decompression
    worker.postMessage({ type: "decompress", data: compressedBase64 });
  }

  onDestroy(() => {
    worker.terminate(); // Terminate the worker when the component is destroyed
  });
</script>

<main>
  <h1>File Compressor</h1>
  <input type="file" on:change={handleFileChange} />
  <button on:click={handleDecompress} disabled={!compressedBase64}
    >Decompress File</button
  >
  {console.log("hey", compressedBase64)}
  {#if compressedBase64}
    <p>Compressed Base64 String Length: {compressedBase64.length}</p>
    {compressedBase64.slice(0, 100)}
  {/if}

  {#if decompressedData.length > 0}
    <p>Decompressed Data Length: {decompressedData.length}</p>
  {/if}
</main>

<style>
  /* Add your styles here */
</style>
