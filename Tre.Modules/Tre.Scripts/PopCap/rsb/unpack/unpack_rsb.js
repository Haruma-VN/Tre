"use strict";
import { SmartBuffer } from "smart-buffer";
import fs from 'fs-extra';
import { makefolder, writejson } from '../../../../Tre.Libraries/Tre.FileSystem/util.js';
import { parse } from 'node:path';
import zlib from 'zlib';
export default async function (rsb_path) {
    let rsb_data = SmartBuffer.fromBuffer(fs.readFileSync(rsb_path));
    const header = rsb_data.readBuffer(4).toString('hex');
    header === 'd4feadde' ? rsb_data = SmartBuffer.fromBuffer(zlib.inflateSync(fs.readFileSync(rsb_path).slice(8))) : {};
    const compression_list_begin = rsb_data.readInt32LE(56);
    const compression_list_end = rsb_data.readInt32LE(68);
    const rsgp_info_begin = rsb_data.readInt32LE(44);
    const autopool_info_begin = rsb_data.readInt32LE(76);
    let rsgp_offset = rsb_data.readInt32LE(108);
    let TreRSBInfo = new Array();
    makefolder(`${parse(rsb_path).dir}/${parse(rsb_path).name}.rsg/Packet/`);
    for (let i = compression_list_begin; i < compression_list_end; i = i + 1156) {
        let compression_folder = SmartBuffer.fromBuffer(rsb_data.toBuffer().slice(i, i + 1156));
        const compression_folder_name = rsb_data.toBuffer().slice(i, i + 128).toString().replaceAll('_CompositeShell', '').replaceAll('\x00', '');
        const number_item = compression_folder.readInt32LE(1152);
        let RSGP_Object = new Array();
        for (let k = 128; k < 128 + (number_item * 16); k = k + 16) {
            let number_folder = compression_folder.readInt32LE(k);
            let rsgp_info = SmartBuffer.fromBuffer(rsb_data.toBuffer().slice(rsgp_info_begin + (204 * number_folder), rsgp_info_begin + 204 + (204 * number_folder)));
            let autopool_info = SmartBuffer.fromBuffer(rsb_data.toBuffer().slice(autopool_info_begin + (152 * number_folder), autopool_info_begin + 152 + (152 * number_folder)));
            let rsgp_name = "";
            const rsgp_size = rsgp_info.readInt32LE(164) + rsgp_info.readInt32LE(168);
            rsgp_info.toBuffer().slice(0, 128).toString().indexOf('\x00') !== -1 ? rsgp_name = rsgp_info.toBuffer().slice(0, 128).toString().replaceAll('\x00', '') : rsgp_name = autopool_info.toBuffer().slice(0, 128).toString().replace('_AutoPool', '').replaceAll('\x00', '');
            let rsgp_data = SmartBuffer.fromBuffer(rsb_data.toBuffer().slice(rsgp_offset, rsgp_offset + rsgp_size));
            rsgp_data.readBuffer(4).toString() !== 'pgsr' ? rsgp_data.writeString('psgr', 0).writeInt32LE(4).writeInt32LE(0).writeInt32LE(0).writeInt32LE(rsgp_info.readInt32LE(140)) : {};
            RSGP_Object.push(parse(rsgp_name).name);
            const rsgp_file = fs.createWriteStream(`${parse(rsb_path).dir}/${parse(rsb_path).name}.rsg/Packet/${rsgp_name}.rsgp`);
            rsgp_file.write(rsgp_data.toBuffer());
            rsgp_file.close();
            rsgp_offset += rsgp_size;
        }
        let RSGP_Composite = new Array();
        RSGP_Composite.push(compression_folder_name);
        RSGP_Composite.push(RSGP_Object);
        TreRSBInfo.push(RSGP_Composite);
    }
    TreRSBInfo = Object.fromEntries(TreRSBInfo);
    writejson(`${parse(rsb_path).dir}/${parse(rsb_path).name}.rsg/TreRSBInfo.json`, TreRSBInfo);
}
;
