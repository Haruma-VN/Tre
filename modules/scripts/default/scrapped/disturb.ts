"use strict";
import { SmartBuffer } from "smart-buffer";
import get_header_info from "../../popcap/rsb/unpack/rsb_read_header_info.js";
import nodejs_packages_crypto from 'node:crypto';
import localization from "../../../callback/localization.js";

export type smart_header = {
    magic: number,
    version: number,
    rsgp_offset: number,
    fileList_Length: number,
    fileList_BeginOffset: number,
    rsgpList_Length: number,
    rsgpList_BeginOffset: number,
    rsgp_Number: number,
    rsgpInfo_BeginOffset: number,
    rsgpInfo_EachLength: number,
    composite_Number: number,
    compositeInfo_BeginOffset: number,
    compositeInfo_EachLength: number,
    compositeList_Length: number,
    compositeList_BeginOffset: number,
    autopool_Number: number,
    autopoolInfo_BeginOffset: number,
    autopoolInfo_EachLength: number,
    ptx_Number: number,
    ptxInfo_BeginOffset: number,
    ptxInfo_EachLength: number,
    Part1_BeginOffset: number,
    Part2_BeginOffset: number,
    Part3_BeginOffset: number,
};

/**
 * 
 * @param popcap_rsb_file_to_disturb_bundles_data - Pass in an argument after read file
 * @returns - RSB after being disturbed - Tre Scrapped Module
 * @module - Using get_header_info & nodejs:crypto
 */

function popcap_rsb_disturb(
    popcap_rsb_file_to_disturb_bundles_data: Buffer,
): Buffer {
    //#region 

    /**
     * @param - Throw the error directly and stop the program if reading buffer failed
     */

    if (popcap_rsb_file_to_disturb_bundles_data === null || popcap_rsb_file_to_disturb_bundles_data === void 0 || popcap_rsb_file_to_disturb_bundles_data === undefined
        || !(popcap_rsb_file_to_disturb_bundles_data instanceof Buffer)) {
        throw new Error(localization("cannot_read_data_inside_rsb") as never) as never;
    }

    /**
     * @param smart_popcap_rsb_buffer_for_writing - Start an Buffer process whole bundle data passed in
     * @param smart_popcap_rsb_buffer_for_writing - This will be the RSB Disturb
     */

    const smart_popcap_rsb_buffer_for_writing: SmartBuffer = SmartBuffer.fromBuffer(popcap_rsb_file_to_disturb_bundles_data satisfies Buffer);


    if (smart_popcap_rsb_buffer_for_writing === null || smart_popcap_rsb_buffer_for_writing === void 0 || smart_popcap_rsb_buffer_for_writing === undefined) {
        throw new Error(localization("cannot_read_data_inside_rsb") as never) as never;
    }

    /**
     * @param popcap_rsb_header_info -  Loaded the "get_header_info" function from the module import
     * @returns - The data if the RSB is not corrupted (perhaps)
     */

    const popcap_rsb_header_info: {
        magic: number,
        version: number,
        rsgp_offset: number,
        fileList_Length: number,
        fileList_BeginOffset: number,
        rsgpList_Length: number,
        rsgpList_BeginOffset: number,
        rsgp_Number: number,
        rsgpInfo_BeginOffset: number,
        rsgpInfo_EachLength: number,
        composite_Number: number,
        compositeInfo_BeginOffset: number,
        compositeInfo_EachLength: number,
        compositeList_Length: number,
        compositeList_BeginOffset: number,
        autopool_Number: number,
        autopoolInfo_BeginOffset: number,
        autopoolInfo_EachLength: number,
        ptx_Number: number,
        ptxInfo_BeginOffset: number,
        ptxInfo_EachLength: number,
        Part1_BeginOffset: number,
        Part2_BeginOffset: number,
        Part3_BeginOffset: number,
    } = get_header_info(smart_popcap_rsb_buffer_for_writing) satisfies {
        magic: number,
        version: number,
        rsgp_offset: number,
        fileList_Length: number,
        fileList_BeginOffset: number,
        rsgpList_Length: number,
        rsgpList_BeginOffset: number,
        rsgp_Number: number,
        rsgpInfo_BeginOffset: number,
        rsgpInfo_EachLength: number,
        composite_Number: number,
        compositeInfo_BeginOffset: number,
        compositeInfo_EachLength: number,
        compositeList_Length: number,
        compositeList_BeginOffset: number,
        autopool_Number: number,
        autopoolInfo_BeginOffset: number,
        autopoolInfo_EachLength: number,
        ptx_Number: number,
        ptxInfo_BeginOffset: number,
        ptxInfo_EachLength: number,
        Part1_BeginOffset: number,
        Part2_BeginOffset: number,
        Part3_BeginOffset: number,
    };

    for (let popcap_rsb_disturb_bundles_data_write_offset: number = popcap_rsb_header_info.rsgpInfo_BeginOffset; popcap_rsb_disturb_bundles_data_write_offset as number < (popcap_rsb_header_info.rsgpInfo_BeginOffset as number) + (popcap_rsb_header_info.rsgpInfo_EachLength as number) * (popcap_rsb_header_info.rsgp_Number as number); (popcap_rsb_disturb_bundles_data_write_offset satisfies number) += popcap_rsb_header_info.rsgpInfo_EachLength satisfies number) {
        const popcap_rsgp_item_random_bytes: Buffer = (nodejs_packages_crypto).randomBytes(128) as Buffer;
        (smart_popcap_rsb_buffer_for_writing as SmartBuffer).writeBuffer(popcap_rsgp_item_random_bytes as Buffer, popcap_rsb_disturb_bundles_data_write_offset as number);
        const popcap_rsgp_item_start_offset: number = (smart_popcap_rsb_buffer_for_writing satisfies SmartBuffer).readInt32LE((popcap_rsb_disturb_bundles_data_write_offset as number) + 128);
        const popcap_rsgp_head_ramdom_bytes_test: Buffer = nodejs_packages_crypto.randomBytes(16 * 4) satisfies Buffer;
        (smart_popcap_rsb_buffer_for_writing as SmartBuffer).writeBuffer(popcap_rsgp_head_ramdom_bytes_test as Buffer, popcap_rsgp_item_start_offset satisfies number);
    }

    for (let popcap_auto_item_suffix_params: number = popcap_rsb_header_info.autopoolInfo_BeginOffset satisfies number; popcap_auto_item_suffix_params as number < (popcap_rsb_header_info.autopoolInfo_BeginOffset satisfies number) + (popcap_rsb_header_info.autopoolInfo_EachLength satisfies number) * (popcap_rsb_header_info.autopool_Number satisfies number); (popcap_auto_item_suffix_params satisfies number) += (popcap_rsb_header_info.autopoolInfo_EachLength satisfies number)) {
        const autopool_random_bytes: Buffer = nodejs_packages_crypto.randomBytes(128);
        (smart_popcap_rsb_buffer_for_writing satisfies SmartBuffer).writeBuffer(autopool_random_bytes as Buffer, popcap_auto_item_suffix_params as number);
    }

    return smart_popcap_rsb_buffer_for_writing.toBuffer() satisfies Buffer;
    //#endregion
}


export default popcap_rsb_disturb;