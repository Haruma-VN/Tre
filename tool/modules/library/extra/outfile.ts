"use strict";
import { readfile, writefile, read_dir } from "../fs/util.js";
import { Extra } from "./extra_script.js";
import path from "node:path";
import zlib from "node:zlib";
import fs from "node:fs";
import localization from "../../callback/localization.js";
import * as color from "../color/color.js";
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
        const message = readfile(dir);
        const extra = new Extra.Tre.System.Encrypt(message, key);
        switch (method) {
            case "md5":
                writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.MD5Hash()
                );
                break;
            case "sha1":
                writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Sha1Hash()
                );
                break;
            case "sha3":
                writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Sha3Hash()
                );
                break;
            case "sha224":
                writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Sha224Hash()
                );
                break;
            case "sha256":
                writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Sha256Hash()
                );
                break;
            case "sha384":
                writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Sha384Hash()
                );
                break;
            case "sha512":
                writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Sha512Hash()
                );
                break;
            case "xor":
                writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.xorEncrypt()
                );
                break;
            case "base64-encode":
                writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Base64Decode()
                );
                break;
            case "base64-decode":
                writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    extra.Base64Decode()
                );
                break;
            case "gzip-compress":
                await writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    zlib.gzipSync(Buffer.from(readfile(dir)))
                );
                break;
            case "gzip-decompress":
                await writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    zlib.gunzipSync(fs.readFileSync(dir)).toString()
                );
                break;
            case "deflate-compress":
                await writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    zlib.deflateSync(Buffer.from(readfile(dir)))
                );
                break;
            case "deflate-decompress":
                await writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    zlib.inflateSync(fs.readFileSync(dir)).toString()
                );
                break;
            case "zlib-compress":
                await writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    zlib.deflateSync(Buffer.from(readfile(dir)), {
                        level: zlib.constants.Z_BEST_COMPRESSION,
                    })
                );
                break;
            case "zlib-decompress":
                await writefile(
                    `${dir}/../${path.parse(dir).name}${
                        path.parse(dir).ext
                    }.bin`,
                    zlib.inflateSync(fs.readFileSync(dir)).toString()
                );
                break;
        }
    }
    if (!is_folder_check) {
        if (typeof dir === "string") {
            console.log(
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
                console.log(
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
        console.log(
            `${color.fggreen_string(
                "◉ " + localization("execution_out") + ":\n     "
            )} ${path.resolve(`${dir}`)}`
        );
        if (typeof dir === "string") {
            read_dir(dir).forEach(async (file_directory: string) => {
                await ExtraCompression(file_directory);
            });
        }
    }
    return;
}
