"use strict";
import localization from "../../../callback/localization.js";
import fs_js from "../../../library/fs/implement.js";
import { args } from "../../../implement/arguments.js";
import rton_plain from "./rijndael/rton_plain.js";
import { SmartBuffer } from "smart-buffer";
import { Console } from "../../../callback/console.js";
import * as color from "../../../library/color/color.js";
import { UnsupportedDataType, UnsupportedFileType } from "../../../implement/error.js";
/**
 *
 * @param rton_data - Nhận rton buffer;
 * @param decipher - Nhập boolean decipher rton;
 * @returns - Buffer json dùng write_file không dùng write_json;
 */
export default function rton2json(
    rton_data: Buffer,
    decipher: boolean,
    disable_execute_information: boolean = false,
    file_path: string,
): Buffer {
    let rton_data_b: any = SmartBuffer.fromBuffer(rton_data);
    const config_json: any = fs_js.read_json(
        fs_js.dirname(args.main_js as any) + "/extension/settings/toolkit.json",
        true,
    );
    if (decipher) {
        const rton_cipher_key: string = config_json.popcap_rton_conversion.rton.rton_cipher;
        if (!disable_execute_information) {
            Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_key")}: `) + rton_cipher_key);
        }
        const rton_decipher = rton_plain(rton_data, rton_cipher_key, file_path);
        rton_data_b = SmartBuffer.fromBuffer(rton_decipher);
    }
    let indent_number: number = 0,
        currrent_indent: string = "\r\n",
        indent: string = "\t",
        R0x90List: any = new Array(),
        R0x92List: any = new Array();
    let trailing_commas = "";
    if ("allow_trailing_commas" in config_json.json) {
        if (config_json.json.allow_trailing_commas) {
            trailing_commas = ",";
        }
        indent = config_json.json.space !== undefined ? config_json.json.space : "\t";
    }
    const Str_Null: string = `"*"`,
        Str_RTID_0: string = `"RTID(0)"`,
        RTON_head = rton_data_b.readString(4);
    if (RTON_head === "RTON") {
        const ver: number = rton_data_b.readUInt32LE();
        return read_object(rton_data_b.readUInt8());
    } else {
        throw new UnsupportedFileType(localization("this_file_is_not_rton"), file_path);
    }
    function read_byte_code(bytecode: number): any {
        switch (bytecode) {
            case 0:
                return false;
            case 1:
                return true;
            case 2:
                return Str_Null;
            case 8:
                return rton_data_b.readInt8();
            case 9:
            case 11:
            case 17:
            case 19:
            case 33:
            case 39:
            case 65:
            case 71:
            case 35:
            case 67:
                return 0;
            case 10:
                return rton_data_b.readUInt8();
            case 16:
                return rton_data_b.readInt16LE();
            case 18:
                return rton_data_b.readUInt16LE();
            case 32:
                return rton_data_b.readInt32LE();
            case 34:
                return rton_data_b.readFloatLE();
            case 36:
            case 40:
            case 68:
            case 72:
                return rton_number(false);
            case 37:
            case 41:
            case 69:
            case 73:
                return rton_number(true);
            case 38:
                return rton_data_b.readUInt32LE();
            case 64:
                return rton_data_b.readBigInt64LE();
            case 66:
                return rton_data_b.readDoubleLE();
            case 70:
                return rton_data_b.readBigUInt64LE();
            case 129:
                return read_string(false);
            case 130:
                return JSON.stringify(read_string(true));
            case 131:
                return read_rtid(rton_data_b.readUInt8());
            case 132:
                return Str_RTID_0;
            case 133:
                return read_object(rton_data_b.readUInt8());
            case 134:
                return read_array(rton_data_b.readUInt8());
            case 144:
                const rx90_string: string = read_string(false);
                R0x90List.push(rx90_string);
                return rx90_string;
            case 145:
                return R0x90List[rton_number(false)];
            case 146:
                const rx92_string: string = JSON.stringify(read_string(true));
                R0x92List.push(rx92_string);
                return rx92_string;
            case 147:
                return R0x92List[rton_number(false)];
            default:
                throw new Error(
                    `${localization("rton_bytecode_is_not_supported")}${bytecode} | ${localization("pos")}: ${
                        rton_data_b.readOffset
                    }`,
                );
        }
    }
    function read_object(bytecode: number): any {
        let items: any = new Array();
        indent_number++;
        let new_indent: string = currrent_indent + indent.repeat(indent_number);
        while (bytecode !== 255) {
            const key: string = read_byte_code(bytecode);
            const value: any = read_byte_code(rton_data_b.readUInt8());
            items.push(`${key}: ${value}`);
            bytecode = rton_data_b.readUInt8();
        }
        indent_number--;
        if (items.length !== 0) {
            return `{${new_indent}${items.join(`,${new_indent}`)}${trailing_commas}${currrent_indent}${indent.repeat(
                indent_number,
            )}}`;
        }
        return `{}`;
    }
    function read_array(bytecode: number): any {
        if (bytecode != 253) {
            throw new Error(`${localization("error_list")}" + " | ${localization("pos")}: ` + rton_data_b.readOffset);
        } else {
            const i_length: number = rton_number(false);
            let items: any = new Array();
            indent_number++;
            let new_indent = currrent_indent + indent.repeat(indent_number);
            bytecode = rton_data_b.readUInt8();
            while (bytecode !== 254) {
                items.push(read_byte_code(bytecode));
                bytecode = rton_data_b.readUInt8();
            }
            indent_number--;
            if (items.length !== 0) {
                return `[${new_indent}${items.join(
                    `,${new_indent}`,
                )}${trailing_commas}${currrent_indent}${indent.repeat(indent_number)}]`;
            }
            return `[]`;
        }
    }
    function read_rtid(rtid_number: number): string {
        switch (rtid_number) {
            case 0:
                return Str_RTID_0;
            case 1:
                const v2: number = rton_number(false);
                const v1: number = rton_number(false);
                const x16: number = rton_data_b.readUInt32LE();
                return `"RTID(${v1}.${v2}.${x16}@)"`;
            case 2:
                const str_2: string = read_string(true);
                const i2: number = rton_number(false);
                const i1: number = rton_number(false);
                const id: string = rton_data_b.readBuffer(4).reverse().toString("hex");
                return `"RTID(${i1}.${i2}.${id}@${str_2})"`;
            case 3:
                const str_1: string = read_string(true);
                return `"RTID(${read_string(true)}@${str_1})"`;
            default:
                throw new UnsupportedDataType(
                    `${localization("unsupported_83")} ${localization("pos")} ~ ${rton_data_b.readOffset}`,
                    file_path,
                );
        }
    }
    function rton_number(signed_number: boolean): number {
        let num: number = rton_data_b.readUInt8(),
            result: number = num & 127,
            i: number = 128;
        while (num > 127) {
            num = rton_data_b.readUInt8();
            result += i * (num & 127);
            i *= 128;
        }
        if (signed_number) {
            if (result % 2) {
                result = -result - 1;
            }
            result = Math.floor(result / 2);
        }
        return result;
    }
    function read_string(utf8: boolean): string {
        const str_length: number = rton_number(false);
        if (utf8) {
            let i_length: number = rton_number(false);
            const str: string = rton_data_b.readString(i_length);
            if (str_length !== str.length) {
                throw new UnsupportedDataType(
                    `${localization("utf8_string_length_break")} | ${localization("pos")}: ` +
                        (rton_data_b.readOffset - 2),
                    file_path,
                );
            }
            return str;
        } else {
            const str: string = JSON.stringify(rton_data_b.readString(str_length));
            return str;
        }
    }
}
