import init, {
  compress_data_with_filename,
  decompress_data_with_filename,
} from "./convex_wasm/pkg/convex_wasm";

interface WorkerMessage {
  type: "compress" | "decompress";
  data: Uint8Array | string;
  filename?: string;
}

interface WorkerResponse {
  type: "compress" | "decompress";
  data: string | Uint8Array;
  filename?: string;
  error?: string;
}

// Initialize the WASM module
init({
  url: new URL("./convex_wasm/pkg/convex_wasm", import.meta.url),
}).then(() => {
  self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
    const { type, data, filename } = e.data;

    if (type === "compress") {
      if (filename && data instanceof Uint8Array) {
        const compressedStr = compress_data_with_filename(data, filename);
        self.postMessage({
          type: "compress",
          data: compressedStr,
        } as WorkerResponse);
      }
    } else if (type === "decompress") {
      try {
        const result = decompress_data_with_filename(data as string);
        const name = result.name as string;
        const decompressedData = new Uint8Array(result.data as Uint8Array);
        self.postMessage({
          type: "decompress",
          data: decompressedData,
          filename: name,
        } as WorkerResponse);
      } catch (err) {
        self.postMessage({
          type: "decompress",
          error: (err as Error).message,
        } as WorkerResponse);
      }
    }
  };
});

export {};
