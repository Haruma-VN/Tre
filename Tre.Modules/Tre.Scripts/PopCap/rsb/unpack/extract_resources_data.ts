"use strict";
import rton2json from '../../rton/rton2json.js';
import zlib from 'zlib';
import { res_split } from '../../../../Tre.Scripts/PopCap/resources/util.js';
import * as fs_util from '../../../../Tre.Libraries/Tre.FileSystem/util.js';
import { SmartBuffer } from 'smart-buffer';
export default async function (rsgp_name_list_uppercase:any,
     rsgp_list_info:any, 
     rsb_buffer_for_unpacking:any, 
     simple_unpack_method:any, decode_rton:boolean,
      splitres:boolean, rsb_new_extract_folder:any) {
    let resources_file_data:any;
    for (let k = rsgp_name_list_uppercase.length - 1; k >= 0; k--) {
        if (rsgp_name_list_uppercase[k].name_path.indexOf('__MANIFESTGROUP__') != -1) {
            for (let i = rsgp_list_info.length - 1; i >= 0; i--) {
                if (rsgp_name_list_uppercase[k].rsgp_pool_index == rsgp_list_info[i].rsgp_item_pool_index) {
                    let resources_rsgp_package = rsb_buffer_for_unpacking.slice(rsgp_list_info[i].rsgp_item_offset, rsgp_list_info[i].rsgp_item_offset + rsgp_list_info[i].rsgp_item_size);
                    if (resources_rsgp_package.slice(0, 4).toString() != 'pgsr') {
                        const resources_header_info_repair = new SmartBuffer();
                        resources_header_info_repair.writeString('pgsr').writeInt8(4).writeBuffer(Buffer.alloc(11));
                        resources_header_info_repair.writeBuffer(rsgp_list_info[i].rsgp_temp_info_fixing_rac_rsb);
                        resources_rsgp_package.fill(resources_header_info_repair.toBuffer(), 0, 64);
                    }
                    const resources_zlib_data = resources_rsgp_package.slice(28, 32).readUInt32LE() !== resources_rsgp_package.slice(32, 36).readUInt32LE() ?
                        zlib.unzipSync(resources_rsgp_package.slice(resources_rsgp_package.slice(24, 28).readUInt32LE(), resources_rsgp_package.slice(24, 28).readUInt32LE() + resources_rsgp_package.slice(28, 32).readUInt32LE()))
                        : resources_rsgp_package.slice(resources_rsgp_package.slice(24, 28).readUInt32LE(), resources_rsgp_package.slice(24, 28).readUInt32LE() + resources_rsgp_package.slice(28, 32).readUInt32LE());
                    resources_file_data = await rton2json(resources_zlib_data);
                    if (rsgp_list_info[i].rsgp_name_item[126] + rsgp_list_info[i].rsgp_name_item[127] != 0 || resources_rsgp_package.slice(0, 4).toString() !== 'pgsr') {
                        const resources_parse_json = JSON.parse(resources_file_data.slice());
                        const res_rsgp_list = new Array();
                        for (let group of resources_parse_json.groups) {
                            if (group.type == 'simple') {
                                res_rsgp_list.push(group.id);
                            }
                        };
                        for (let rsgp_index in rsgp_list_info) {
                            for (let key in rsgp_name_list_uppercase) {
                                if (rsgp_name_list_uppercase[key].rsgp_pool_index == rsgp_list_info[rsgp_index].rsgp_item_pool_index) {
                                    rsgp_list_info[rsgp_index].rsgp_name_item = rsgp_name_list_uppercase[key].name_path;
                                    break;
                                }
                            };
                            const rsgp_header_info_repair = new SmartBuffer();
                            rsgp_header_info_repair.writeString('pgsr').writeInt8(4).writeBuffer(Buffer.alloc(11));
                            rsgp_header_info_repair.writeBuffer(rsgp_list_info[rsgp_index].rsgp_temp_info_fixing_rac_rsb);
                            rsb_buffer_for_unpacking.fill(rsgp_header_info_repair.toBuffer(), rsgp_list_info[rsgp_index].rsgp_item_offset, rsgp_list_info[rsgp_index].rsgp_item_offset + 64);
                            rsb_buffer_for_unpacking.fill(Buffer.alloc(4), rsgp_list_info[rsgp_index].rsgp_item_offset + 48, rsgp_list_info[rsgp_index].rsgp_item_offset + 52)

                        }
                        for (let rsgp_pool_index in rsgp_list_info) {
                            for (let rsgp_name_path in res_rsgp_list) {
                                if (rsgp_list_info[rsgp_pool_index].rsgp_name_item == res_rsgp_list[rsgp_name_path].toUpperCase()) {
                                    rsgp_list_info[rsgp_pool_index].rsgp_name_item = res_rsgp_list[rsgp_name_path];
                                    res_rsgp_list.splice((rsgp_name_path as any), 1);
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        for (let rsgp_item in rsgp_list_info) {
                            rsgp_list_info[rsgp_item].rsgp_name_item = rsgp_list_info[rsgp_item].rsgp_name_item.slice(0, (rsgp_list_info[rsgp_item].rsgp_name_item.indexOf('\x00'))).toString()
                        }
                    }
                    if (simple_unpack_method) {
                        if (decode_rton) {
                            fs_util.outfile(`${rsb_new_extract_folder}/Res/PROPERTIES/RESOURCES.json`, resources_file_data);
                            if (splitres) {
                                await res_split(`${rsb_new_extract_folder}/Res/PROPERTIES/RESOURCES.json`);
                                fs_util.delete_file(`${rsb_new_extract_folder}/Res/PROPERTIES/RESOURCES.json`);
                            };
                        }
                        else {
                            fs_util.outfile(`${rsb_new_extract_folder}/Res/PROPERTIES/RESOURCES.rton`, resources_zlib_data);
                        }
                    };
                    break;
                }
            }
        }
    }
    return [rsb_buffer_for_unpacking, rsgp_list_info];
}