"use strict";
import localization from "../../../callback/localization.js";
import { fgred_string } from "../../../library/color/color.js";
import rton_cipher from "./rijndael/rton_cipher.js";
import fs_js from "../../../library/fs/implement.js";
import { args } from "../../../implement/arguments.js";
import { Console } from "../../../callback/console.js";
import * as color from "../../../library/color/color.js";
/**
 *
 * @param json_data - Nhận json đã parse;
 * @param cipher - Nhập boolean cipher rton;
 * @returns - Buffer rton;
 */
export default function (json_data: object, cipher: boolean, disable_execute_information: boolean = false): Buffer {
    const cached_strings: any = new Object();
    let cache_index: number = 0;
    const root_rton_w: Array<any> = [Buffer.from("RTON\x01\0\0\0")];
    for (let [key, value] of Object.entries(json_data) as any) {
        root_rton_w.push(encode_string(key as string));
        root_rton_w.push(encode_data(value as any));
    }
    root_rton_w.push(Buffer.from([0xff]));
    root_rton_w.push(Buffer.from("DONE"));
    const rton_data: Buffer = Buffer.concat(root_rton_w);
    if (cipher) {
        const rton_cipher_key: string = (fs_js.read_json(fs_js.dirname(args.main_js as any) + "/extension/settings/toolkit.json", true) as any)
            .popcap_rton_conversion.rton.rton_cipher;
        if (!disable_execute_information) {
            Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_key")}: `) + rton_cipher_key);
        }
        const rton_ciphered: Buffer = rton_cipher(rton_data, rton_cipher_key);
        return rton_ciphered;
    } else {
        return rton_data;
    }
    function encode_data(value: any): Buffer {
        switch (typeof value) {
            case "string":
                if ("RTID()" === value.slice(0, 5) + value.slice(-1)) {
                    return encode_rtid(value as string);
                } else {
                    return encode_string(value as string);
                }
            case "boolean":
                return encode_bool(value as boolean);
            case "number":
                if (Number.isSafeInteger(value) || Number.isInteger(value)) {
                    return encode_int(value as number);
                } else {
                    return encode_float(value as number);
                }
            case "object":
                if (Array.isArray(value)) {
                    return encode_array(value as any);
                } else if (value === null) {
                    return Buffer.from([0x84]);
                } else {
                    return encode_object(value as any);
                }
            default:
                throw new Error(fgred_string("◉ " + localization("excecution_exception"), value));
        }
    }
    function encode_array(value: Array<any>): Buffer {
        const array_spread: Array<any> = [Buffer.from([0x86, 0xfd, ...encode_number(value.length as number)])];
        for (let i = 0; i < value.length; i++) {
            array_spread.push(encode_data(value[i] as any));
        }
        array_spread.push(Buffer.from([0xfe]));
        return Buffer.concat(array_spread);
    }
    function encode_object(value: Object): Buffer {
        const object_spread: Array<any> = [Buffer.from([0x85])];
        for (let [key, obj_value] of Object.entries(value) as any) {
            object_spread.push(encode_string(key as string));
            object_spread.push(encode_data(obj_value as any));
        }
        object_spread.push(Buffer.from([0xff]));
        return Buffer.concat(object_spread);
    }
    function encode_bool(boolean: boolean): Buffer {
        if (boolean) {
            return Buffer.from([0x01]);
        } else {
            return Buffer.from([0x00]);
        }
    }
    function check_infinity(dec: number): boolean {
        const inf_check: Buffer = Buffer.alloc(4);
        inf_check.writeFloatLE(dec);
        const dec_num: number = inf_check.readFloatLE();
        if (dec_num === Infinity || dec_num === -Infinity) {
            return false;
        } else {
            return true;
        }
    }
    function encode_float(dec: number): Buffer {
        if (dec === 0) {
            return Buffer.from([0x23]);
        } else if ((-340282346638528859811704183484516925440n <= dec && dec <= 340282346638528859811704183484516925440n) || check_infinity(dec)) {
            const floatle: Buffer = Buffer.alloc(4);
            floatle.writeFloatLE(dec);
            return Buffer.from([0x22, ...floatle]);
        } else {
            const doublele: Buffer = Buffer.alloc(8);
            doublele.writeDoubleLE(dec);
            return Buffer.from([0x42, ...doublele]);
        }
    }
    function encode_int(num: number): Buffer {
        if (num === 0) {
            return Buffer.from([0x21]);
        } else if (0 <= num && num <= 2097151) {
            return Buffer.from([0x24, ...encode_number(num)]);
        } else if (-1048576 <= num && num <= 0) {
            return Buffer.from([0x25, ...encode_number(-1 - 2 * num)]);
        } else if (-2147483648 <= num && num <= 2147483647) {
            const int32le: Buffer = Buffer.alloc(4);
            int32le.writeInt32LE(num);
            return Buffer.from([0x20, ...int32le]);
        } else if (0 <= num && num <= 4294967295) {
            const uint32le: Buffer = Buffer.alloc(4);
            uint32le.writeUInt32LE(num);
            return Buffer.from([0x26, ...uint32le]);
        } else if (0 <= num && num <= 562949953421311) {
            return Buffer.from([0x44, ...encode_number(num)]);
        } else if (-281474976710656 <= num && num <= 0) {
            return Buffer.from([0x45, ...encode_number(-1 - 2 * num)]);
        } else if (-9223372036854775808n <= num && num <= 9223372036854775807n) {
            const int64le: Buffer = Buffer.alloc(8);
            int64le.writeBigInt64LE(BigInt(num) as bigint);
            return Buffer.from([0x40, ...int64le]);
        } else if (0 <= num && num <= 18446744073709551615n) {
            const uint64le: Buffer = Buffer.alloc(8);
            uint64le.writeBigUInt64LE(BigInt(num) as bigint);
            return Buffer.from([0x40, ...uint64le]);
        } else if (0 <= num) {
            return Buffer.from([0x44, ...encode_number(num)]);
        } else {
            return Buffer.from([0x45, ...encode_number(-1 - 2 * num)]);
        }
    }
    function encode_number(num: number): Array<number> {
        let i: number = num % 128;
        num = Math.floor(num / 128);
        const result: Array<number> = new Array();
        if (num) {
            i += 128;
        }
        result.push(i);
        while (num) {
            i = num % 128;
            num = Math.floor(num / 128);
            if (num) {
                i += 128;
            }
            result.push(i);
        }
        return result;
    }
    function encode_unicode(str: string) {
        return Buffer.from([...encode_number(Buffer.byteLength(str)), ...encode_number(Buffer.byteLength(str)), ...Buffer.from(str)]);
    }
    function encode_rtid(str: string): Buffer {
        if (str.includes("@")) {
            const [name_str, type]: any = str.slice(5, -1).split("@");
            if ((name_str.match(/\./g) || []).length === 2) {
                const [int2, int1, int3]: any = name_str.split(".");
                return Buffer.from([
                    0x83,
                    0x02,
                    ...encode_unicode(type),
                    ...encode_number(Number(int1)),
                    ...encode_number(Number(int2)),
                    ...Buffer.from(int3, "hex").reverse(),
                ]);
            } else {
                return Buffer.from([0x83, 0x03, ...encode_unicode(type), ...encode_unicode(name_str)]);
            }
        } else {
            return Buffer.from([0x84]);
        }
    }
    function encode_string(str: string): Buffer {
        if (str in cached_strings) {
            return Buffer.from([0x91, ...encode_number(cached_strings[str])]);
        } else {
            cached_strings[str] = cache_index++ as number;
            return Buffer.from([0x90, ...encode_number(Buffer.byteLength(str) as number), ...Buffer.from(str)]);
        }
    }
}
