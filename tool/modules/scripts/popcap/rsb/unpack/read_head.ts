"use strict";
export default function rsb_head_infomation(rsb_buf: Buffer): rsb_head_infomation {
    let bs: number = 0;
    const magic: string = rsb_buf.toString("ascii", 0, 4);
    const version: number = rsb_buf.readUInt32LE(bs+=4);
    const null_1: number = rsb_buf.readUInt32LE(bs+=4);
    let rsg_offset: number = rsb_buf.readUInt32LE(bs+=4);
    const file_list_length: number = rsb_buf.readUInt32LE(bs+=4);
    const file_list_begin_offset: number = rsb_buf.readUInt32LE(bs+=4);
    const null_2: number = rsb_buf.readUInt32LE(bs+=4);
    const null_3: number = rsb_buf.readUInt32LE(bs+=4);
    const rsg_list_length: number = rsb_buf.readUInt32LE(bs+=4);
    const rsg_list_begin_offset: number = rsb_buf.readUInt32LE(bs+=4);
    const rsg_number: number = rsb_buf.readUInt32LE(bs+=4);
    const rsg_info_begin_offset: number = rsb_buf.readUInt32LE(bs+=4);
    const rsg_info_each_length: number = rsb_buf.readUInt32LE(bs+=4);
    const composite_number: number = rsb_buf.readUInt32LE(bs+=4);
    const composite_info_begin_offset: number = rsb_buf.readUInt32LE(bs+=4);
    const composite_info_each_length: number = rsb_buf.readUInt32LE(bs+=4);
    const composite_list_length: number = rsb_buf.readUInt32LE(bs+=4);
    const composite_list_begin_offset: number = rsb_buf.readUInt32LE(bs+=4);
    const autopool_number: number = rsb_buf.readUInt32LE(bs+=4);
    const autopool_info_begin_offset: number = rsb_buf.readUInt32LE(bs+=4);
    const autopool_info_each_length: number = rsb_buf.readUInt32LE(bs+=4);
    const ptx_number: number = rsb_buf.readUInt32LE(bs+=4);
    const ptx_info_begin_offset: number = rsb_buf.readUInt32LE(bs+=4);
    const ptx_info_each_length: number = rsb_buf.readUInt32LE(bs+=4);
    const part1_begin_offset: number = rsb_buf.readUInt32LE(bs+=4);
    const part2_begin_offset: number = rsb_buf.readUInt32LE(bs+=4);
    const part3_begin_offset: number = rsb_buf.readUInt32LE(bs+=4);
    if (version === 4) {
        rsg_offset = rsb_buf.readUInt32LE(bs+=4);
    }
    const head_infomation: rsb_head_infomation = {
        magic,
        version,
        rsg_offset,
        file_list_length,
        file_list_begin_offset,
        rsg_list_length,
        rsg_list_begin_offset,
        rsg_number,
        rsg_info_begin_offset,
        rsg_info_each_length,
        composite_number,
        composite_info_begin_offset,
        composite_info_each_length,
        composite_list_length,
        composite_list_begin_offset,
        autopool_number,
        autopool_info_begin_offset,
        autopool_info_each_length,
        ptx_number,
        ptx_info_begin_offset,
        ptx_info_each_length,
        part1_begin_offset,
        part2_begin_offset,
        part3_begin_offset
    }
    return head_infomation;
}
