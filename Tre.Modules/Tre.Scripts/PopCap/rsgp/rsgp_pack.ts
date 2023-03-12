"use strict";
import zlib from 'zlib';
import path, { parse } from 'node:path';
import { SmartBuffer } from 'smart-buffer';
import { readline_size, readline_integer } from '../../../Tre.Progress/Readline/util.js';
import * as color from '../../../Tre.Libraries/Tre.Color/color.js';
import json2rton from '../rton/json2rton.js';
import BeautifyOffset from './beautify_offset.js';
import * as fs from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import * as image_util from '../../../Tre.Libraries/Tre.Images/util.js';
import localization from '../../../Tre.Callback/localization.js';
import { Console } from '../../../Tre.Callback/console.js';
import { Argument } from '../../../Tre.Callback/toolkit_question.js';
import display_argument from './arguments_set.js';

export default async function (path_file: string,
    pack_simple: boolean = false,
    rsb_pack = false, resources_pack: boolean = false,
    dont_log_notify: boolean = false, rsb_pack_everything: boolean = false, rsgp_tre_info?: any) {
    let TreRSGPInfo: any = false;
    let RsgpCompression: boolean = true;
    let UseTreInfo: boolean = false;
    let format_choose: number = -1;
    if (fs.if_file_exists(`${path_file}/TreRSGPInfo.json`)) {
        TreRSGPInfo = fs.readjson(`${path_file}/TreRSGPInfo.json`);
    }
    else {
        throw new Error(localization("no_tre_info"));
    }
    ;

    function GetTreInfo() {
        RsgpCompression = TreRSGPInfo.CompressionMethod;
        UseTreInfo = TreRSGPInfo.UseTreRSGPInfo;
        return [RsgpCompression, UseTreInfo];
    }
    ;
    function GetFilePath(UseTreInfo: boolean,
        TreRSGPInfo: any) {
        let all_files = new Array();
        if (UseTreInfo) {
            for (let rsgp of TreRSGPInfo) {
                all_files.push(rsgp.Path.join('\\').toUpperCase());
            }
        }
        else {
            if (rsb_pack && resources_pack != true) {
                all_files = fs.read_dir(`${path_file}`);
                for (let item in all_files) {
                    if (parse(all_files[item]).ext.toUpperCase())
                        all_files[item] = all_files[item].slice(`${parse(path_file).dir}/`.length).toUpperCase();
                };
            }
            else if (rsb_pack && resources_pack) {
                all_files = [path_file.slice(path_file.length - 25)];
            }
            else {
                all_files = fs.read_dir(`${path_file}/RES`);
                for (let item in all_files) {
                    if (parse(all_files[item]).ext.toUpperCase())
                        all_files[item] = all_files[item].slice(`${path_file}/RES/`.length).toUpperCase();
                };
            };

            if (pack_simple) {
                const pngFiles = all_files.filter(fileName => fileName.endsWith(".PNG"));
                const jsonFiles = all_files.filter(fileName => fileName.endsWith(".JSON"));
                for (let pngFile of pngFiles) {
                    const ptxFile = `${parse(pngFile).dir}\\${parse(pngFile).name}.PTX`;
                    if (all_files.includes(ptxFile)) {
                        all_files.splice(all_files.indexOf(ptxFile), 1);
                    }
                };
                for (let jsonFile of jsonFiles) {
                    const rtonFile = `${parse(jsonFile).dir}\\${parse(jsonFile).name}.RTON`;
                    if (all_files.includes(rtonFile)) {
                        all_files.splice(all_files.indexOf(rtonFile), 1);
                    }
                };
            }
        }
        return [...[""], ...all_files].sort();
    }

    function ConvertPathBuffer(path: string) {
        let itempath = SmartBuffer.fromOptions({ size: path.length });
        if (pack_simple) {
            if (path.indexOf('.JSON') != -1) {
                path = `${path.slice(0, path.indexOf('.JSON'))}.RTON`;
            }
            else if (path.indexOf('.PNG') != -1) {
                path = `${path.slice(0, path.indexOf('.PNG'))}.PTX`;
            };
        }
        for (let char of path + '\0') {
            itempath.writeString(char + '\0\0\0');
        }
        return itempath;
    }

    async function ConcatRSGPPath(filepath: string[]) {
        const path_temp = new Array();
        let position = 0;
        for (let i = 0; i < filepath.length - 1; i++) {
            const path_orignal = filepath[i];
            const path_compare = await ConvertPathBuffer(filepath[i + 1]);
            const path_length = path_orignal.length > path_compare.length ? path_orignal.length : path_compare.length / 4;
            for (let k = 0; k < path_length; k++) {
                if (filepath[i][k] != filepath[i + 1][k]) {
                    for (let h = path_temp.length - 1; h >= 0; h--) {
                        if (k >= path_temp[h].key) {
                            const int32 = SmartBuffer.fromBuffer(Buffer.alloc(4)).writeInt32LE(position);
                            path_temp[h].path_compare.writeBuffer(int32.toBuffer().slice(0, 3), k * 4 + 1);
                            break;
                        }
                    };
                    position += filepath[i + 1].indexOf('ATLASES') != -1 ? (filepath[i + 1].length - k) + 9 : (filepath[i + 1].length - k) + 4;
                    path_temp.push({ path_compare, key: k });
                    break;
                }
            }
        }
        return path_temp;
    }

    function ZlibDeflate(rsgp_file_data: any, compression: boolean) {
        if (compression) {
            const zlib_deflate = SmartBuffer.fromBuffer(zlib.deflateSync(rsgp_file_data, { level: 9 }));
            return zlib_deflate.toBuffer();
        }
        else {
            return rsgp_file_data;
        }
    }

    async function EncodePTX(file_path: string, format: number, format_type: string) {
        if (fs.if_file_exists(`${path_file}/Res/ATLASES/${parse(file_path).name}.PTX`)) {
            fs.delete_file(`${path_file}/Res/ATLASES/${parse(file_path).name}.PTX`);
        }

        switch (format) {
            case 0:
                if (format_type == 'ios') {
                    await image_util.encode_argb8888(`${path_file}/Res/${file_path}`, true);
                }
                else {
                    await image_util.encode_rgba8888(`${path_file}/Res/${file_path}`, true);
                }
                break;
            case 30:
                await image_util.encode_pvrtc(`${path_file}/Res/${file_path}`, true);
                break;
            case 147:
                if (format_type == 'android_cn') {
                    await image_util.encode_etc1alpha_palette(`${path_file}/Res/${file_path}`, true);
                }
                else {
                    await image_util.encode_etc1a(`${path_file}/Res/${file_path}`, true);
                }
                break;
            default:
                throw new Error(localization('not_recognize_ptx'));
        }
    }

    async function GetInfoRSGP(file_path: string, UseTreInfo: string, TreRSGPInfo: any) {
        if (file_path.indexOf('.JSON') != -1 && pack_simple) {
            if (rsb_pack) {
                if (resources_pack) {
                    const rton_data = await json2rton(fs.readjson(`${path_file}`));
                    return rton_data;
                }
                else {
                    const rton_data = await json2rton(fs.readjson(`${parse(path_file).dir}/${file_path}`));
                    return rton_data;
                }
            }
            else {
                const rton_data = await json2rton(fs.readjson(`${path_file}/Res/${file_path}`));
                return rton_data;
            }

        }
        else if (file_path.indexOf('ATLASES') != -1) {
            if (UseTreInfo) {
                let PTX_Info: any = new Object();
                for (let key in TreRSGPInfo) {
                    if ((parse(file_path).base).toUpperCase() == TreRSGPInfo[key].Path[TreRSGPInfo[key].Path.length - 1]) {
                        PTX_Info = TreRSGPInfo[key];
                        break;
                    }
                }
                if (file_path.indexOf('.PNG') != -1) {
                    if (pack_simple) {
                        await EncodePTX(file_path, PTX_Info.PTXInfo.TexFormat, PTX_Info.PTXInfo.Platform);
                        const image_data = await fs.readfilebuffer(`${path_file}/Res/ATLASES/${parse(file_path).name}.PTX`);
                        const image_dimension = await image_util.dimension(`${path_file}/Res/${file_path}`);
                        return { image_data, width: image_dimension.width, height: image_dimension.height, id: PTX_Info.PTXInfo.Id };
                    }
                    else {
                        const image_data = await fs.readfilebuffer(`${path_file}/Res/${file_path}`);
                        const image_dimension = await image_util.dimension(`${path_file}/Res/${file_path}`);
                        return { image_data, width: image_dimension.width, height: image_dimension.height, id: PTX_Info.PTXInfo.Id };
                    }
                }
                else {
                    const image_data = await fs.readfilebuffer(`${path_file}/Res/ATLASES/${parse(file_path).name}.PTX`);
                    return { image_data, width: PTX_Info.PTXInfo.Width, height: PTX_Info.PTXInfo.Height, id: PTX_Info.PTXInfo.Id };
                }
            }
            else {
                if (file_path.indexOf('.PNG') != -1) {
                    if (pack_simple) {
                        let format_type: any;
                        const image_dimension = await image_util.dimension(`${path_file}/Res/${file_path}`);
                        if (format_choose == -1) {
                            const allowance_for_popcap_ptx_compression: boolean = display_argument(image_dimension.width, image_dimension.height);
                            const notify_allowance_message:string = allowance_for_popcap_ptx_compression ? localization("atlas_is_filled_with_2n") : localization("atlas_is_not_filled_with_2n");
                            console.log(color.fggreen_string(`◉ ${localization("execution_information")}: `) + `${notify_allowance_message}`);
                            console.log(color.fggreen_string(`◉ ${localization("execution_in")}: `) + `${path.parse(file_path).base}`);
                            console.log(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${image_dimension.width}`);
                            console.log(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${image_dimension.height}`);
                            console.log(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${localization("popcap_ptx_encode")}`));
                            const set_allowance_point: number = (allowance_for_popcap_ptx_compression) ? 5 : 2;
                            console.log('      1. PopCap PTX RGBA8888 Encode (0)');
                            console.log('      2. PopCap PTX ARGB8888 Encode (0)');
                            if (allowance_for_popcap_ptx_compression) {
                                console.log('      3. PopCap PTX RGB_PVRTC4_A_8 Encode (30)');
                                console.log('      4. PopCap PTX RGB_ETC1_A_8 Encode (147)');
                                console.log('      5. PopCap PTX RGB_ETC1_A_Palette Encode (147)');
                            }
                            format_choose = readline_integer(1, set_allowance_point);
                            switch (format_choose) {
                                case 1:
                                    format_choose = 0;
                                    break;
                                case 2:
                                    format_choose = 0;
                                    format_type = 'ios';
                                    break;
                                case 3:
                                    format_choose = 30;
                                    break;
                                case 4:
                                    format_choose = 147;
                                case 5:
                                    format_choose = 147;
                                    format_type = 'android_cn';
                                    break;
                                default:
                                    format_choose = readline_integer(0, 4);
                            }
                        };
                        await EncodePTX(file_path, format_choose, format_type);
                        const image_data = await fs.readfilebuffer(`${path_file}/Res/ATLASES/${parse(file_path).name}.PTX`);
                        return { image_data, width: image_dimension.width, height: image_dimension.height, id: false };
                    }
                    else {
                        const image_data = await fs.readfilebuffer(`${path_file}/Res/${file_path}`);
                        const image_dimension = await image_util.dimension(`${path_file}/Res/${file_path}`);
                        return { image_data, width: image_dimension.width, height: image_dimension.height, id: false };
                    }
                }
                else {
                    if (pack_simple) {
                        const image_data = await fs.readfilebuffer(`${path_file}/Res/ATLASES/${parse(file_path).name}.PTX`);
                        console.log(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${localization("popcap_ptx_dimension")}`));
                        console.log(color.fggreen_string(`◉ ${localization("execution_in")}: ${path.parse(file_path).base}`));
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_width}`));
                        let width = Console.IntegerReadLine(1, 16384);
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_height}`));
                        let height = Console.IntegerReadLine(1, 16384);
                        return { image_data, width, height, id: false };
                    }
                    else {
                        throw new Error(`${localization('cannot_turn_off_treinfo')}`);
                    }
                };
            };
        }

        else {
            if (rsb_pack) {
                if (resources_pack) {
                    const file_data = fs.readfilebuffer(`${path_file}`);
                    return file_data;
                }
                else {
                    const file_data = fs.readfilebuffer(`${parse(path_file).dir}/${file_path}`);
                    return file_data;
                }
            }
            else {
                const file_data = fs.readfilebuffer(`${path_file}/Res/${file_path}`);
                return file_data;
            }
        }
    }

    async function PackData(filepath: string, path_temp: any, UseTreInfo: any, TreRSGPInfo: any) {
        const rsgp_path_info = new SmartBuffer();
        const rsgp_file_data = new SmartBuffer();
        let PTX_id_index = -1;
        let atlas = false;
        for (let i = 0; i < filepath.length - 1; i++) {
            const path_orignal = filepath[i];
            const path_compare = filepath[i + 1];
            const path_length = path_orignal.length > path_compare.length ? path_orignal.length : path_compare.length;
            for (let k = 0; k < path_length; k++) {
                if (path_orignal[k] != path_compare[k]) {
                    rsgp_path_info.writeBuffer(path_temp[i].path_compare.toBuffer().slice(k * 4));
                    const rsgp_data_info = await GetInfoRSGP(path_compare, UseTreInfo, TreRSGPInfo);
                    if (rsgp_data_info.width != undefined) {
                        rsgp_path_info.writeInt32LE(1).writeInt32LE(rsgp_file_data.writeOffset).writeInt32LE(rsgp_data_info.image_data.length);
                        rsgp_data_info.id != false ? rsgp_path_info.writeInt32LE(rsgp_data_info.id) : rsgp_path_info.writeInt32LE(PTX_id_index += 1);
                        rsgp_path_info.writeBuffer(Buffer.alloc(8)).writeInt32LE(rsgp_data_info.width).writeInt32LE(rsgp_data_info.height);
                        rsgp_file_data.writeBuffer(rsgp_data_info.image_data);
                        atlas = true;
                    }
                    else {
                        rsgp_path_info.writeBuffer(Buffer.alloc(4)).writeInt32LE(rsgp_file_data.writeOffset).writeInt32LE(rsgp_data_info.length);
                        rsgp_file_data.writeBuffer(rsgp_data_info).writeBuffer(Buffer.alloc(BeautifyOffset(rsgp_data_info.length)));
                    }
                    break;
                }
            }
        };
        return [rsgp_path_info.toBuffer(), rsgp_file_data.toBuffer(), atlas];
    }

    function PackRSGP(rsgp_path_info: any, rsgp_file_data: any, atlas: boolean, compression: boolean) {
        const rsgp_data = new SmartBuffer();
        rsgp_data.writeString('pgsr').writeInt8(4).writeBuffer(Buffer.alloc(11));
        compression ? rsgp_data.writeInt32LE(3) : rsgp_data.writeInt32LE(1);
        const info_header_size = (92 + rsgp_path_info.length) + BeautifyOffset(92 + rsgp_path_info.length);
        rsgp_data.writeInt32LE(info_header_size).writeInt32LE(info_header_size);
        const rsgp_zlib_data = ZlibDeflate(rsgp_file_data, compression);
        const rsgp_data_length = info_header_size + rsgp_zlib_data.length;
        if (atlas) {
            rsgp_data.writeInt32LE(4096).writeBuffer(Buffer.alloc(8));
            rsgp_data.writeInt32LE(4096 + info_header_size).writeInt32LE(rsgp_zlib_data.length).writeInt32LE(rsgp_file_data.length).writeBuffer(Buffer.alloc(20));
            rsgp_data.writeInt32LE(rsgp_path_info.length).writeInt32LE(92).writeBuffer(Buffer.alloc(12));
            rsgp_data.writeBuffer(rsgp_path_info).writeBuffer(Buffer.alloc(BeautifyOffset(92 + rsgp_path_info.length)));
            rsgp_data.writeString('78da0300', 'hex').writeInt32BE(1).writeBuffer(Buffer.alloc(4088));
            rsgp_data.writeBuffer(rsgp_zlib_data).writeBuffer(Buffer.alloc(BeautifyOffset(rsgp_data_length)));
            return rsgp_data.toBuffer();
        }
        else {
            rsgp_data.writeInt32LE(rsgp_zlib_data.length).writeInt32LE(rsgp_file_data.length).writeBuffer(Buffer.alloc(4));
            rsgp_data.writeInt32LE(rsgp_data_length + BeautifyOffset(rsgp_data_length)).writeBuffer(Buffer.alloc(28));
            rsgp_data.writeInt32LE(rsgp_path_info.length).writeInt32LE(92).writeBuffer(Buffer.alloc(12));
            rsgp_data.writeBuffer(rsgp_path_info).writeBuffer(Buffer.alloc(BeautifyOffset(92 + rsgp_path_info.length))).writeBuffer(rsgp_zlib_data);
            rsgp_data.writeBuffer(Buffer.alloc(BeautifyOffset(rsgp_data_length)));
            return rsgp_data.toBuffer();
        }
    }

    async function PackRSGPSimple(TreInfo: any, TreRSGPInfo: any) {
        const filepath = await GetFilePath(TreInfo[1], TreRSGPInfo);
        const path_temp = await ConcatRSGPPath(filepath);
        const [rsgp_path_info, rsgp_file_data, atlas] = await PackData((filepath as any), path_temp, TreInfo[1], TreRSGPInfo);
        return await PackRSGP(rsgp_path_info, rsgp_file_data, (atlas as any), TreInfo[0]);
    }

    if (TreRSGPInfo != false) {
        const TreInfo = await GetTreInfo();
        return await PackRSGPSimple(TreInfo, TreRSGPInfo.Res);
    }

    else if (rsb_pack_everything) {
        return await PackRSGPSimple([rsgp_tre_info.CompressionMethod, true], rsgp_tre_info.Res);
    }
    else {
        return await PackRSGPSimple([RsgpCompression, UseTreInfo], false);
    }

}
