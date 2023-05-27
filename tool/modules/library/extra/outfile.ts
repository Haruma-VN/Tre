"use strict";
import { Extra } from "./extra_script.js";
import zlib from "node:zlib";
import fs_js from "../fs/implement.js";

export default function (dir: string | string[], is_folder_check: boolean = false, method: string, key?: string): void {
    if (key) {
        key = key;
    } else {
        key = "";
    }
    function ExtraCompression(dir: string): void {
        const message: str = fs_js.read_file(dir, "utf8");
        const extra = new Extra.Tre.System.Encrypt(message, key);
        switch (method) {
            case "md5":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    extra.MD5Hash(),
                    false,
                );
                break;
            case "sha1":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    extra.Sha1Hash(),
                    false,
                );
                break;
            case "sha3":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    extra.Sha3Hash(),
                    false,
                );
                break;
            case "sha224":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    extra.Sha224Hash(),
                    false,
                );
                break;
            case "sha256":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    extra.Sha256Hash(),
                    false,
                );
                break;
            case "sha384":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    extra.Sha384Hash(),
                    false,
                );
                break;
            case "sha512":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    extra.Sha512Hash(),
                    false,
                );
                break;
            case "xor":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    extra.xorEncrypt(),
                    false,
                );
                break;
            case "base64-encode":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    extra.Base64Decode(),
                    false,
                );
                break;
            case "base64-decode":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    extra.Base64Decode(),
                    false,
                );
                break;
            case "gzip-compress":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    zlib.gzipSync(Buffer.from(fs_js.read_file(dir, "buffer"))),
                    false,
                );
                break;
            case "gzip-decompress":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    zlib.gunzipSync(fs_js.read_file(dir, "buffer")).toString(),
                    false,
                );
                break;
            case "deflate-compress":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    zlib.deflateSync(Buffer.from(fs_js.read_file(dir, "buffer"))),
                    false,
                );
                break;
            case "deflate-decompress":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    zlib.inflateSync(fs_js.read_file(dir, "buffer")).toString(),
                    false,
                );
                break;
            case "zlib-compress":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    zlib.deflateSync(Buffer.from(fs_js.read_file(dir, "buffer")), {
                        level: zlib.constants.Z_BEST_COMPRESSION,
                    }),
                    false,
                );
                break;
            case "zlib-decompress":
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}${fs_js.parse_fs(dir).ext}.bin`,
                    zlib.inflateSync(fs_js.read_file(dir, "buffer")).toString(),
                    false,
                );
                break;
        }
    }
    if (!is_folder_check) {
        if (typeof dir === "string") {
            ExtraCompression(dir);
        } else {
            dir.forEach((file) => {
                ExtraCompression(file);
            });
        }
    } else {
        if (typeof dir === "string") {
            fs_js.full_reader(dir).forEach(async (file_directory: string) => {
                ExtraCompression(file_directory);
            });
        }
    }
    return;
}
