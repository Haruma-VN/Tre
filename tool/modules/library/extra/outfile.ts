"use strict";
import { Extra } from "./extra_script.js";
import path from "node:path";
import zlib from "node:zlib";
import localization from "../../callback/localization.js";
import * as color from "../color/color.js";
import fs_js from "../fs/implement.js";
import { Console } from "../../callback/console.js";

export default function (
    dir: string | string[],
    is_folder_check: boolean = false,
    method: string,
    key?: string,
    iv?: any,
    mode?: any,
    padding?: any
): void {
    if (key) {
        key = key;
    } else {
        key = "";
    }
    async function ExtraCompression(dir: string): Promise<any> {
        const message: str = fs_js.read_file(dir, "utf8");
        const extra = new Extra.Tre.System.Encrypt(message, key);
        switch (method) {
            case "md5":
                fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.MD5Hash()
                );
                break;
            case "sha1":
                fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Sha1Hash()
                );
                break;
            case "sha3":
                fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Sha3Hash()
                );
                break;
            case "sha224":
                fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Sha224Hash()
                );
                break;
            case "sha256":
                fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Sha256Hash()
                );
                break;
            case "sha384":
                fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Sha384Hash()
                );
                break;
            case "sha512":
                fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Sha512Hash()
                );
                break;
            case "xor":
                fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.xorEncrypt()
                );
                break;
            case "base64-encode":
                fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Base64Decode()
                );
                break;
            case "base64-decode":
                fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Base64Decode()
                );
                break;
            case "gzip-compress":
                await fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    zlib.gzipSync(Buffer.from(fs_js.read_file(dir, "buffer")))
                );
                break;
            case "gzip-decompress":
                await fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    zlib.gunzipSync(fs_js.read_file(dir, "buffer")).toString()
                );
                break;
            case "deflate-compress":
                await fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    zlib.deflateSync(
                        Buffer.from(fs_js.read_file(dir, "buffer"))
                    )
                );
                break;
            case "deflate-decompress":
                await fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    zlib.inflateSync(fs_js.read_file(dir, "buffer")).toString()
                );
                break;
            case "zlib-compress":
                await fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    zlib.deflateSync(
                        Buffer.from(fs_js.read_file(dir, "buffer")),
                        {
                            level: zlib.constants.Z_BEST_COMPRESSION,
                        }
                    )
                );
                break;
            case "zlib-decompress":
                await fs_js.write_file(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    zlib.inflateSync(fs_js.read_file(dir, "buffer")).toString()
                );
                break;
        }
    }
    if (!is_folder_check) {
        if (typeof dir === "string") {
            Console.WriteLine(
                `${color.fggreen_string(
                    "◉ " + localization("execution_out") + ":\n     "
                )} ${path.resolve(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`
                )}`
            );
            ExtraCompression(dir);
        } else {
            dir.forEach((file) => {
                Console.WriteLine(
                    `${color.fggreen_string(
                        "◉ " + localization("execution_out") + ":\n     "
                    )} ${path.resolve(
                        `${dir}/../${path.parse(file).name}${
                            path.parse(file).ext
                        }.bin`
                    )}`
                );
                ExtraCompression(file);
            });
        }
    } else {
        Console.WriteLine(
            `${color.fggreen_string(
                "◉ " + localization("execution_out") + ":\n     "
            )} ${path.resolve(`${dir}`)}`
        );
        if (typeof dir === "string") {
            fs_js.full_reader(dir).forEach(async (file_directory: string) => {
                await ExtraCompression(file_directory);
            });
        }
    }
    return;
}
