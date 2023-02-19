"use strict";
import zlib from 'zlib';
import path from 'node:path';
import fs from 'fs-extra';
import { SmartBuffer } from 'smart-buffer';
import { readline_size } from '../../../Tre.Progress/Readline/util.js';
import * as color from '../../../Tre.Libraries/Tre.Color/color.js';
import zlib_beautify from '../../../Tre.Libraries/Tre.Buffer/zlib_beautify.js';
import { encode_rgba8888, encode_argb8888, encode_etc1a, encode_pvrtc, dimension } from '../../../Tre.Libraries/Tre.Images/util.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import localization from '../../../Tre.Callback/localization.js';
export default async function (path_file, encode_image, image_fmt) {
    let TreInfo = "";
    if (fs.existsSync(`${path_file}/TreRSGPInfo.json`)) {
        TreInfo = fs.readJsonSync(`${path_file}/TreRSGPInfo.json`);
    }
    else {
        TreErrorMessage({ reason: localization("no_tre_info"), error: localization("error") }, localization("no_tre_info"));
    }
    let RsgpCompression = true;
    TreInfo.CompressionMethod !== true ? RsgpCompression = undefined : {};
    async function GetPath() {
        let rsgp_paths = new Array();
        async function getAllFiles() {
            function getAllFilesDir(dir) {
                const all_files = new Array();
                fs.readdirSync(dir).forEach((file) => {
                    let fullPath = path.join(dir, file);
                    if (fs.lstatSync(fullPath).isDirectory()) {
                        all_files.push(getAllFilesDir(fullPath));
                    }
                    else if (file === 'TreRSGPInfo.json') { }
                    else {
                        all_files.push(fullPath);
                    }
                });
                return all_files.reduce((a, b) => a.concat(b), new Array()).sort();
            }
            ;
            const item_paths = await [...[""], ...getAllFilesDir(`${path_file}/Res`)];
            item_paths.forEach((item, index) => {
                item_paths[index] = item.slice(item.indexOf('Res') + 4).toUpperCase();
            });
            return item_paths;
        }
        ;
        function getAllFilesinJson(res) {
            let all_files = new Array();
            res.forEach(path => {
                all_files.push(path.Path.join('\\').toUpperCase());
            });
            return [...[""], ...all_files].sort();
        }
        ;
        await fs.existsSync(`${path_file}/TreRSGPInfo.json`) && TreInfo.UseTreRSGPInfo === true ? rsgp_paths = await getAllFilesinJson(TreInfo.Res) : rsgp_paths = await getAllFiles();
        return rsgp_paths;
    }
    ;
    async function Pack_RSGP(key_count, pos, folder_length, atlas_space, pos_2, offset_file, id, Width, Height, info_size, compression_flag, image_offset_size, ptx_length) {
        let info_paths = await GetPath();
        let ptx_image = "";
        async function Encode(format) {
            for (let i = 0; i < info_paths.length; i++) {
                if (path.parse(info_paths[i]).ext.toUpperCase() === '.PNG') {
                    switch (format) {
                        case 0:
                            await fs.existsSync(`${path_file}/Res/ATLASES${path.parse(info_paths[i]).name}.PTX`) ? await fs.unlinkSync(`${path_file}/Res/ATLASES${path.parse(info_paths[i]).name}.PTX`) : {};
                            await encode_rgba8888(`${path_file}/Res/${info_paths[i]}`);
                            break;
                        case 1:
                            await fs.existsSync(`${path_file}/Res/ATLASES${path.parse(info_paths[i]).name}.PTX`) ? await fs.unlinkSync(`${path_file}/Res/ATLASES${path.parse(info_paths[i]).name}.PTX`) : {};
                            await encode_argb8888(`${path_file}/Res/${info_paths[i]}`);
                            break;
                        case 3:
                            await fs.existsSync(`${path_file}/Res/ATLASES${path.parse(info_paths[i]).name}.PTX`) ? await fs.unlinkSync(`${path_file}/Res/ATLASES${path.parse(info_paths[i]).name}.PTX`) : {};
                            await encode_etc1a(`${path_file}/Res/${info_paths[i]}`);
                            break;
                        case 2:
                            await fs.existsSync(`${path_file}/Res/ATLASES${path.parse(info_paths[i]).name}.PTX`) ? await fs.unlinkSync(`${path_file}/Res/ATLASES${path.parse(info_paths[i]).name}.PTX`) : {};
                            await encode_pvrtc(`${path_file}/Res/${info_paths[i]}`);
                            break;
                        default:
                            break;
                    }
                    ;
                    ptx_image = info_paths[i].toUpperCase().replaceAll('.PNG', '.PTX');
                    for (let k = 0; k < info_paths.length; k++) {
                        info_paths[k] === ptx_image ? info_paths.splice(i, 1) : {};
                    }
                }
            }
            return;
        }
        ;
        encode_image == true && TreInfo.UseTreRSGPInfo !== true ? await Encode((image_fmt) ? image_fmt : 150) : {};
        let info_array = new Array();
        let rsgp_info = SmartBuffer.fromBuffer(Buffer.alloc(64000));
        let data = SmartBuffer.fromBuffer(Buffer.alloc(32000));
        let ptx_compression = "";
        if (info_paths[1].indexOf('ATLASES') !== -1) {
            atlas_space = 5;
            image_offset_size = 16;
            ptx_length = 4096;
        }
        ;
        for (let i = 0; i < info_paths.length - 1; i++) {
            let info_temp = new Object();
            const folder_1 = info_paths[i];
            const folder_2 = info_paths[i + 1];
            let packet = SmartBuffer.fromOptions({ size: folder_2.length });
            packet.writeString(folder_2 + ' ');
            for (let k = 1; k < folder_2.length * 4; k = k + 4) {
                packet.insertBuffer(Buffer.alloc(3), k);
            }
            ;
            info_temp.temp = packet;
            folder_1.length > folder_2.length ? folder_length = folder_1.length : folder_length = folder_2.length;
            for (let j = 0; j < folder_length; j++) {
                if (folder_1[j] !== folder_2[j]) {
                    info_temp.key = j;
                    for (let m = info_array.length - 1; m >= 0; m--) {
                        if (j >= info_array[m].key) {
                            let int32le = Buffer.alloc(4);
                            int32le.writeInt32LE('0x' + pos.toString(16));
                            info_array[m].temp.writeBuffer(int32le.slice(0, 3), j * 4 + 1);
                            break;
                        }
                    }
                    key_count = j;
                    pos += (folder_2.length - j) + atlas_space + 4;
                    info_array.push(info_temp);
                    break;
                }
            }
        }
        ;
        for (let h = 0; h < info_paths.length - 1; h++) {
            const folder_1 = info_paths[h];
            const folder_2 = info_paths[h + 1];
            let file_data = fs.readFileSync(`${path_file}/Res/${folder_2}`);
            data.writeBuffer(file_data, offset_file);
            folder_1.length > folder_2.length ? folder_length = folder_1.length : folder_length = folder_2.length;
            for (let j = 0; j < folder_length; j++) {
                if (folder_1[j] !== folder_2[j]) {
                    rsgp_info.writeBuffer(info_array[h].temp.toBuffer().slice(j * 4), pos_2);
                    pos_2 += ((folder_2.length - j) + 4 + atlas_space) * 4;
                    rsgp_info.writeInt32LE(offset_file, pos_2 - 8 - atlas_space * 4);
                    rsgp_info.writeInt32LE(file_data.length, pos_2 - 4 - atlas_space * 4);
                    if (info_paths[1].indexOf('ATLASES') !== -1) {
                        if (fs.existsSync(`${path_file}/TreRSGPInfo.json`) && TreInfo.UseTreRSGPInfo === true) {
                            TreInfo.Res.forEach((res) => {
                                if (res.Path.join('\\') === folder_2) {
                                    id = res.PTXInfo.Id;
                                    Width = res.PTXInfo.Width;
                                    Height = res.PTXInfo.Height;
                                }
                                ;
                            });
                        }
                        else if (encode_image == true) {
                            const dimension_x = await dimension(`${path_file}/Res/${folder_2.toUpperCase().replaceAll('.PTX', '.PNG')}`).then((result) => result).finally(() => { });
                            Width = dimension_x.width;
                            Height = dimension_x.height;
                        }
                        else {
                            console.log(color.fggreen_string(`Please enter the Size of Atlas: ${path.parse(folder_2).base}`));
                            console.log('Enter the Width');
                            Width = readline_size(1);
                            console.log('Enter the Height');
                            Height = readline_size(2);
                        }
                        rsgp_info.writeInt32LE(1, pos_2 - 32);
                        rsgp_info.writeInt32LE(id, pos_2 - 20);
                        rsgp_info.writeInt32LE(Width, pos_2 - 8);
                        rsgp_info.writeInt32LE(Height, pos_2 - 4);
                        id++;
                    }
                    offset_file += file_data.length;
                    break;
                }
            }
        }
        ;
        while (info_size < pos_2) {
            info_size += 4096;
        }
        ;
        let rsgp_header_info = SmartBuffer.fromBuffer(Buffer.alloc(info_size));
        let rsgp_filedata = data.toBuffer();
        if (RsgpCompression == true) {
            rsgp_filedata = zlib.deflateSync(rsgp_filedata);
            compression_flag = 3;
            if (ptx_length === 4096) {
                ptx_compression = SmartBuffer.fromBuffer(Buffer.alloc(ptx_length));
                ptx_compression.writeBuffer(Buffer.from('78DA030000000001000000', 'hex'), 0);
                rsgp_header_info.writeInt32LE(ptx_compression.length, 28);
                rsgp_header_info.writeInt32LE(info_size + ptx_length, 40);
                rsgp_header_info.writeBuffer(ptx_compression.toBuffer(), info_size);
            }
        }
        ;
        const zlib_beautify_buffer_memory = Buffer.alloc((zlib_beautify(rsgp_filedata.length)).byteLength - rsgp_filedata.length);
        rsgp_filedata = Buffer.concat([rsgp_filedata, zlib_beautify_buffer_memory]);
        rsgp_header_info.writeString('pgsr', 0);
        rsgp_header_info.writeInt32LE(4, 4);
        rsgp_header_info.writeInt32LE(compression_flag, 16);
        rsgp_header_info.writeInt32LE(info_size, 20);
        rsgp_header_info.writeInt32LE(info_size, 24);
        rsgp_header_info.writeInt32LE(rsgp_filedata.length, 28 + image_offset_size);
        rsgp_header_info.writeInt32LE(data.length, 32 + image_offset_size);
        rsgp_header_info.writeInt32LE(pos_2, 72);
        rsgp_header_info.writeInt32LE(92, 76);
        rsgp_header_info.writeBuffer(rsgp_info.toBuffer().slice(0, pos_2), 92);
        rsgp_header_info.writeBuffer(rsgp_filedata, info_size + ptx_length);
        RsgpCompression == true && ptx_length === 4096 ? {} : rsgp_header_info.writeInt32LE(rsgp_header_info.length, 40);
        return rsgp_header_info.toBuffer();
    }
    ;
    return await Pack_RSGP(0, 0, 0, 0, 0, 0, 0, 0, 0, 4096, 1, 0, 0);
}
