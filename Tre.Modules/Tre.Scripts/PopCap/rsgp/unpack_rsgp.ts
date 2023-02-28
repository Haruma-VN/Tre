import zlib from "zlib";
import rton2json from '../rton/rton2json.js';
import * as color from '../../../Tre.Libraries/Tre.Color/color.js';
import localization from "../../../Tre.Callback/localization.js";
import fs from 'fs-extra';
import { readline_integer } from '../../../Tre.Progress/Readline/util.js';
import { outfile } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import { decode_rgba8888, decode_argb8888, decode_etc1a, decode_pvrtc } from '../../../Tre.Libraries/Tre.Images/util.js';
import { parse } from "node:path";
export default function (rsgp_data: any, rsgp_path: string, decode_image: boolean, decode_rton: boolean, removeinfo: boolean): void {
    const compression_flag = rsgp_data.slice(16, 17).readInt8();
    const part0_Offset = rsgp_data.slice(24, 28).readInt32LE();
    const part0_ZSize = rsgp_data.slice(28, 32).readInt32LE();
    const part0_Size = rsgp_data.slice(32, 36).readInt32LE();
    const part1_Offset = rsgp_data.slice(40, 44).readInt32LE();
    const part1_ZSize = rsgp_data.slice(44, 48).readInt32LE();
    const part1_Size = rsgp_data.slice(48, 52).readInt32LE();
    const info_size = rsgp_data.slice(72, 76).readInt32LE();
    const info_offset = rsgp_data.slice(76, 80).readInt32LE();
    const info_limit = info_size + info_offset;
    let rsgp_file_data: any;
    let exception_json = { "UseTreRSGPInfo": true, "CompressionMethod": true, "Res": [] }; let rsgp_res = new Array(); let image_temp = new Array();
    function Decode_PTX(file_data_size: number, image_width: number, image_height: number, name_path: string): any {
        switch (file_data_size / (image_width * image_height)) {
            case 4:
                console.log(color.fggreen_string(`◉ ${localization("execution_argument")}: ${localization("detect_format_0_unsafe")}. ${parse(name_path).base} ${localization("ios_argb8888")}`));
                return readline_integer(0, 1) === 0 ? decode_rgba8888(`${rsgp_path}/Res/${name_path}`, image_width, image_height) : decode_argb8888(`${rsgp_path}/Res/${name_path}`, image_width, image_height);
            case 1.5:
                return decode_etc1a(`${rsgp_path}/Res/${name_path}`, image_width, image_height);
            case 0.5:
                return decode_pvrtc(`${rsgp_path}/Res/${name_path}`, image_width, image_height);
            default:
                console.log(color.fgred_string("Can\'t decode PTX. Unknown PTX's format"));
                break;
        };
    };
    function Decompression(image: boolean, temp_offset: number, name_path: string): void {
        let express_res: any = { "Path": [], "PTXInfo": { "Id": 0, "Width": 0, "Height": 0 } }; let path = new Array();
        const file_data_offset = rsgp_data.slice(temp_offset - 8, temp_offset - 4).readInt32LE();
        const file_data_size = rsgp_data.slice(temp_offset - 4, temp_offset).readInt32LE();
        let file_data = rsgp_file_data.slice(file_data_offset, file_data_offset + file_data_size);
        if (image) {
            outfile(`${rsgp_path}/Res/${name_path}`, file_data);
            if (decode_image == undefined) {
                console.log(color.fggreen_string(parse(rsgp_path).name));
                console.log('Do you want to decode PTX');
                decode_image = readline_integer(0, 1) == 0 ? false : true;
            };
            const id = rsgp_data.slice(temp_offset, temp_offset + 4).readInt32LE();
            const image_width = rsgp_data.slice(temp_offset + 12, temp_offset + 16).readInt32LE();
            const image_height = rsgp_data.slice(temp_offset + 16, temp_offset + 20).readInt32LE();
            express_res.PTXInfo.Id = id;
            express_res.PTXInfo.Width = image_width;
            express_res.PTXInfo.Height = image_height;
            if (decode_image) {
                Decode_PTX(file_data_size, image_width, image_height, name_path);
                fs.unlinkSync(`${rsgp_path}/Res/${name_path}`);
                name_path = name_path.toUpperCase().replace('.PTX', '.PNG');
            };
        }
        else {
            if (decode_rton == undefined || decode_rton == null || decode_rton == void 0) {
                if (parse(name_path).ext.toUpperCase() == '.RTON') {
                    console.log(color.fggreen_string(parse(rsgp_path).name));
                    console.log('Do you want to decode RTON');
                    decode_rton = readline_integer(0, 1) == 0 ? false : true;
                };
            };
            if (decode_rton) {
                name_path = name_path.toUpperCase().replace('.RTON', '.JSON');
                file_data = rton2json(file_data);
            };
            outfile(`${rsgp_path}/Res/${name_path}`, file_data);
            delete express_res.PTXInfo;
        };
        for (let segment of name_path.split('\\')) { if (segment !== '') { path.push(segment); }; };
        express_res.Path = path;
        rsgp_res.push(express_res);
    };
    function GetSmartPath(image: boolean, temp_offset: number): void {
        let name_path = ""; let name_dict = new Array();
        while (temp_offset < info_limit) {
            let character_byte = rsgp_data.slice(temp_offset, temp_offset += 1);
            let temp_bytes = Buffer.concat([rsgp_data.slice(temp_offset, temp_offset += 3), Buffer.alloc(1)]).readInt32LE() * 4;
            if (character_byte == '\x00') {
                if (temp_bytes != 0) {
                    let name_array: any = new Object();
                    name_array.name = name_path;
                    name_array.key = temp_bytes;
                    name_dict.push(name_array);
                };
                image ? Decompression(true, temp_offset += 12, name_path, temp_offset += 20) : Decompression(false, temp_offset += 12, name_path);
                name_dict.forEach((value, index) => {
                    value.key + info_offset < temp_offset ? name_dict.slice(index, index + 1) : name_path = value.name;
                });
            }
            else {
                if (temp_bytes != 0) {
                    let name_array:any = new Object();
                    name_array.name = name_path;
                    name_array.key = temp_bytes;
                    name_dict.push(name_array);
                    name_path += character_byte.toString();
                }
                else {
                    name_path += character_byte.toString();
                }
            }
        }
    };
    function Unpack_Rsgp(offset: number, size: number, image:boolean, compression: any) {
        try {
            rsgp_file_data = compression ? zlib.unzipSync(rsgp_data.slice(offset, offset + size)) : rsgp_data.slice(offset, offset + size);
            GetSmartPath(image, info_offset);
            exception_json.CompressionMethod = compression;
            exception_json.Res = rsgp_res;
            if (!removeinfo) { outfile(`${rsgp_path}/TreRSGPInfo.json`, JSON.stringify(exception_json, null, '\t')); }
        } catch (error) {
            console.log(error)
        }
    };
    if (part0_ZSize == part0_Size && part0_Size != 0 || part1_ZSize == part1_Size && part1_ZSize != 0 || compression_flag == 1) {
        part1_ZSize != 0 ? Unpack_Rsgp(part1_Offset, part1_ZSize, true, false) : Unpack_Rsgp(part0_Offset, part0_ZSize, false, false);
    }
    else {
        part1_ZSize != 0 ? Unpack_Rsgp(part1_Offset, part1_ZSize, true, true) : Unpack_Rsgp(part0_Offset, part0_ZSize, false, true);
    }
    return;
};
