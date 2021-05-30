import { Buffer } from "buffer";

type Meta = {
	name: string;
	type: string;
};

export type DpxFile = {
	blob: Blob;
	meta: Meta;
};

export const compressor = async (file: File) =>
	new Promise<string>(async function (resolve, reject) {
		try {
			const raw = await file.arrayBuffer();
			const { name, type } = file;

			const data64 = Buffer.from(raw).toString("base64");
			const meta64 = Buffer.from(JSON.stringify({ name, type })).toString(
				"base64"
			);

			const cpx = await (
				await import("async-lz-string")
			).compressToUTF16(`${meta64};${data64}`);

			resolve(cpx);
		} catch (error) {
			console.log(error);

			reject("File Invalid");
		}
	});

export const decompressor = async (encStr: string) =>
	new Promise<DpxFile>(async function (resolve, reject) {
		try {
			const dpx = await (
				await import("async-lz-string")
			).decompressFromUTF16(encStr);
			const raw = dpx.split(";");
			const meta = JSON.parse(Buffer.from(raw[0], "base64").toString());
			const data = Buffer.from(raw[1], "base64");

			const blob = new Blob([Uint8Array.from(data).buffer], meta);

			const result: DpxFile = {
				blob,
				meta,
			};

			resolve(result);
		} catch (error) {
			reject("Encoded String Invalid");
		}
	});

export const splitString = (string: String, size: number): string[] => {
	var re = new RegExp(".{1," + size + "}", "g");
	return string.match(re) || [];
};
