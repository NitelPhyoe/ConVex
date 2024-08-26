use base64::{engine::general_purpose, Engine as _};
use js_sys::Uint8Array;
use lzma_rs::{lzma_compress, lzma_decompress};
use serde::{Deserialize, Serialize};
use serde_json;
use std::io::{Cursor, Read, Write};
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize)]
struct CompressedFile {
    name: String,
    data: String,
}

#[wasm_bindgen]
pub fn compress_data_with_filename(data: &[u8], filename: &str) -> String {
    let mut lzma_compressed = Vec::new();
    {
        let mut writer = Cursor::new(&mut lzma_compressed);
        lzma_compress(&mut &data[..], &mut writer).expect("Failed to compress data with LZMA");
    }

    let lzma_compressed_base64 = general_purpose::STANDARD.encode(&lzma_compressed);

    let compressed_file = CompressedFile {
        name: filename.to_string(),
        data: lzma_compressed_base64,
    };

    let json_string = serde_json::to_string(&compressed_file).expect("Failed to serialize JSON");

    let final_base64 = general_purpose::STANDARD.encode(&json_string);

    final_base64
}

#[wasm_bindgen]
pub fn decompress_data_with_filename(compressed_base64: &str) -> Result<JsValue, JsValue> {
    let json_string = general_purpose::STANDARD
        .decode(compressed_base64)
        .map_err(|e| JsValue::from_str(&format!("Base64 decode failed: {:?}", e)))?;

    let compressed_file: CompressedFile = serde_json::from_slice(&json_string)
        .map_err(|e| JsValue::from_str(&format!("JSON parse failed: {:?}", e)))?;

    let lzma_compressed = general_purpose::STANDARD
        .decode(&compressed_file.data)
        .map_err(|e| JsValue::from_str(&format!("Base64 decode failed: {:?}", e)))?;

    let mut decompressed = Vec::new();
    {
        let mut reader = Cursor::new(&lzma_compressed);
        lzma_decompress(&mut reader, &mut decompressed)
            .map_err(|e| JsValue::from_str(&format!("LZMA decompression failed: {:?}", e)))?;
    }

    let result = js_sys::Object::new();
    js_sys::Reflect::set(
        &result,
        &JsValue::from_str("name"),
        &JsValue::from_str(&compressed_file.name),
    )?;
    js_sys::Reflect::set(
        &result,
        &JsValue::from_str("data"),
        &Uint8Array::from(&decompressed[..]),
    )?;

    Ok(JsValue::from(result))
}
