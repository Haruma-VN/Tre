"use strict";
import zlib from "zlib";
import beautify_offset from "./beautify_offset.js";
import { WrongPropertyValue } from "../../../../implement/error.js";
import localization from "../../../../callback/localization.js";
export default function compressor(atlas_res_group: Buffer, data_res_group: Buffer, compression_flags: number) {
    const compression_data: {
        atlas_res_group: Array<Buffer>;
        data_res_group: Array<Buffer>;
        atlas_g_before_compressed: number;
        atlas_g_after_compressed: number;
        data_g_before_compressed: number;
        data_g_after_compressed: number;
    } = {
        atlas_res_group: [],
        data_res_group: [],
        atlas_g_before_compressed: 0,
        atlas_g_after_compressed: 0,
        data_g_before_compressed: 0,
        data_g_after_compressed: 0,
    };
    if (data_res_group.length !== 0) {
        if (compression_flags < 2) {
            compression_data.data_res_group.push(data_res_group);
            compression_data.data_g_before_compressed = compression_data.data_g_after_compressed =
                data_res_group.byteLength;
        } else {
            const zlib_data: Buffer = zlib.deflateSync(data_res_group, { level: 9 });
            compression_data.data_res_group.push(zlib_data);
            compression_data.data_g_before_compressed = data_res_group.byteLength;
            compression_data.data_g_after_compressed = zlib_data.byteLength;
            const zlib_append_b: number = beautify_offset(zlib_data.byteLength);
            if (zlib_append_b > 0) {
                compression_data.data_res_group.push(Buffer.alloc(zlib_append_b));
                compression_data.atlas_g_after_compressed += zlib_append_b;
            }
        }
    }
    if (atlas_res_group.length !== 0) {
        if (compression_flags === 0) {
            compression_data.atlas_res_group.push(atlas_res_group);
            compression_data.atlas_g_before_compressed = compression_data.atlas_g_after_compressed =
                atlas_res_group.byteLength;
        } else if (compression_flags === 2) {
            compression_data.atlas_res_group.push(atlas_res_group);
            compression_data.atlas_g_before_compressed = compression_data.atlas_g_after_compressed =
                atlas_res_group.byteLength;
            if (compression_data.data_res_group.length === 0) {
                compression_data.data_res_group.push(
                    Buffer.concat([zlib.deflateSync(Buffer.alloc(0), { level: 9 }), Buffer.alloc(4088)]),
                );
                compression_data.data_g_after_compressed = 4096;
            }
        } else {
            const zlib_data: Buffer = zlib.deflateSync(atlas_res_group, { level: 9 });
            compression_data.atlas_res_group.push(zlib_data);
            compression_data.atlas_g_before_compressed = atlas_res_group.byteLength;
            compression_data.atlas_g_after_compressed = zlib_data.byteLength;
            const zlib_append_b: number = beautify_offset(zlib_data.byteLength);
            if (zlib_append_b > 0) {
                compression_data.atlas_res_group.push(Buffer.alloc(zlib_append_b));
                compression_data.atlas_g_after_compressed += zlib_append_b;
            }
            if (compression_flags === 3 && compression_data.data_res_group.length === 0) {
                compression_data.data_res_group.push(
                    Buffer.concat([zlib.deflateSync(Buffer.alloc(0), { level: 9 }), Buffer.alloc(4088)]),
                );
                compression_data.data_g_after_compressed = 4096;
            }
        }
    }
    if (atlas_res_group.length === 0 && data_res_group.length === 0) {
        throw new WrongPropertyValue(localization("packet_size_error"), "packet", "undefined");
    }
    return compression_data;
}
