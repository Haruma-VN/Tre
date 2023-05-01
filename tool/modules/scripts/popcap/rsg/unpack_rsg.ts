"use strict";
import zlib from "zlib";
import rton2json from "../rton/rton2json.js";
import pam_json_decode from "../pam/decode/decode.js";
import pam_xfl_decode from "../pam/json_to_flash/json_to_flash.js";
import wwise_decode from "../wwise/decode_simple.js";
import rton_plain from "../rton/rijndael/rton_plain.js";
import DecodePTX from "./decode_ptx.js";
import fs_js from "../../../library/fs/implement.js";
import { args } from "../../../implement/arguments.js";

export default async function (
    rsg_data: any,
    rsg_path: string,
    decode_ptx: boolean = false,
    decode_rton: boolean = false,
    decode_data: boolean = false,
    remove_info: boolean = false,
    ios_argb8888: number,
    no_notify_message: boolean = false,
) {
    const compression_flag = rsg_data.slice(16, 17).readInt8();
    const part0_Offset = rsg_data.slice(24, 28).readInt32LE();
    const part0_ZSize = rsg_data.slice(28, 32).readInt32LE();
    const part0_Size = rsg_data.slice(32, 36).readInt32LE();
    const part1_Offset = rsg_data.slice(40, 44).readInt32LE();
    const part1_ZSize = rsg_data.slice(44, 48).readInt32LE();
    const part1_Size = rsg_data.slice(48, 52).readInt32LE();
    const info_size = rsg_data.slice(72, 76).readInt32LE();
    const info_offset = rsg_data.slice(76, 80).readInt32LE();
    const info_limit = info_size + info_offset;
    let rsg_file_data: any;
    let pam_to_xfl: boolean = fs_js.create_toolkit_view("pam_to_flash") as boolean;
    let pam_resolution: number = fs_js.create_toolkit_view("pam_resolution") as number;
    let treRSGinfo: any = {
        UseTreRSGInfo: true,
        CompressionMethod: true,
        Res: [],
    };
    async function DecodeRTON(rton_data: any) {
        let rton_2c_encrypted = false;
        const rton_head = rton_data.slice(0, 2).toString("hex");
        if (rton_head === "1000") {
            const rton_cipher_key = (
                fs_js.read_json(fs_js.dirname(args.main_js as any) + "/extension/settings/toolkit.json", true) as any
            ).popcap_rton_conversion.rton.rton_cipher;
            rton_2c_encrypted = true;
            const rton_plain_data = await rton_plain(rton_data, rton_cipher_key);
            return [rton2json(rton_plain_data, rton_2c_encrypted)];
        } else {
            return [rton2json(rton_data, rton_2c_encrypted)];
        }
    }
    async function WriteFile(name_path: string, temp_offset: number, atlas: boolean, ...any_any: number[]) {
        const rton_decode = name_path.endsWith(".RTON") ? true : false;
        const pam_decode = name_path.endsWith(".PAM") ? true : false;
        const bnk_decode = name_path.endsWith(".BNK") ? true : false;
        const file_data_offset = rsg_data.slice(temp_offset - 8, temp_offset - 4).readInt32LE();
        const file_data_size = rsg_data.slice(temp_offset - 4, temp_offset).readInt32LE();
        if (atlas) {
            const id = rsg_data.slice(temp_offset, temp_offset + 4).readInt32LE();
            const image_width = rsg_data.slice(temp_offset + 12, temp_offset + 16).readInt32LE();
            const image_height = rsg_data.slice(temp_offset + 16, temp_offset + 20).readInt32LE();
            const ptx_data = rsg_file_data.slice(file_data_offset, file_data_offset + file_data_size);
            await fs_js.outfile_fs(`${rsg_path}/Res/${name_path}`, ptx_data);
            if (decode_ptx) {
                const format = await DecodePTX(
                    `${rsg_path}/Res/${name_path}`,
                    file_data_size,
                    image_width,
                    image_height,
                    ios_argb8888,
                    no_notify_message,
                );
                const png_name_path = `${fs_js.parse_fs(name_path).dir}\\${fs_js.parse_fs(name_path).name}.PNG`.split(
                    "\\",
                );
                const image_info = {
                    Id: id,
                    TexFormat: format.Format,
                    Platform: format.Platform,
                };
                treRSGinfo.Res.push({
                    Path: png_name_path,
                    PTXInfo: image_info,
                });
            } else {
                const image_info = {
                    Id: id,
                    Width: image_width,
                    Height: image_height,
                };
                treRSGinfo.Res.push({
                    Path: name_path.split("\\"),
                    PTXInfo: image_info,
                });
            }
        } else if (rton_decode && decode_rton) {
            const json_data = await DecodeRTON(
                rsg_file_data.slice(file_data_offset, file_data_offset + file_data_size),
            );
            let json_info = new Object();
            const json_name_path = `${fs_js.parse_fs(name_path).dir}\\${fs_js.parse_fs(name_path).name}.JSON`.split(
                "\\",
            );
            if (json_data[1]) {
                json_info = {
                    Path: json_name_path,
                    Rton_encrypted: true,
                };
            } else {
                json_info = {
                    Path: json_name_path,
                };
            }
            treRSGinfo.Res.push(json_info);
            fs_js.outfile_fs(
                `${rsg_path}/Res/${fs_js.parse_fs(name_path).dir}/${fs_js.parse_fs(name_path).name}.json`,
                json_data[0],
            );
        } else if (pam_decode && decode_data) {
            const pam_data = await pam_json_decode(
                rsg_file_data.slice(file_data_offset, file_data_offset + file_data_size),
            );
            let pam_path = name_path.split("\\");
            if (pam_to_xfl) {
                await pam_xfl_decode(pam_data, `${rsg_path}/Res/${name_path}.json`, pam_resolution);
                pam_path[pam_path.length - 1] = pam_path[pam_path.length - 1] + ".XFL";
            } else {
                pam_path[pam_path.length - 1] = pam_path[pam_path.length - 1] + ".JSON";
                fs_js.outfile_fs(`${rsg_path}/Res/${name_path}.json`, Buffer.alloc(64));
                fs_js.write_json(`${rsg_path}/Res/${name_path}.json`, pam_data);
            }
            treRSGinfo.Res.push({
                Path: pam_path,
            });
        } else if (bnk_decode && decode_data) {
            const bnk_data = await wwise_decode(
                rsg_file_data.slice(file_data_offset, file_data_offset + file_data_size),
            );
            let pam_path = name_path.split("\\");
            pam_path[pam_path.length - 1] = pam_path[pam_path.length - 1] + ".SOUNDBANK";
            const folder = `${rsg_path}/Res/${name_path}.SOUNDBANK`;
            if (bnk_data.has_wem_item) {
                for (let wem_item of bnk_data.wem_data) {
                    fs_js.outfile_fs(`${folder}/embedded_audio/${wem_item.id}.wem`, wem_item.data);
                }
            }
            fs_js.outfile_fs(`${folder}/wwise.json`, Buffer.alloc(64));
            fs_js.write_json(`${folder}/wwise.json`, bnk_data.wwise_json);
            treRSGinfo.Res.push({
                Path: pam_path,
            });
        } else {
            const file_data = rsg_file_data.slice(file_data_offset, file_data_offset + file_data_size);
            fs_js.outfile_fs(`${rsg_path}/Res/${name_path}`, file_data);
            treRSGinfo.Res.push({
                Path: name_path.split("\\"),
            });
        }
    }
    async function Extract_File(atlas: boolean, temp_offset: number) {
        let name_path = "";
        let name_dict = new Array();
        while (temp_offset < info_limit) {
            const character_byte = rsg_data.slice(temp_offset, (temp_offset += 1));
            const temp_bytes =
                Buffer.concat([rsg_data.slice(temp_offset, (temp_offset += 3)), Buffer.alloc(1)]).readInt32LE() * 4;
            if (character_byte === "\x00") {
                if (temp_bytes !== 0) {
                    name_dict.push({
                        name_path,
                        temp_bytes,
                    });
                }
                atlas
                    ? await WriteFile(name_path, (temp_offset += 12), true, (temp_offset += 20))
                    : await WriteFile(name_path, (temp_offset += 12), false);
                name_dict.forEach((value, index) => {
                    value.temp_bytes + info_offset < temp_offset
                        ? name_dict.slice(index, index + 1)
                        : (name_path = value.name_path);
                });
            } else {
                if (temp_bytes !== 0) {
                    name_dict.push({
                        name_path,
                        temp_bytes,
                    });
                    name_path += character_byte;
                } else {
                    name_path += character_byte;
                }
            }
        }
    }
    async function Unpack_RSG(offset: number, size: number, atlas: boolean, compression: boolean) {
        rsg_file_data = compression
            ? zlib.unzipSync(rsg_data.slice(offset, offset + size))
            : rsg_data.slice(offset, offset + size);
        await Extract_File(atlas, info_offset);
        treRSGinfo.CompressionMethod = compression ? true : false;
        if (remove_info) {
            delete treRSGinfo.UseTreRSGInfo;
        } else {
            await fs_js.write_json(`${rsg_path}/TreRSGInfo.json`, treRSGinfo);
        }
    }
    async function CheckZlibHeader(zlib_header: any) {
        const zlib_level_compression = [
            [120, 1],
            [120, 94],
            [120, 156],
            [120, 218],
        ];
        let zlib_uncompression = false;
        for (let level of zlib_level_compression) {
            if (zlib_header[0] === level[0] && zlib_header[1] === level[1]) {
                zlib_uncompression = false;
                break;
            } else {
                zlib_uncompression = true;
            }
        }
        return zlib_uncompression;
    }
    const zlib_compression = await CheckZlibHeader(rsg_data.slice(part0_Offset, part0_Offset + 2));
    async function CheckCompression() {
        if (
            (part0_ZSize === part0_Size && part0_Size !== 0 && zlib_compression) ||
            (part1_ZSize === part1_Size && part1_ZSize !== 0 && zlib_compression) ||
            (compression_flag === 1 && zlib_compression) ||
            (compression_flag === 0 && zlib_compression) ||
            zlib_compression
        ) {
            part1_ZSize !== 0
                ? await Unpack_RSG(part1_Offset, part1_ZSize, true, false)
                : await Unpack_RSG(part0_Offset, part0_ZSize, false, false);
        } else {
            part1_ZSize !== 0
                ? await Unpack_RSG(part1_Offset, part1_ZSize, true, true)
                : await Unpack_RSG(part0_Offset, part0_ZSize, false, true);
        }
    }
    await CheckCompression();
    return treRSGinfo;
}
