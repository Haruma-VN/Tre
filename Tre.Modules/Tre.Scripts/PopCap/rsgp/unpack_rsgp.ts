"use strict";
import { SmartBuffer } from "smart-buffer";
import zlib from 'zlib';
import fs from 'fs-extra';
import * as color from '../../../Tre.Libraries/Tre.Color/color.js';
import { outfile } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import { parse } from "node:path";
import { readline_integer } from '../../../../Tre.Modules/Tre.Progress/Readline/util.js';
import { TreErrorMessage } from '../../../../Tre.Modules/Tre.Debug/Tre.ErrorSystem.js';
import { decode_rgba8888, decode_argb8888, decode_etc1a, decode_pvrtc } from '../../../Tre.Libraries/Tre.Images/util.js';
import { readfilebuffer } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import localization from "../../../Tre.Callback/localization.js";
import path from "path";
export default async function (file_input: string, arg: number): Promise<any> {
    const buffer: any = readfilebuffer(file_input);
    const rsgp = SmartBuffer.fromBuffer((buffer));
    const id = rsgp.readInt32LE();
    const version = rsgp.readInt32LE();
    const size = rsgp.readInt32LE();
    const pool_Index = rsgp.readInt32LE();
    const flags = rsgp.readInt32LE();
    const fileOffset = rsgp.readInt32LE();
    const part0_Offset = rsgp.readInt32LE();
    const part0_ZSize = rsgp.readInt32LE();
    const part0_Size = rsgp.readInt32LE();
    const part0_Size2 = rsgp.readInt32LE();
    const part1_Offset = rsgp.readInt32LE();
    const part1_ZSize = rsgp.readInt32LE();
    const part1_Size = rsgp.readInt32LE();
    rsgp.readInt32LE();
    rsgp.readInt32LE();
    rsgp.readInt32LE();
    rsgp.readInt32LE();
    rsgp.readInt32LE();
    const info_size = rsgp.readInt32LE();
    const info_offset = rsgp.readInt32LE();
    const info_limit = info_size + info_offset;
    let rsgp_unpacked: any = new Array();
    let exception_json: any = { "UseTreRSGPInfo": true, "CompressionMethod": "", "Res": [] };
    let rsgp_res = new Array();
    const unpack_folder_name_for_in_use = `${file_input}/../${path.parse(file_input).name}.rsg`
    let rsgp_data: any = "";
    function Unpack_Rsgp(offset: number, size: number, image: boolean, compression: boolean) {
        exception_json.CompressionMethod = compression;
        async function Decompression_Data(temp_offset: number, name_path: string) {
            let express_res: { Path: string[], PTXInfo: any } = { "Path": [], "PTXInfo": { "Id": 0, "Width": 0, "Height": 0 } };
            let path = new Array();
            for (let segment of name_path.split('\\')) {
                if (segment !== '') {
                    path.push(segment);
                };
            };
            express_res.Path = path;
            rsgp_res.push(express_res);
            const file_data_offset = rsgp.toBuffer().slice(temp_offset - 8, temp_offset - 4).readInt32LE();
            const file_data_size = rsgp.toBuffer().slice(temp_offset - 4, temp_offset).readInt32LE();
            const file_data = rsgp_data.slice(file_data_offset, file_data_offset + file_data_size);
            outfile(`${unpack_folder_name_for_in_use}/Res/${name_path}`, file_data);
            if (image === true) {
                const id = rsgp.toBuffer().slice(temp_offset, temp_offset + 4).readInt32LE();
                const image_width = rsgp.toBuffer().slice(temp_offset + 12, temp_offset + 16).readInt32LE();
                const image_height = rsgp.toBuffer().slice(temp_offset + 16, temp_offset + 20).readInt32LE();
                express_res.PTXInfo.Id = id;
                express_res.PTXInfo.Width = image_width;
                express_res.PTXInfo.Height = image_height;
                async function Decode_PTX() {
                    switch (file_data_size / (image_width * image_height)) {
                        case 4:
                            console.log(color.fggreen_string(`◉ ${localization("execution_argument")}: ${localization("detect_format_0_unsafe")}. ${parse(name_path).base} ${localization("ios_argb8888")}`));
                            await readline_integer(0, 1) === 0 ? await decode_rgba8888(`${unpack_folder_name_for_in_use}/Res/${name_path}`, image_width, image_height) : await decode_argb8888(`${unpack_folder_name_for_in_use}/Res/${name_path}`, image_width, image_height);
                            await fs.unlinkSync(`${unpack_folder_name_for_in_use}/Res/${name_path}`);
                            break;
                        case 1.5:
                            await decode_etc1a(`${unpack_folder_name_for_in_use}/Res/${name_path}`, image_width, image_height);
                            await fs.unlinkSync(`${unpack_folder_name_for_in_use}/Res/${name_path}`);
                            break;
                        case 0.5:
                            await decode_pvrtc(`${unpack_folder_name_for_in_use}/Res/${name_path}`, image_width, image_height);
                            await fs.unlinkSync(`${unpack_folder_name_for_in_use}/Res/${name_path}`);
                            break;
                        default:
                            console.log(color.fgred_string("Can\'t decode PTX. Unknown PTX's format"));
                            break;
                    };
                };
                (typeof arg === "number" && arg === 1) ? await Decode_PTX() : {};
            }
            else {
                delete express_res.PTXInfo;
            }
        }
        function GetSmartPath() {
            let temp_offset = info_offset;
            let name_path = "";
            let name_dict = new Array();
            while (temp_offset < info_limit) {
                let character_byte = rsgp.toBuffer().slice(temp_offset, temp_offset + 1);
                let temp_bytes = Buffer.from(rsgp.toBuffer().slice(temp_offset + 1, temp_offset + 4).toString('hex') + '00', 'hex').readInt32LE() * 4;
                if (parseInt(character_byte.toString('hex'), 16) != 0) {
                    if (temp_bytes != 0) {
                        let name_array: { name?: string, key?: number } = new Object();
                        name_array.name = name_path;
                        name_array.key = temp_bytes;
                        name_dict.push(name_array);
                        name_path += character_byte.toString();
                        temp_offset += 4;
                    }
                    else {
                        name_path += character_byte.toString();
                        temp_offset += 4;
                    };
                }
                else if (parseInt(character_byte.toString('hex'), 16) == 0) {
                    image === true ? Decompression_Data(temp_offset += 16, name_path, temp_offset += 20) : Decompression_Data(temp_offset += 16, name_path);
                    name_dict.forEach((value, index) => {
                        value.key + info_offset < temp_offset ? name_dict.slice(index, index + 1) : name_path = value.name;
                    })
                }
            }
        };
        try {
            compression === true ? rsgp_data = zlib.unzipSync(rsgp.toBuffer().slice(offset, offset + size)) : rsgp_data = rsgp.toBuffer().slice(offset, offset + size);
            GetSmartPath();
        } catch (error: any) {
            TreErrorMessage({ error: localization("native_error_unpack_header_null"), reason: localization("unknown_compression_flag"), system: error.toString() }, localization("unknown_compression_flag"));
            return;
        };
    }
    function Check_Compression() {
        if (part0_ZSize == part0_Size && part0_Size != 0 || part1_ZSize == part1_Size && part1_ZSize != 0) {
            part1_ZSize != 0 ? Unpack_Rsgp(part1_Offset, part1_ZSize, true, false) : Unpack_Rsgp(part0_Offset, part0_ZSize, false, false);
        }
        else {
            part1_ZSize != 0 ? Unpack_Rsgp(part1_Offset, part1_ZSize, true, true) : Unpack_Rsgp(part0_Offset, part0_ZSize, false, true);
        }
    }
    Check_Compression();
    exception_json.Res = rsgp_res;
    rsgp_unpacked.Treinfo = exception_json;
    return rsgp_unpacked;
};