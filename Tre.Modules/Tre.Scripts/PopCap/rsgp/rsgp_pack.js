"use strict";
import zlib from 'zlib';
import path from 'node:path';
import { SmartBuffer } from 'smart-buffer';
import { readline_size } from '../../../Tre.Progress/Readline/util.js';
import fs from 'fs-extra';
export default function (path_file) {
    let folder = path_file + '/Res';
    let TreRsgpInfo = "";
    let TreRsgpCheck = false;
    let RsgpCompression = true;
    let folder_rsgp = new Array();
    let TreRsgpAtlas = undefined;
    if (fs.existsSync(folder + '/../TreRSGPInfo.json')) {
        TreRsgpInfo = fs.readJSONSync(folder + '/../TreRSGPInfo.json');
        TreRsgpCheck = TreRsgpInfo.UseTreRSGPInfo;
        RsgpCompression = TreRsgpInfo.CompressionMethod;
    };
    function getAllFilesDir(dir) {
        const all_files = new Array();
        fs.readdirSync(dir).forEach((file) => {
            let fullPath = path.join(dir, file);
            if (fs.lstatSync(fullPath).isDirectory()) {
                all_files.push(getAllFilesDir(fullPath));
            } else if (file === 'TreRSGPInfo.json') { }
            else {
                all_files.push(fullPath);
            }
        });
        return all_files.reduce((a, b) => a.concat(b), new Array()).sort();
    };
    function getAllFilesinJson(res) {
        let all_files = new Array();
        res.forEach(path => {
            all_files.push(path.Path.join('\\').toUpperCase());
        });
        return [...[""], ...all_files].sort();
    };
    if (TreRsgpCheck == true) {
        folder_rsgp = getAllFilesinJson(TreRsgpInfo.Res);
    }
    else {
        folder_rsgp = [...[""], ...getAllFilesDir(folder)];
        folder_rsgp.forEach((path, index) => {
            let folder_temp = path.indexOf('Res');
            folder_rsgp[index] = path.slice(folder_temp + 4).toUpperCase();
        });
    };
    let atlas_space = 0;
    let key_count = 0;
    let folder_length = 0;
    let pos = 0;
    let buffer_array = new Array();
    let image_size = 0;
    if (folder_rsgp[1].indexOf('ATLASES') !== -1) {
        TreRsgpAtlas = true;
        atlas_space = 5;
        image_size = 16;
        var ptx_compression = SmartBuffer.fromBuffer(Buffer.alloc(4096));
    }
    for (let k = 0; k < folder_rsgp.length - 1; k++) {
        let buf = new Object
        const folder_1 = folder_rsgp[k]
        const folder_2 = folder_rsgp[k + 1]
        let packet = SmartBuffer.fromOptions({ size: folder_2.length })
        packet.writeString(folder_2 + ' ')
        for (let i = 1; i < folder_2.length * 4; i = i + 4) {
            packet.insertBuffer(Buffer.alloc(3), i)
        }
        buf.temp = packet;
        folder_1.length > folder_2.length ? folder_length = folder_1.length : folder_length = folder_2.length
        for (let j = 0; j < folder_length; j++) {
            if (folder_1[j] !== folder_2[j]) {
                buf.key = j;
                for (let m = buffer_array.length - 1; m >= 0; m--) {
                    if (j >= buffer_array[m].key) {
                        let int32le = Buffer.alloc(4);
                        int32le.writeInt32LE('0x' + pos.toString(16));
                        buffer_array[m].temp.writeBuffer(int32le.slice(0, 3), j * 4 + 1);
                        break;
                    }
                }
                key_count = j;
                pos += (folder_2.length - j) + 4 + atlas_space;
                buffer_array.push(buf);
                break;
            }
        }
    }
    let rsgp_info = SmartBuffer.fromBuffer(Buffer.alloc(64000));
    let data = SmartBuffer.fromBuffer(Buffer.alloc(32000));
    let pos_2 = 0;
    let offset_file = 0;
    let id = 0;
    let Width = 0;
    let Height = 0;
    for (let h = 0; h < folder_rsgp.length - 1; h++) {
        const folder_1 = folder_rsgp[h]
        const folder_2 = folder_rsgp[h + 1]
        let file_data = fs.readFileSync(folder + '/' + folder_2)
        data.writeBuffer(file_data, offset_file)
        folder_1.length > folder_2.length ? folder_length = folder_1.length : folder_length = folder_2.length
        for (let j = 0; j < folder_length; j++) {
            if (folder_1[j] !== folder_2[j]) {
                rsgp_info.writeBuffer(buffer_array[h].temp.toBuffer().slice(j * 4), pos_2)
                pos_2 += ((folder_2.length - j) + 4 + atlas_space) * 4;
                rsgp_info.writeInt32LE(offset_file, pos_2 - 8 - atlas_space * 4);
                rsgp_info.writeInt32LE(file_data.length, pos_2 - 4 - atlas_space * 4);
                if (TreRsgpAtlas === true) {
                    if (TreRsgpCheck === true) {
                        TreRsgpInfo.Res.forEach((res, index) => {
                            if (res.Path.join('\\') === folder_2) {
                                id = res.PTXInfo.Id;
                                Width = res.PTXInfo.Width;
                                Height = res.PTXInfo.Height;
                            };
                        });
                    }
                    else {
                        console.log('Please enter the Size of Atlas: ' + folder_2);
                        console.log('Enter the Width');
                        Width = readline_size(1);
                        console.log('Enter the Height');
                        Height = readline_size(2);
                    }
                    rsgp_info.writeInt32LE(1, pos_2 - 32);
                    rsgp_info.writeInt32LE(id, pos_2 - 20);
                    rsgp_info.writeInt32LE(Width, pos_2 - 8);
                    rsgp_info.writeInt32LE(Height, pos_2 - 4);
                    id++
                }
                offset_file += file_data.length;
                break;
            }
        }
    }
    let info_size = 4096;
    while (info_size < pos_2) {
        info_size += 4096;
    }
    let comppression = 1;
    let rsgp_data = data.toBuffer();
    let rsgp_header = SmartBuffer.fromBuffer(Buffer.alloc(info_size));
    let ptx_length = 0;
    if (RsgpCompression == true) {
        comppression = 3;
        rsgp_data = zlib.deflateSync(rsgp_data);
        if (TreRsgpAtlas == true) {
            ptx_compression.writeBuffer(Buffer.from('78DA030000000001000000', 'hex'), 0)
            rsgp_header.writeInt32LE(ptx_compression.length, 28);
            ptx_length = ptx_compression.length;
            rsgp_header.writeInt32LE(info_size + ptx_length, 40);
            rsgp_header.writeBuffer(ptx_compression.toBuffer(), info_size);
        }
    }
    rsgp_header.writeString('pgsr', 0);
    rsgp_header.writeInt32LE(4, 4);
    rsgp_header.writeInt32LE(comppression, 16);
    rsgp_header.writeInt32LE(info_size, 20);
    rsgp_header.writeInt32LE(info_size, 24);
    rsgp_header.writeInt32LE(rsgp_data.length, 28 + image_size);
    rsgp_header.writeInt32LE(data.length, 32 + image_size);
    rsgp_header.writeInt32LE(pos_2, 72);
    rsgp_header.writeInt32LE(92, 76);
    rsgp_header.writeBuffer(rsgp_info.toBuffer().slice(0, pos_2), 92);
    rsgp_header.writeBuffer(rsgp_data, info_size + ptx_length);
    RsgpCompression == true && TreRsgpAtlas == true ? {} : rsgp_header.writeInt32LE(rsgp_header.length, 40)
    return rsgp_header.toBuffer();
};