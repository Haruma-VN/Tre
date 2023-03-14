"use strict";
import { SmartBuffer } from "smart-buffer";
import { signed, unsigned } from "big-varint";
import localization from "../../../Tre.Callback/localization.js";
import { fgred_string } from "../../../Tre.Libraries/Tre.Color/color.js";
export default function (rton_data: any): any {
    const json_data = new SmartBuffer();
    const cached_strings:any = new Object();
    let index = 0;
    function RtonNumber(unsigned_number: boolean, signed_number?: boolean) {
        if (signed_number) {
            return Buffer.from(signed.encode(BigInt(unsigned_number)));
        }
        else {
            return Buffer.from(unsigned.encode(BigInt(unsigned_number)));
        }
    }
    function EncodeIntNumber(int: any) {
        if (int == 0) {
            json_data.writeString('21', 'hex');
        }
        else if (int >= 0 && int <= 0xFFFFFFFF) {
            json_data.writeString('24', 'hex').writeBuffer(RtonNumber(int));
        }
        else if (int >= -0x80000000 && int <= 0) {
            json_data.writeString('25', 'hex').writeBuffer(RtonNumber(int, true));
        }
        else if (int >= -0x80000000 && int <= 0x7FFFFFFF) {
            json_data.writeString('20', 'hex').writeInt32LE(int);
        }
        else if (int >= 0 && int <= 0xFFFFFFFF) {
            json_data.writeString('26', 'hex').writeUInt32LE(int);
        }
        else if (int >= 0 && int <= 0xFFFFFFFFFFFFFFFF) {
            json_data.writeString('44', 'hex').writeBuffer(RtonNumber(int));
        }
        else if (int >= -0x8000000000000000 && int <= 0) {
            json_data.writeString('45', 'hex').writeBuffer(RtonNumber(int, true));
        }
        else if (int >= -0x8000000000000000 && int <= 0x7FFFFFFFFFFFFFFF) {
            json_data.writeString('40', 'hex').writeBigInt64LE(int);
        }
        else if (int >= 0 && int <= 0x7FFFFFFFFFFFFFFF) {
            json_data.writeString('46', 'hex').writeBigUInt64BE(int);
        }
        else if (int >= 0) {
            json_data.writeString('24', 'hex').writeBuffer(RtonNumber(int));
        }
        else {
            json_data.writeString('25', 'hex').writeBuffer(RtonNumber(int, true));
        }
    }
    function CheckFloatInfinity(float: number) {
        let floatcheck = new SmartBuffer();
        const floatnumber = floatcheck.writeFloatLE(float).readFloatLE();
        if (floatnumber == Infinity || floatnumber == -Infinity) {
            return false;
        }
        else {
            return true;
        }
    }
    function EncodeFloatNumber(float: number) {
        if (float == 0) {
            json_data.writeString('23', 'hex');
        }
        else if (float >= -340282346638528859811704183484516925440 && float <= 340282346638528859811704183484516925440 || CheckFloatInfinity(float)) {
            json_data.writeString('22', 'hex').writeFloatLE(float);
        }
        else {
            json_data.writeString('42', 'hex').writeDoubleLE(float);
        }
    }
    function EncodeBoolean(boolean:boolean) {
        boolean ? json_data.writeInt8(1) : json_data.writeInt8(0);
    }
    function EncodeUTF8String(string: string) {
        json_data.writeBuffer(RtonNumber(Buffer.byteLength(string) as any)).writeBuffer(RtonNumber(Buffer.byteLength(string) as any)).writeString(string);
    }
    function EncodeRTID(value: any) {
        if (value.includes('@')) {
            const [name_str, type] = value.slice(5, -1).split('@');
            if ((name_str.match(/\./g) || []).length == 2) {
                const [int1, int2, int3] = name_str.split('.');
                json_data.writeString('8302', 'hex');
                EncodeUTF8String(type);
                json_data.writeBuffer(RtonNumber(int2)).writeBuffer(RtonNumber(int1)).writeBuffer(Buffer.from(int3, 'hex').reverse());
            }
            else {
                json_data.writeString('8303', 'hex');
                EncodeUTF8String(type);
                EncodeUTF8String(name_str);
            }
        }
        else {
            json_data.writeString('84', 'hex');
        }
    }
    function EncodeCacheString(string: string) {
        if (string in cached_strings) {
            json_data.writeString('91', 'hex').writeBuffer(RtonNumber((cached_strings[string])));
        }
        else {
            cached_strings[string] = index++ as any;
            json_data.writeString('90', 'hex').writeBuffer(RtonNumber(Buffer.byteLength(string) as any)).writeString(string);
        }
    }
    function EncodeArray(array_value: any) {
        json_data.writeString('86fd', 'hex').writeBuffer(RtonNumber(array_value.length));
        for (let value of array_value) {
            GetValueJson(value);
        }
        ;
        json_data.writeString('fe', 'hex');
    }
    function EncodeObject(rton_value:boolean) {
        json_data.writeString('85', 'hex');
        for (let [key, value] of Object.entries(rton_value)) {
            EncodeCacheString(key);
            GetValueJson(value);
        }
        ;
        json_data.writeString('ff', 'hex');
    }
    function EncodeRootObject() {
        json_data.writeString('RTON\x01\0\0\0');
        for (let [key, value] of Object.entries(rton_data)) {
            EncodeCacheString(key);
            GetValueJson(value);
        }
        ;
        json_data.writeString('ff', 'hex').writeString('DONE');
    }
    function GetValueJson(value: any) {
        switch (typeof value) {
            case 'string':
                if ("RTID()" == value.slice(0, 5) + value.slice(-1)) {
                    EncodeRTID(value);
                    break;
                }
                else {
                    EncodeCacheString(value);
                    break;
                }
            case 'boolean':
                EncodeBoolean(value);
                break;
            case 'number':
                if (Number.isInteger(value)) {
                    EncodeIntNumber(value);
                    break;
                }
                else {
                    EncodeFloatNumber(value);
                    break;
                }
            case 'object':
                if (Array.isArray(value)) {
                    EncodeArray(value);
                    break;
                }
                else if (value == null) {
                    json_data.writeString('84', 'hex');
                    break;
                }
                else {
                    EncodeObject(value);
                    break;
                }
            case undefined:
                json_data.writeString('90\0', 'hex');
                break;
            default:
                console.log(fgred_string("◉ " + localization("excecution_exception"), value));
                break;
        }
    }
    EncodeRootObject();
    return json_data.toBuffer();
}
