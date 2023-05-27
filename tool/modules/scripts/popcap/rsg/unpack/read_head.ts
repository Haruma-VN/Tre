"use strict";
export default function rsg_head_infomation(rsg_buf: Buffer): rsg_head_infomation {
    let bs: number = 0;
    const magic: string = rsg_buf.toString("ascii", 0, 4);
    const version: number = rsg_buf.readUInt32LE(bs+=4);
    const null_1: number = rsg_buf.readInt32LE(bs+=4);
    const null_2: number = rsg_buf.readInt32LE(bs+=4);
    const flags: number = rsg_buf.readUInt32LE(bs+=4);
    const file_offset: number = rsg_buf.readUInt32LE(bs+=4);
    const part_0_offset: number = rsg_buf.readUInt32LE(bs+=4);
    const part_0_zlib: number = rsg_buf.readUInt32LE(bs+=4);
    const part_0_size: number = rsg_buf.readUInt32LE(bs+=4);
    const null_3: number = rsg_buf.readInt32LE(bs+=4);
    const part_1_offset: number = rsg_buf.readUInt32LE(bs+=4);
    const part_1_zlib: number = rsg_buf.readUInt32LE(bs+=4);
    const part_1_size: number = rsg_buf.readUInt32LE(bs+=4);
    const null_4: number = rsg_buf.readInt32LE(bs+=4);
    const null_5: number = rsg_buf.readInt32LE(bs+=4);
    const null_6: number = rsg_buf.readInt32LE(bs+=4);
    const null_7: number = rsg_buf.readInt32LE(bs+=4);
    const null_8: number = rsg_buf.readInt32LE(bs+=4);
    const file_list_length: number = rsg_buf.readUInt32LE(bs+=4);
    const file_list_offset: number = rsg_buf.readUInt32LE(bs+=4);
    const head_infomation: rsg_head_infomation = {
        magic,
        version,
        flags,
        file_offset,
        part_0_offset,
        part_0_zlib,
        part_0_size,
        part_1_offset,
        part_1_zlib,
        part_1_size,
        file_list_length,
        file_list_offset,
    }
    return head_infomation;
}
