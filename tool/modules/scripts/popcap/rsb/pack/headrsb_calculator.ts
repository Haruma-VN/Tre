"use strict";
import { SmartBuffer } from "smart-buffer";
import BeautifyOffset from "../../rsg/beautify_offset.js";
export default function (
    rsgpfile_info_number: number,
    file_list_length: number,
    rsgp_list_length: number,
    composite_list_length: number,
    composite_info_length: number,
    composite_number: number,
    ptx_length: number
) {
    const rsb_head_info = new SmartBuffer();
    const rsgp_data_info_length = rsgpfile_info_number * 204;
    const autopool_info_length = rsgpfile_info_number * 152;
    let head_length =
        112 +
        file_list_length +
        rsgp_list_length +
        composite_list_length +
        composite_info_length +
        ptx_length +
        rsgp_data_info_length +
        autopool_info_length;
    const empty_byte_length_to_fill = BeautifyOffset(head_length);
    head_length += empty_byte_length_to_fill;
    rsb_head_info.writeString("1bsr");
    rsb_head_info.writeInt32LE(4);
    rsb_head_info.writeInt32LE(0);
    rsb_head_info.writeInt32LE(head_length);
    rsb_head_info.writeInt32LE(file_list_length);
    rsb_head_info.writeInt32LE(112);
    rsb_head_info.writeInt32LE(0);
    rsb_head_info.writeInt32LE(0);
    rsb_head_info.writeInt32LE(rsgp_list_length);
    rsb_head_info.writeInt32LE(112 + file_list_length);
    rsb_head_info.writeInt32LE(rsgpfile_info_number);
    rsb_head_info.writeInt32LE(
        112 +
            file_list_length +
            rsgp_list_length +
            composite_info_length +
            composite_list_length
    );
    rsb_head_info.writeInt32LE(204);
    rsb_head_info.writeInt32LE(composite_number);
    rsb_head_info.writeInt32LE(112 + file_list_length + rsgp_list_length);
    rsb_head_info.writeInt32LE(1156);
    rsb_head_info.writeInt32LE(composite_list_length);
    rsb_head_info.writeInt32LE(
        112 + file_list_length + rsgp_list_length + composite_info_length
    );
    rsb_head_info.writeInt32LE(rsgpfile_info_number);
    rsb_head_info.writeInt32LE(
        112 +
            file_list_length +
            rsgp_list_length +
            composite_info_length +
            composite_list_length +
            rsgp_data_info_length
    );
    rsb_head_info.writeInt32LE(152);
    rsb_head_info.writeInt32LE(ptx_length / 16);
    rsb_head_info.writeInt32LE(
        112 +
            file_list_length +
            rsgp_list_length +
            composite_info_length +
            composite_list_length +
            rsgp_data_info_length +
            autopool_info_length
    );
    rsb_head_info.writeInt32LE(16);
    rsb_head_info.writeInt32LE(0);
    rsb_head_info.writeInt32LE(0);
    rsb_head_info.writeInt32LE(0);
    rsb_head_info.writeInt32LE(head_length);
    return [rsb_head_info.toBuffer(), head_length, empty_byte_length_to_fill];
}
