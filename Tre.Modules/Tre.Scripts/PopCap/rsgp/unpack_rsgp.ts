import zlib from "zlib";
import rton2json from '../rton/rton2json.js';
import * as color from '../../../Tre.Libraries/Tre.Color/color.js';
import { readline_integer } from '../../../Tre.Progress/Readline/util.js';
import * as fs from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import { parse } from "node:path";
import DecodePTX from "./decode_ptx.js";
export default async function (rsgp_data: any, rsgp_path: string, decode_image:string = 'no', decode_rton:string = 'no', remove_info:boolean = false) {
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
    let treRSGPinfo:any = { "UseTreRSGPInfo": true, "CompressionMethod": true, "Res": [] };
    async function DecodeRTON(rton_data) {
        return await rton2json(rton_data);
    }
    async function WriteFile(name_path: string, temp_offset: number, atlas: boolean) {
        const rton_decode = name_path.endsWith(".RTON") ? true : false;
        const file_data_offset = rsgp_data.slice(temp_offset - 8, temp_offset - 4).readInt32LE();
        const file_data_size = rsgp_data.slice(temp_offset - 4, temp_offset).readInt32LE();
        if (atlas) {
            if (decode_image == 'ask') {
                console.log(color.fggreen_string(parse(rsgp_path).name));
                console.log('Do you want to decode PTX');
                decode_image = readline_integer(0, 1) == 0 ? 'no' : 'yes';
            }
            const id = rsgp_data.slice(temp_offset, temp_offset + 4).readInt32LE();
            const image_width = rsgp_data.slice(temp_offset + 12, temp_offset + 16).readInt32LE();
            const image_height = rsgp_data.slice(temp_offset + 16, temp_offset + 20).readInt32LE();
            const ptx_data = rsgp_file_data.slice(file_data_offset, file_data_offset + file_data_size);
            await fs.outfile(`${rsgp_path}/Res/${name_path}`, ptx_data);
            if (decode_image == 'yes') {
                const format = await DecodePTX(`${rsgp_path}/Res/${name_path}`, file_data_size, image_width, image_height);
                const png_name_path = (`${parse(name_path).dir}\\${parse(name_path).name}.PNG`).split('\\');
                const image_info = { Id: id, TexFormat: format.Format, FormatType: format.FormatType };
                treRSGPinfo.Res.push({ Path: png_name_path, PTXInfo: image_info });
            }
            else {
                const image_info = { Id: id, Width: image_width, Height: image_height };
                treRSGPinfo.Res.push({ Path: name_path.split('\\'), PTXInfo: image_info });
            }
        }
        else if (rton_decode) {
            if (decode_rton == 'ask') {
                console.log(color.fggreen_string(parse(rsgp_path).name));
                console.log('Do you want to decode RTON');
                decode_rton = readline_integer(0, 1) == 0 ? 'no' : 'yes';
            }
            if (decode_rton == 'yes') {
                const json_data = await DecodeRTON(rsgp_file_data.slice(file_data_offset, file_data_offset + file_data_size));
                fs.outfile(`${rsgp_path}/Res/${parse(name_path).dir}/${parse(name_path).name}.json`, json_data);
                const json_name_path = (`${parse(name_path).dir}\\${parse(name_path).name}.JSON`).split('\\');
                treRSGPinfo.Res.push({ Path: json_name_path });
            }
            else {
                const rton_file_data = rsgp_file_data.slice(file_data_offset, file_data_offset + file_data_size);
                fs.outfile(`${rsgp_path}/Res/${name_path}`, rton_file_data);
                treRSGPinfo.Res.push({ Path: name_path.split('\\') });
            }
            ;
        }
        else {
            const file_data = rsgp_file_data.slice(file_data_offset, file_data_offset + file_data_size);
            fs.outfile(`${rsgp_path}/Res/${name_path}`, file_data);
            treRSGPinfo.Res.push({ Path: name_path.split('\\') });
        }
    }
    ;
    async function Extract_File(atlas: boolean, temp_offset: number) {
        let name_path = "";
        let name_dict = new Array();
        while (temp_offset < info_limit) {
            const character_byte = rsgp_data.slice(temp_offset, temp_offset += 1);
            const temp_bytes = Buffer.concat([rsgp_data.slice(temp_offset, temp_offset += 3), Buffer.alloc(1)]).readInt32LE() * 4;
            if (character_byte == '\x00') {
                if (temp_bytes != 0) {
                    name_dict.push({ name_path, temp_bytes });
                }
                ;
                atlas ? await WriteFile(name_path, temp_offset += 12, true, temp_offset += 20) : await WriteFile(name_path, temp_offset += 12, false);
                name_dict.forEach((value, index) => {
                    value.temp_bytes + info_offset < temp_offset ? name_dict.slice(index, index + 1) : name_path = value.name_path;
                });
            }
            else {
                if (temp_bytes != 0) {
                    name_dict.push({ name_path, temp_bytes });
                    name_path += character_byte;
                }
                else {
                    name_path += character_byte;
                }
            }
        }
    }
    ;
    async function Unpack_Rsgp(offset: number, size: number, atlas: boolean, compression: boolean) {
        rsgp_file_data = compression ? zlib.unzipSync(rsgp_data.slice(offset, offset + size)) : rsgp_data.slice(offset, offset + size);
        await Extract_File(atlas, info_offset);
        treRSGPinfo.CompressionMethod = compression ? true : false;
        if (remove_info == false) {
            await fs.writejson(`${rsgp_path}/TreRSGPInfo.json`, treRSGPinfo);
        }
    }
    ;
    async function CheckCompression() {
        if (part0_ZSize == part0_Size && part0_Size != 0 || part1_ZSize == part1_Size && part1_ZSize != 0 || compression_flag == 1) {
            part1_ZSize != 0 ? await Unpack_Rsgp(part1_Offset, part1_ZSize, true, false) : await Unpack_Rsgp(part0_Offset, part0_ZSize, false, false);
        }
        else {
            part1_ZSize != 0 ? await Unpack_Rsgp(part1_Offset, part1_ZSize, true, true) : await Unpack_Rsgp(part0_Offset, part0_ZSize, false, true);
        }
    }
    await CheckCompression();
}
