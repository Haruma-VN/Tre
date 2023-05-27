"use strict";
import zlib from "zlib";
export default function check_zlib(rsg_b: Buffer, head_info: rsg_head_infomation, flags: number, texture: boolean): Buffer {
    function zlib_header(a: number, b: number) {
        const zlib_level_compression: Array<[number, number]> = [
            [120, 1],
            [120, 94],
            [120, 156],
            [120, 218],
        ];
        for (let i = 0; i < zlib_level_compression.length; i++) {
            if (a === zlib_level_compression[i][0] && b === zlib_level_compression[i][1]) {
                return false;
            }
        }
        return true;
    }
    if (texture) {
        if (
            flags === 0 ||
            flags === 2 ||
            (head_info.part_1_size === head_info.part_1_zlib && head_info.part_1_size !== 0) ||
            zlib_header(rsg_b[head_info.part_1_offset], rsg_b[head_info.part_1_offset + 1])
        ) {
            return rsg_b.slice(head_info.part_1_offset, head_info.part_1_offset + head_info.part_1_size);
        } else {
            return zlib.unzipSync(rsg_b.slice(head_info.part_1_offset, head_info.part_1_offset + head_info.part_1_zlib));
        }
    } else {
        if (
            flags < 2 ||
            (head_info.part_0_size === head_info.part_0_zlib && head_info.part_0_size !== 0) ||
            zlib_header(rsg_b[head_info.part_0_offset], rsg_b[head_info.part_0_offset + 1])
        ) {
            return rsg_b.slice(head_info.part_0_offset, head_info.part_0_offset + head_info.part_0_size);
        } else {
            return zlib.unzipSync(rsg_b.slice(head_info.part_0_offset, head_info.part_0_offset + head_info.part_0_zlib));
        }
    }
}
