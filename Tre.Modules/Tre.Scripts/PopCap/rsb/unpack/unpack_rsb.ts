import { SmartBuffer } from "smart-buffer";
import path, { parse } from 'node:path';
import rsb_read_header_info from './rsb_read_header_info.js';
import extract_rsgp_name_path from './extract_rsgp_name_path.js';
import extract_resources_data from './extract_resources_data.js';
import rsgp_file_info from "./rsgp_file_info.js";
import rsgp_unpack from '../../rsgp/unpack_rsgp.js';
import composite_item_list from './composite_item_list.js';
import { readline_integer } from '../../../../Tre.Progress/Readline/util.js';
import * as fs_util from '../../../../Tre.Libraries/Tre.FileSystem/util.js';
import localization from '../../../../Tre.Callback/localization.js';
import * as color from "../../../../Tre.Libraries/Tre.Color/color.js";
export default async function (rsb_data_will_not_be_cipher: any, simple: boolean = false, unpack_everything: boolean = false) {
    let decode_rton = false;
    let decode_ptx = false;
    let splitres = false;
    let ios_argb8888 = 0;
    const TreRSGPInfo = new Array();
    if (simple) {
        console.log(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${localization("decode_rtons")}`));
        decode_rton = readline_integer(0, 1) == 1 ? true : false;
        if (decode_rton) {
            console.log(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${localization("split_res")}`));
            splitres = readline_integer(0, 1) == 1 ? true : false;
        }
    }
    else if (unpack_everything) {
        console.log(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${localization("decode_rtons")}`));
        decode_rton = readline_integer(0, 1) == 1 ? true : false;
        console.log(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${localization("decode_ptx")}`));
        decode_ptx = readline_integer(0, 1) == 1 ? true : false;
        if (decode_ptx) {
            console.log(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${parse(rsb_data_will_not_be_cipher).base} ${localization("ios_argb8888")}`));
            ios_argb8888 = readline_integer(0, 1) == 1 ? 1 : 0;
        }
    }
    const rsb_buffer_for_unpacking = fs_util.readfilebuffer(rsb_data_will_not_be_cipher);
    const rsb_new_extract_folder = `${rsb_data_will_not_be_cipher}/../${parse(rsb_data_will_not_be_cipher).name}.rsg`;
    console.log(`${color.fggreen_string("◉ " + localization("execution_out")+":\n     ")} ${path.resolve(rsb_new_extract_folder)}`);
    fs_util.makefolder(`${rsb_new_extract_folder}`);
    const iz_magic_header_rsb = SmartBuffer.fromBuffer(rsb_buffer_for_unpacking.slice(0, 0x70));
    const rsb_header_info_for_unpacking = await rsb_read_header_info(iz_magic_header_rsb);
    if (rsb_header_info_for_unpacking.magic == '1bsr') {
        const rsb_rsgp_header = rsb_buffer_for_unpacking.slice(rsb_header_info_for_unpacking.rsgpList_BeginOffset, rsb_header_info_for_unpacking.rsgpList_BeginOffset + rsb_header_info_for_unpacking.rsgpList_Length);
        let rsgp_name_list_uppercase = await extract_rsgp_name_path(rsb_rsgp_header, 0, rsb_header_info_for_unpacking.rsgpList_Length);
        let rsgp_list_info = await rsgp_file_info(rsb_header_info_for_unpacking.rsgp_offset, rsb_buffer_for_unpacking.slice(rsb_header_info_for_unpacking.rsgpInfo_BeginOffset, rsb_header_info_for_unpacking.autopoolInfo_BeginOffset));
        rsgp_name_list_uppercase = rsgp_name_list_uppercase.sort((a, b) => {
            return a.rsgp_pool_index - b.rsgp_pool_index;
        });
        rsgp_list_info = rsgp_list_info.sort((a, b) => {
            return a.rsgp_item_pool_index - b.rsgp_item_pool_index;
        });
        const composite_folder_list = rsb_buffer_for_unpacking.slice(rsb_header_info_for_unpacking.compositeInfo_BeginOffset, rsb_header_info_for_unpacking.compositeList_BeginOffset);
        const composite_list_info = await composite_item_list(composite_folder_list);
        const rsgp_item_unpack_list = await extract_resources_data(rsgp_name_list_uppercase, rsgp_list_info, rsb_buffer_for_unpacking, simple, decode_rton, splitres, rsb_new_extract_folder);
        for (let composite_item of composite_list_info[0]) {
            const composite_item_list = new Array();
            for (let k = 0; k < composite_item.composite_length; k++) {
                for (let composite_pool_index in composite_list_info[1]) {
                    if (composite_list_info[1][composite_pool_index].composite_pool_index == composite_item.composite_pool_index) {
                        for (let rsgp_pool_index in rsgp_item_unpack_list[1]) {
                            if (composite_list_info[1][composite_pool_index].rsgp_pool_index == rsgp_item_unpack_list[1][rsgp_pool_index].rsgp_item_pool_index) {
                                const rsgp_file_data = rsb_buffer_for_unpacking.slice(rsgp_item_unpack_list[1][rsgp_pool_index].rsgp_item_offset, rsgp_item_unpack_list[1][rsgp_pool_index].rsgp_item_offset + rsgp_item_unpack_list[1][rsgp_pool_index].rsgp_item_size);
                                let rsgp_treinfo = rsgp_item_unpack_list[1][rsgp_pool_index].rsgp_name_item;
                                if (simple) {
                                    if (rsgp_item_unpack_list[1][rsgp_pool_index].rsgp_name_item.toUpperCase() == 'PACKAGES') {
                                        await rsgp_unpack(rsgp_file_data, rsb_new_extract_folder, false, decode_rton, true, 2);
                                    }
                                    else if (rsgp_item_unpack_list[1][rsgp_pool_index].rsgp_name_item.toUpperCase().indexOf('__MANIFESTGROUP__') != -1) { }
                                    else {
                                        fs_util.outfile(`${rsb_new_extract_folder}/Packet/${rsgp_item_unpack_list[1][rsgp_pool_index].rsgp_name_item}.rsgp`, rsgp_file_data);
                                    }
                                }
                                else if (unpack_everything) {
                                    const rsgp_file_info = await rsgp_unpack(rsgp_file_data, rsb_new_extract_folder, decode_ptx, decode_rton, true, ios_argb8888);
                                    rsgp_treinfo = Object.fromEntries([[rsgp_item_unpack_list[1][rsgp_pool_index].rsgp_name_item, rsgp_file_info]]);
                                }
                                else {
                                    fs_util.outfile(`${rsb_new_extract_folder}/Packet/${rsgp_item_unpack_list[1][rsgp_pool_index].rsgp_name_item}.rsgp`, rsgp_file_data);
                                }
                                composite_item_list.push(rsgp_treinfo);
                                composite_list_info[1].splice((composite_pool_index as any), 1);
                                rsgp_item_unpack_list[1].splice(rsgp_pool_index, 1);
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            TreRSGPInfo.push([composite_item.composite_name, composite_item_list]);
        }
        fs_util.writejson(`${rsb_new_extract_folder}/TreRSBInfo.json`, Object.fromEntries(TreRSGPInfo));
    }
    else {
        throw new Error(localization("not_a_rsb"));
    }
}
