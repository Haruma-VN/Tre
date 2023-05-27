"use strict";
import rton2json from "./rton2json.js";
import json2rton from "./json2rton.js";
import localization from "../../../callback/localization.js";
import * as color from "../../../library/color/color.js";
import fs_js from "../../../library/fs/implement.js";
import { Console } from "../../../callback/console.js";
import { args } from "../../../implement/arguments.js";

export function popcap_rton_to_json(filepath?: string): void {
    if (!filepath) {
        return;
    }

    if (fs_js.view_io_stream(filepath).isDirectory()) {
        const folder = fs_js.full_reader(filepath);
        fs_js.create_directory(`${filepath}_json`);
        for (let file of folder) {
            if (fs_js.parse_fs(file).ext.toUpperCase() === ".RTON") {
                const jsonpath = `${fs_js.dirname(filepath)}/${fs_js.parse_fs(filepath).name}.json`;
                fs_js.outfile_fs(
                    jsonpath,
                    rton2json(fs_js.read_file(file, "buffer"), false, undefined, file) as any,
                    false,
                );
            }
        }
    } else {
        fs_js.outfile_fs(
            `${fs_js.parse_fs(filepath).dir}/${fs_js.parse_fs(filepath).name}.json`,
            rton2json(fs_js.read_file(filepath, "buffer"), false, undefined, filepath) as any,
            false,
        );
    }
}

export function rton_decrypt_and_decode_to_json(filepath?: string): void {
    if (!filepath) {
        return;
    }
    const rton_cipher_key: string = (
        fs_js.read_json(fs_js.dirname(args.main_js as any) + "/extension/settings/toolkit.json", true) as any
    ).popcap_rton_conversion.rton.rton_cipher;
    Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_key")}: `) + rton_cipher_key);
    if (fs_js.view_io_stream(filepath).isDirectory()) {
        const folder = fs_js.full_reader(filepath);
        fs_js.create_directory(`${filepath}_json`, true);
        for (let file of folder) {
            if (fs_js.parse_fs(file).ext.toUpperCase() === ".RTON") {
                const rton_cipher_file = fs_js.read_file(file, "buffer");
                const jsonpath = `${fs_js.dirname(filepath)}/${fs_js.parse_fs(filepath).name}.json`;
                fs_js.outfile_fs(jsonpath, rton2json(rton_cipher_file as Buffer, true, undefined, file) as any, false);
            }
        }
    } else {
        const rton_cipher_file = (fs_js.read_file(filepath, "buffer"), rton_cipher_key);
        fs_js.outfile_fs(
            `${fs_js.dirname(filepath)}/${fs_js.parse_fs(filepath).name}.json`,
            rton2json(rton_cipher_file as any, true, undefined, filepath),
            false,
        );
    }
}

export function popcap_json_to_rton_and_encrypt(filepath?: string): void {
    if (!filepath) {
        return;
    }
    const rton_cipher_key: string = (
        fs_js.read_json(fs_js.dirname(args.main_js as any) + "/extension/settings/toolkit.json", true) as any
    ).popcap_rton_conversion.rton.rton_cipher;
    Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_key")}: `) + rton_cipher_key);
    if (fs_js.view_io_stream(filepath).isDirectory()) {
        const folder = fs_js.full_reader(filepath);
        fs_js.create_directory(`${filepath}_rton`);
        for (let file of folder) {
            if (fs_js.parse_fs(file).ext.toUpperCase() === ".JSON") {
                const jsonpath = `${filepath}_rton${fs_js.parse_fs(file.slice(filepath.length)).dir}/${
                    fs_js.parse_fs(file.slice(filepath.length)).name
                }.rton`;
                fs_js.outfile_fs(
                    jsonpath,
                    (json2rton(
                        fs_js.read_json(file),
                        true,
                        undefined,
                        `${filepath}_rton${fs_js.parse_fs(file.slice(filepath.length)).dir}/${
                            fs_js.parse_fs(file.slice(filepath.length)).name
                        }.rton`,
                    ) as any,
                    rton_cipher_key),
                    false,
                );
            }
        }
    } else {
        fs_js.outfile_fs(
            `${fs_js.parse_fs(filepath).dir}/${fs_js.parse_fs(filepath).name}.rton`,
            (json2rton(
                fs_js.read_json(filepath),
                true,
                undefined,
                `${fs_js.parse_fs(filepath).dir}/${fs_js.parse_fs(filepath).name}.rton`,
            ) as any,
            rton_cipher_key),
            false,
        );
    }
}

export function popcap_json_to_rton(filepath?: string): void {
    if (!filepath) {
        return;
    }
    if (fs_js.view_io_stream(filepath).isDirectory()) {
        const folder = fs_js.full_reader(filepath);
        fs_js.create_directory(`${filepath}_rton`, true);
        for (let file of folder) {
            if (fs_js.parse_fs(file).ext.toUpperCase() === ".JSON") {
                const jsonpath = `${filepath}_rton${fs_js.parse_fs(file.slice(filepath.length)).dir}/${
                    fs_js.parse_fs(file.slice(filepath.length)).name
                }.rton`;
                fs_js.outfile_fs(
                    jsonpath,
                    json2rton(
                        fs_js.read_json(file),
                        false,
                        undefined,
                        `${filepath}_rton${fs_js.parse_fs(file.slice(filepath.length)).dir}/${
                            fs_js.parse_fs(file.slice(filepath.length)).name
                        }.rton`,
                    ) as any,
                    false,
                );
            }
        }
    } else {
        fs_js.outfile_fs(
            `${fs_js.parse_fs(filepath).dir}/${fs_js.parse_fs(filepath).name}.rton`,
            json2rton(
                fs_js.read_json(filepath),
                false,
                undefined,
                `${fs_js.parse_fs(filepath).dir}/${fs_js.parse_fs(filepath).name}.rton`,
            ) as any,
            false,
        );
    }
}
