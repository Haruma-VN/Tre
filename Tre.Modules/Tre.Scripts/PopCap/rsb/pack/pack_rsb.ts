"use strict";
import * as fs_util from '../../../../Tre.Libraries/Tre.FileSystem/util.js';
import pack_rsb_everything from './pack_rsb_everything.js';
import crossPathSort from 'cross-path-sort';
import PackRSB from './pack_rsb_data.js';
import Unpack_NamePath from './unpack_name_path.js';
import { parse } from 'node:path';
import { TreErrorMessage } from '../../../../../Tre.Modules/Tre.Debug/Tre.ErrorSystem.js';
export default async function (rsb_path: string, pack_simple:boolean = false, pack_everything:boolean = false) {
    let TreRSBInfo: any = new Object();
    let pack_method: string | boolean = false;
    let RSGP_file_data_list = new Array()
    try {
        TreRSBInfo = Object.entries(fs_util.readjson(`${rsb_path}/TreRSBInfo.json`));
    }
    catch (error) {
        TreErrorMessage({ error: "Can't read TreRSBInfo", reason: "Can't read TreRSBInfo", system: error.message.toString() }, "Can't read TreRSBInfo");
        return;
    };
    if (pack_simple) {
        pack_method = 'simple';
    }
    else if (pack_everything) {
        pack_method = 'everything';
        const rsb_info = await pack_rsb_everything(TreRSBInfo, rsb_path);
        TreRSBInfo = rsb_info[0];
        RSGP_file_data_list = rsb_info[1];
    };
    let RSB_composite_list = new Array();
    const RSGP_items_list = new Array();
    let RSGP_items_list_temp = new Array();
    let Resources = "";
    let composite_index = 0;
    TreRSBInfo.forEach(files => {
        if (files[0].indexOf('__MANIFESTGROUP__') !== -1) {
            Resources = files[0];
        }
        else {
            RSB_composite_list.push(files[0]);
            files[1].forEach(rsgp_item => {
                RSGP_items_list_temp.push(rsgp_item);
            })
        };
    });
    RSB_composite_list = crossPathSort.sort(RSB_composite_list);
    RSB_composite_list.push(Resources);
    RSGP_items_list_temp = crossPathSort.sort(RSGP_items_list_temp);
    RSGP_items_list_temp.forEach(name_path => {
        RSGP_items_list.push({ name_path, composite_index });
        composite_index++;
    });
    RSGP_file_data_list = crossPathSort.sort(RSGP_file_data_list, {
        pathKey: 'rsgp_name'
    })
    RSGP_items_list.push({ name_path: Resources, composite_index });
    const RSGP_items_packet_list = await Unpack_NamePath(rsb_path, RSGP_items_list, pack_method, RSGP_file_data_list);
    const rsb_file_data = await PackRSB(rsb_path, (pack_method as any), TreRSBInfo, RSB_composite_list, RSGP_items_list, RSGP_items_packet_list, RSGP_file_data_list);
    fs_util.outfile(`${parse(rsb_path).dir}/${parse(rsb_path).name}.obb`, rsb_file_data);
}