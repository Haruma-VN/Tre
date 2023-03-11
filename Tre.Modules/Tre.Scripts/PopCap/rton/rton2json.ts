import util from "util";
import { signed, unsigned } from "big-varint";
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import { readjson } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import localization from "../../../Tre.Callback/localization.js";
export default function (rton_data: any): any {
    let index_count = 8;
    let indent_number = 0;
    let currrent_indent = '\r\n';
    let indent = '\t';
    let R0x90List = new Array();
    let R0x92List = new Array();
    const Str_Null = "*";
    const Str_RTID_0 = "RTID(0)";
    const Str_RTID_2 = "RTID(%d.%d.%s@%s)";
    const Str_RTID_3 = "RTID(%s@%s)";
    const config_json = readjson((process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json"));
    let trailing_commas = "";
    if ("allow_trailing_commas" in config_json.json) {
        if (config_json.json.allow_trailing_commas) {
            trailing_commas = ",";
        }
        indent = (config_json.json.space != undefined) ? config_json.json.space : '\t';
    }
    function RtonNumber(unsigned_number, utf8 = false) {
        if (utf8) {
            index_count++;
        };
        let offset_start = index_count;
        let number = rton_data[index_count];
        while (number > 127) {
            number = rton_data[index_count += 1];
        };
        const rton_number = rton_data.slice(offset_start, index_count += 1);

        if (unsigned_number) {
            return `${unsigned.decode(Buffer.from(rton_number, 'hex'))}`;
        }
        else {
            return `${signed.decode(Buffer.from(rton_number, 'hex'))}`;
        }
    }
    ;
    function ReadString(string_length, rtid) {
        let string = rton_data.slice(index_count, index_count += parseInt(string_length)).toString('utf8');
        if (rtid) {
            return string;
        }
        return JSON.stringify(string);
    }
    ;
    function ReadRTID() {
        const rtid_number = rton_data[index_count];
        index_count++;
        switch (rtid_number) {
            case 0:
                return `"${Str_RTID_0}"`;
            case 1:
                const value_1_2 = RtonNumber(true, true);
                const value_1_1 = RtonNumber(true);
                const x16_1 = rton_data.slice(index_count, index_count += 4).reverse().toString('hex');
                return `"${util.format(Str_RTID_2, value_1_1, value_1_2, x16_1, "")}"`;
            case 2:
                const string_temp_rtid2 = ReadString(RtonNumber(true, true), true);
                const value_2_2 = RtonNumber(true);
                const value_2_1 = RtonNumber(true);
                const x16_2 = rton_data.slice(index_count, index_count += 4).reverse().toString('hex');
                return `"${util.format(Str_RTID_2, value_2_1, value_2_2, x16_2, string_temp_rtid2)}"`;
            case 3:
                const string_temp_01 = ReadString(RtonNumber(true, true), true);
                const string_temp_02 = ReadString(RtonNumber(true, true), true);
                return `"${util.format(Str_RTID_3, string_temp_02, string_temp_01)}"`;
            default:
                return `""`;
        }
    }
    ;
    function ReadArray() {
        let items = new Array();
        indent_number++;
        let new_indent = currrent_indent + indent.repeat(indent_number);
        let code = rton_data[index_count];
        while (code !== 254) {
            items.push(ReadByteCode(code));
            code = rton_data[index_count];
        }
        ;
        index_count++;
        indent_number--;
        if (items.length != 0) {
            return `[${new_indent}${items.join(`,${new_indent}`)}${trailing_commas}${currrent_indent}${indent.repeat(indent_number)}]`;
        }
        ;
        return `[]`;
    }
    ;
    function ReadObject() {
        let items = new Array();
        indent_number++;
        let new_indent = currrent_indent + indent.repeat(indent_number);
        let code = rton_data[index_count];
        while (code !== 255) {
            const key = ReadByteCode(code);
            const value = ReadByteCode(rton_data[index_count]);
            items.push(`${key}: ${value}`);
            code = rton_data[index_count];
        }
        ;
        index_count++;
        indent_number--;
        if (items.length != 0) {
            return `{${new_indent}${items.join(`,${new_indent}`)}${trailing_commas}${currrent_indent}${indent.repeat(indent_number)}}`;
        }
        ;
        return `{}`;
    }
    ;
    function ReadByteCode(bytecode) {
        index_count++;
        switch (bytecode) {
            case 0:
                return false;
            case 1:
                return true;
            case 2:
                return Str_Null;
            case 8:
                return rton_data.slice(index_count, index_count += 1).readInt8();
            case 9:
            case 11:
            case 17:
            case 19:
            case 33:
            case 39:
            case 65:
            case 71:
                return 0;
            case 10:
                return rton_data.slice(index_count, index_count += 1).readUInt8();
            case 16:
                return rton_data.slice(index_count, index_count += 2).readInt16LE();
            case 18:
                return rton_data.slice(index_count, index_count += 2).readUInt16LE();
            case 32:
                return rton_data.slice(index_count, index_count += 4).readInt32LE();
            case 34:
                return rton_data.slice(index_count, index_count += 4).readFloatLE();
            case 35:
            case 67:
                return 0.0;
            case 36:
            case 40:
            case 68:
            case 72:
                return RtonNumber(true);
            case 37:
            case 41:
            case 69:
            case 73:
                return RtonNumber(false);
            case 38:
                return rton_data.slice(index_count, index_count += 4).readUInt32LE();
            case 64:
                return rton_data.slice(index_count, index_count += 8).readBigInt64LE();
            case 66:
                return rton_data.slice(index_count, index_count += 8).readDoubleLE();
            case 70:
                return rton_data.slice(index_count, index_count += 8).readBigUInt64LE();
            case 129:
                return ReadString(RtonNumber(true), false);
            case 130:
                return ReadString(RtonNumber(true, true), false);
            case 131:
                return ReadRTID();
            case 132:
                return `"${Str_RTID_0}"`;
            case 133:
                return ReadObject();
            case 134:
                RtonNumber(true);
                return ReadArray();
            case 144:
                const string_length = RtonNumber(true);
                const tempstring = ReadString(string_length, false);
                R0x90List.push(tempstring);
                return tempstring;
            case 145:
                return R0x90List[RtonNumber(true)];
            case 146:
                const tempstring_2 = ReadString(RtonNumber(true, true), false);
                R0x92List.push(tempstring_2);
                return tempstring_2;
            case 147:
                return R0x92List[RtonNumber(true)];
            default:
                TreErrorMessage({ error: localization("rton_bytecode_is_not_supported") + bytecode.toString('hex'), reason: localization("rton_bytecode_is_not_supported") + bytecode.toString('hex'), system: localization("rton_bytecode_is_not_supported") + bytecode.toString('hex') }, localization("rton_bytecode_is_not_supported") + bytecode.toString('hex'));
                return;
        }
        ;
    }
    ;
    if (rton_data.slice(0, 4).toString() == 'RTON') {
        return ReadObject();
    }
    else {
        TreErrorMessage({ error: localization("this_file_is_not_rton"), reason: localization("this_file_is_not_rton"), system: "this_file_is_not_RTON" }, localization("this_file_is_not_rton"));
    }
    ;
}
