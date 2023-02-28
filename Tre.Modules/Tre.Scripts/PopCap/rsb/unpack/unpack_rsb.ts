"use strict";
import fs from 'fs-extra';
import { makefolder, writejson, readfilebuffer, readjson } from '../../../../Tre.Libraries/Tre.FileSystem/util.js';
import { res_split } from '../../../../Tre.Scripts/PopCap/resources/util.js';
import rsgp_unpack from '../../rsgp/unpack_rsgp.js';
import { readline_integer } from '../../../../Tre.Progress/Readline/util.js';
import { parse } from 'node:path';
import zlib from 'zlib';
import localization from '../../../../Tre.Callback/localization.js';
import * as color from "../../../../Tre.Libraries/Tre.Color/color.js";
import path from "node:path";

export default function (rsb_path: string, experimental: boolean, is_res_unpack: boolean = false) {
    let extract_packages: boolean | number = false;
    let decode_rton: boolean | number = false;
    if (experimental) {
        console.log(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${localization("extract_packages")}`));
        extract_packages = readline_integer(0, 1) == 1 ? true : false;
        if (extract_packages) {
            console.log(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${localization("decode_rtons")}`));
            decode_rton = readline_integer(0, 1) == 1 ? true : false;
        }
        ;
    }
    let rsb_data:any = readfilebuffer(rsb_path);
    const header:any = rsb_data.slice(0, 4).toString('hex');
    header == 'd4feadde' ? rsb_data = (zlib.inflateSync(rsb_data.slice(8))) : {};
    const compression_list_begin = rsb_data.slice(56, 60).readInt32LE();
    const compression_list_end = rsb_data.slice(68, 72).readInt32LE();
    const rsgp_info_begin = rsb_data.slice(44, 48).readInt32LE();
    const autopool_info_begin = rsb_data.slice(76, 80).readInt32LE();
    let rsgp_offset = rsb_data.slice(108, 112).readInt32LE();
    let number_folder = 0;
    let repair_tre:boolean;
    const subgroup = new Array();
    const TreRSBInfo = new Array();
    const rsb_folder = `${parse(rsb_path).dir}/${parse(rsb_path).name}.rsg`;
    console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${path.resolve(rsb_folder)}`);
    makefolder(`${rsb_folder}/Packet/`);
    const resources_info = rsb_data.slice(autopool_info_begin - 204, autopool_info_begin);
    const resources_size = resources_info.slice(164, 168).readInt32LE() + resources_info.slice(168, 172).readInt32LE();
    let resources_data = rsb_data.slice(rsb_data.byteLength - resources_size);
    function Unpack_Res() {
        if (repair_tre) {
            resources_data.fill(Buffer.concat([Buffer.from('pgsr'), Buffer.alloc(12), resources_info.slice(140, 188)]), 0, 64);
            rsgp_unpack(resources_data, rsb_folder, false, true, true);
            const res_json:any = readjson(`${rsb_folder}/Res/PROPERTIES/RESOURCES.JSON`);
            for (let res of res_json.groups) {
                if (res.type == 'simple') {
                    subgroup.push([res.parent, res.id]);
                }
            }
            writejson('ada.json', subgroup);
        }
        else {
            rsgp_unpack(resources_data, rsb_folder, false, true, true);
        };
        if (experimental) {
            console.log(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${localization("split_res")}`));
            const splitres = readline_integer(0, 1) ? true : false;
            if (splitres) {
                res_split(`${rsb_folder}/Res/PROPERTIES/RESOURCES.JSON`);
            };
        }
    };
    resources_data.slice(0, 4).toString() !== 'pgsr' ? repair_tre = true : {};
    if (is_res_unpack) {
        Unpack_Res();
    }
    function FixNameRSGP(compression_folder_name: string) {
        if (compression_folder_name.indexOf('__MANIFESTGROUP__') != -1) {
            return compression_folder_name;
        }
        for (let k = 0; k < subgroup.length; k++) {
            let compression_res = subgroup[k][0];
            if (compression_res == undefined) {
                compression_res = subgroup[k][1];
            }
            ;
            if (compression_folder_name == compression_res) {
                const rsgp_name = subgroup[k][1];
                subgroup.splice(k, 1);
                return rsgp_name;
            }
        }
    };
    for (let i = compression_list_begin; i < compression_list_end; i = i + 1156) {
        const compression_folder = rsb_data.slice(i, i + 1156);
        const compression_folder_name = rsb_data.slice(i, i + 128).toString().replaceAll('_CompositeShell', '').replaceAll('\x00', '');
        const number_item = compression_folder.slice(1152).readInt32LE();
        let RSGP_Object = new Array();
        for (let k = 128; k < 128 + (number_item * 16); k += 16) {
            const rsgp_info = rsb_data.slice(rsgp_info_begin + (204 * number_folder), rsgp_info_begin + 204 + (204 * number_folder));
            const autopool_info = rsb_data.slice(autopool_info_begin + (152 * number_folder), autopool_info_begin + 152 + (152 * number_folder++));
            const rsgp_size = rsgp_info.slice(164, 168).readInt32LE() + rsgp_info.slice(168, 172).readInt32LE();
            const rsgp_data = rsb_data.slice(rsgp_offset, rsgp_offset += rsgp_size);
            let rsgp_name = rsgp_info.slice(0, 128).toString().replaceAll('\x00', '');
            if (rsgp_info[127] + rsgp_info[128] != 0) {
                if (autopool_info[127] + autopool_info[128] != 0) {
                    if (is_res_unpack != true) {
                        Unpack_Res();
                        is_res_unpack = true;
                    };
                    rsgp_name = FixNameRSGP(compression_folder_name);
                    rsgp_data.fill(Buffer.concat([Buffer.from('pgsr'), Buffer.alloc(12), rsgp_info.slice(140, 188)]), 0, 64).fill(Buffer.alloc(4), 48, 52);
                }
                else {
                    rsgp_name = autopool_info.slice(0, 128).toString().replace('_AutoPool', '').replaceAll('\x00', '');
                    rsgp_data.fill(Buffer.concat([Buffer.from('pgsr'), Buffer.alloc(12)]));
                };
            };
            if (is_res_unpack) {
                if (compression_folder_name.indexOf('__MANIFESTGROUP__') == -1) {
                    if (extract_packages && rsgp_name.toUpperCase() == 'PACKAGES') {
                        decode_rton ? rsgp_unpack(rsgp_data, rsb_folder, false, true, true) : rsgp_unpack(rsgp_data, rsb_folder, false, false, true);
                    }
                    else {
                        const writedata = fs.createWriteStream(`${rsb_folder}/Packet/${rsgp_name}.rsgp`);
                        writedata.write(rsgp_data);
                    }
                }
            }
            else {
                const writedata = fs.createWriteStream(`${rsb_folder}/Packet/${rsgp_name}.rsgp`);
                writedata.write(rsgp_data);
            }
            RSGP_Object.push(parse(rsgp_name).name);
        }
        ;
        const RSGP_Composite = new Array();
        RSGP_Composite.push(compression_folder_name);
        RSGP_Composite.push(RSGP_Object);
        TreRSBInfo.push(RSGP_Composite);
    };
    writejson(`${rsb_folder}/TreRSBInfo.json`, Object.fromEntries(TreRSBInfo));
};
