"use strict";
import { makefolder, writejson, readfilebuffer, outfile } from '../../../../Tre.Libraries/Tre.FileSystem/util.js';
import { res_split } from '../../../../Tre.Scripts/PopCap/resources/util.js';
import rsgp_unpack from '../../rsgp/unpack_rsgp.js';
import { readline_integer } from '../../../../Tre.Progress/Readline/util.js';
import { parse } from 'node:path';
import zlib from 'zlib';
import fs from 'fs-extra';
import JSONC from 'jsonc-simple-parser';
import rton2json from '../../rton/rton2json.js';
import localization from '../../../../Tre.Callback/localization.js';
import * as color from "../../../../Tre.Libraries/Tre.Color/color.js";
import path from "node:path";

export default function (rsb_path: string, experimental: boolean = false) {
    let extract_filesystem:boolean = false;
    if (experimental) {
        extract_filesystem = true;
        if (extract_filesystem) {
            console.log(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${localization("decode_rtons")}`));
            var decode_rton = readline_integer(0, 1) == 1 ? true : false;
            if (decode_rton) {
                console.log(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${localization("split_res")}`));
                var splitres = readline_integer(0, 1) ? true : false;
            }
        };
    }
    function SuperRepairRSGP(rsb_data: any, rsgp_data: any, rsgp_info_offset: number) {
        return rsgp_data.fill(Buffer.concat([Buffer.from('pgsr'), Buffer.alloc(12), rsb_data.slice(rsgp_info_offset + 140, rsgp_info_offset + 188)]), 0, 64).fill(Buffer.alloc(4), 48, 52);
    };
    function UnpackRSBSimple(rsb_data: any, compression_list: any, rsgp_list: any, rsgp_namelist: any, resources_json: any, resources_rton: any) {
        const rsb_folder = `${parse(rsb_path).dir}/${parse(rsb_path).name}.rsg`;
        console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${path.resolve(rsb_folder)}`);
        makefolder(`${rsb_folder}/Packet/`);
        const res_rsgp_list = new Array();
        for (let rsgp of resources_json.groups) {
            if (rsgp.type == 'simple') {
                res_rsgp_list.push(rsgp.id);
            }
        };
        for (let key in rsgp_list) {
            let rsgp_data = rsb_data.slice(rsgp_list[key].rsgp_offset, rsgp_list[key].rsgp_end_offset);
            let rsgp_name = rsgp_list[key].rsgp_name;
            const composite_group_list = compression_list[rsgp_list[key].index_composite][1];
            if (rsgp_name == 'ciphered') {
                rsgp_data = SuperRepairRSGP(rsb_data, rsgp_data, rsgp_list[key].rsgp_info_offset);
                for (let name_key in res_rsgp_list) {
                    if (rsgp_namelist[key].name_path == res_rsgp_list[name_key].toUpperCase()) {
                        rsgp_name = res_rsgp_list[name_key];
                        res_rsgp_list.splice(name_key, 1);
                        break;
                    }
                    else {
                        rsgp_name = rsgp_namelist[key].name_path;
                    }
                }
            }
            else if (rsgp_data.slice(0, 4).toString() != 'pgsr') {
                rsgp_data.fill(Buffer.concat([Buffer.from('pgsr'), Buffer.alloc(12)]));
            };
            for (let group in composite_group_list) {
                if (composite_group_list[group] == rsgp_list[key].index) {
                    composite_group_list[group] = rsgp_name;
                    break;
                }
            };
            if (extract_filesystem && rsgp_name.toUpperCase() == 'PACKAGES') {
                decode_rton ? rsgp_unpack(rsgp_data, rsb_folder, false, true, true) : rsgp_unpack(rsgp_data, rsb_folder, false, false, true);
            }
            else if (extract_filesystem && rsgp_name.toUpperCase().indexOf('__MANIFESTGROUP__') != -1) {
                makefolder(`${rsb_folder}/Res/PROPERTIES/`);
                decode_rton ? writejson(`${rsb_folder}/Res/PROPERTIES/RESOURCES.JSON`, resources_json) : outfile(`${rsb_folder}/Res/PROPERTIES/RESOURCES.RTON`, resources_rton);
                if (splitres) {
                    res_split(`${rsb_folder}/Res/PROPERTIES/RESOURCES.JSON`);
                }
            }
            else {
                const writedata = fs.createWriteStream(`${rsb_folder}/Packet/${rsgp_name}.rsgp`);
                writedata.write(rsgp_data);
            }
        }
        writejson(`${rsb_folder}/TreRSBInfo.json`, Object.fromEntries(compression_list));
    };
    function GetSmartPath(info_offset: number, info_limit: number, rsb_data: any): any[] {
        let temp_offset = info_offset;
        let name_path = "";
        let name_dict = new Array();
        let smart_path = new Array();
        let smart_path_rsgp = new Array();
        while (temp_offset < info_limit) {
            let character_byte = rsb_data.slice(temp_offset, temp_offset += 1);
            let temp_bytes = Buffer.concat([rsb_data.slice(temp_offset, temp_offset += 3), Buffer.alloc(1)]).readInt32LE() * 4;
            if (character_byte == '\x00') {
                if (temp_bytes != 0) {
                    let name_array: any = new Object();
                    name_array.name = name_path;
                    name_array.key = temp_bytes;
                    name_dict.push(name_array);
                };
                const index = rsb_data.slice(temp_offset, temp_offset += 4).readInt32LE();
                name_path.indexOf('__MANIFESTGROUP__') != -1 ? smart_path.push({ name_path, index }) : "";
                smart_path_rsgp.push({ name_path, index });
                name_dict.forEach((value, index) => {
                    value.key + info_offset < temp_offset ? name_dict.slice(index, index + 1) : name_path = value.name;
                });
            }
            else {
                if (temp_bytes != 0) {
                    let name_array: any = new Object();
                    name_array.name = name_path;
                    name_array.key = temp_bytes;
                    name_dict.push(name_array);
                    name_path += character_byte.toString();
                }
                else {
                    name_path += character_byte.toString();
                }
            }
        };
        smart_path.push(smart_path_rsgp.sort((a, b) => a.index - b.index));
        return smart_path;
    };
    function CheckRSBShuffle(rsb_data: any) {
        if (rsb_data.slice(0, 4) == Buffer.from([0xD4, 0xFE, 0xAD, 0xDE])) {
            rsb_data = zlib.inflateSync(rsb_data.slice(8))
        };
        let rsgp_offset = rsb_data.slice(108, 112).readInt32LE();
        const compression_list = new Array();
        const rsgp_list = new Array();
        const compression_list_begin = rsb_data.slice(56, 60).readInt32LE();
        const compression_list_end = rsb_data.slice(68, 72).readInt32LE();
        const rsgp_info_begin = rsb_data.slice(44, 48).readInt32LE();
        const autopool_info_begin = rsb_data.slice(76, 80).readInt32LE();
        const rsgp_namelist = GetSmartPath(rsb_data.slice(36, 40).readInt32LE(), rsb_data.slice(56, 60).readInt32LE(), rsb_data);
        let c_index = 0;
        for (let i = compression_list_begin; i < compression_list_end; i += 1156) {
            const compression_rsgp_list = new Array();
            const offset_name = rsb_data.slice(i, i + 128).indexOf('_CompositeShell') != -1 ? rsb_data.slice(i, i + 128).indexOf('_CompositeShell') : rsb_data.slice(i, i + 128).indexOf('\x00');
            const compression_name = rsb_data.slice(i, i + offset_name).toString();
            const number_item = rsb_data.slice(i + 1152).readInt32LE();
            for (let k = 128; k < number_item * 16 + 128; k += 16) {
                const index_rsgp = rsb_data.slice(i + k, i + k + 4).readInt32LE();
                compression_rsgp_list.push(index_rsgp);
                const rsgp_info_offset = rsgp_info_begin + (204 * index_rsgp);
                const rsgp_info = rsb_data.slice(rsgp_info_offset, rsgp_info_offset + 204);
                const autopool_info = rsb_data.slice(autopool_info_begin + (152 * index_rsgp), autopool_info_begin + 152 + (152 * index_rsgp));
                const rsgp_size = rsgp_info.slice(164, 168).readInt32LE() + rsgp_info.slice(168, 172).readInt32LE();
                const index = rsgp_info.slice(136, 140).readInt32LE();
                const rsgp_name = (rsgp_info[127] + rsgp_info[128] == 0) ? rsgp_info.slice(0, (rsgp_info.slice(0, 128).indexOf('\x00'))).toString() : ((autopool_info[127] + autopool_info[128] == 0) ? autopool_info.slice(0, (autopool_info.slice(0, 128).indexOf('\x00'))).toString() : 'ciphered');
                if (index === rsgp_namelist[0].index) {
                    var resources_rton: any = rsb_data.slice(rsgp_offset + 4096, rsgp_offset + rsgp_size);
                    if (resources_rton.slice(0, 4).toString() != 'RTON') { resources_rton = zlib.inflateSync(resources_rton) };
                    var resources_json: any = rton2json(resources_rton);
                };
                rsgp_list.push({ rsgp_offset, rsgp_end_offset: rsgp_offset += rsgp_size, rsgp_info_offset, rsgp_name, index_composite: c_index, index });
            };
            c_index++;
            compression_list.push([compression_name, compression_rsgp_list.sort((a, b) => a.index - b.index)]);
        };
        UnpackRSBSimple(rsb_data, compression_list, rsgp_list.sort((a, b) => a.index - b.index), rsgp_namelist[1], JSONC.parse(resources_json), resources_rton);
    };
    CheckRSBShuffle(readfilebuffer(rsb_path));
};
