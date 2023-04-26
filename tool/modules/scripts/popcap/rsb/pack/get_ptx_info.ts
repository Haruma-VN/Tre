"use strict";
import { SmartBuffer } from "smart-buffer";
export default async function (RSG_items_packet_list: any) {
    let ptx_buffer = new SmartBuffer();
    RSG_items_packet_list.forEach((rsg_data: any) => {
        if (rsg_data.image_height !== 0) {
            let ptx_info = new SmartBuffer();
            ptx_info.writeInt32LE(rsg_data.image_width);
            ptx_info.writeInt32LE(rsg_data.image_height);
            ptx_info.writeInt32LE(rsg_data.image_width * 4);
            ptx_info.writeInt32LE(rsg_data.format);
            ptx_buffer.writeBuffer(ptx_info.toBuffer());
        }
    });
    return ptx_buffer.toBuffer();
}
