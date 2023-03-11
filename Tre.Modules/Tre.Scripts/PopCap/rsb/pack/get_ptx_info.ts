"use strict";
import { SmartBuffer } from 'smart-buffer';
export default async function (RSGP_items_packet_list:any) {
    let ptx_buffer = new SmartBuffer();
    RSGP_items_packet_list.forEach((rsgp_data:any) => {
        if (rsgp_data.image_height != 0) {
            let ptx_info = new SmartBuffer();
            ptx_info.writeInt32LE(rsgp_data.image_width);
            ptx_info.writeInt32LE(rsgp_data.image_height);
            ptx_info.writeInt32LE(rsgp_data.image_width * 4);
            ptx_info.writeInt32LE(rsgp_data.format);
            ptx_buffer.writeBuffer(ptx_info.toBuffer());
        }
    });
    return ptx_buffer.toBuffer();
}
