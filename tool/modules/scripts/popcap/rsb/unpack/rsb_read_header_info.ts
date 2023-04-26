"use strict";
export default function (iz_magic_header_rsb: any): any {
    const magic: number = iz_magic_header_rsb.readString(4);
    const version: number = iz_magic_header_rsb.readUInt32LE();
    let null_bytes: number = iz_magic_header_rsb.readBuffer(4);
    let rsg_offset: number = iz_magic_header_rsb.readUInt32LE();
    const fileList_Length: number = iz_magic_header_rsb.readInt32LE();
    const fileList_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    null_bytes = iz_magic_header_rsb.readBuffer(8);
    const rsgList_Length: number = iz_magic_header_rsb.readUInt32LE();
    const rsgList_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    const rsg_Number: number = iz_magic_header_rsb.readUInt32LE();
    const rsgInfo_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    const rsgInfo_EachLength: number = iz_magic_header_rsb.readUInt32LE();
    const composite_Number: number = iz_magic_header_rsb.readUInt32LE();
    const compositeInfo_BeginOffset: number =
        iz_magic_header_rsb.readUInt32LE();
    const compositeInfo_EachLength: number = iz_magic_header_rsb.readUInt32LE();
    const compositeList_Length: number = iz_magic_header_rsb.readUInt32LE();
    const compositeList_BeginOffset: number =
        iz_magic_header_rsb.readUInt32LE();
    const autopool_Number: number = iz_magic_header_rsb.readUInt32LE();
    const autopoolInfo_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    const autopoolInfo_EachLength: number = iz_magic_header_rsb.readUInt32LE();
    const ptx_Number: number = iz_magic_header_rsb.readUInt32LE();
    const ptxInfo_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    const ptxInfo_EachLength: number = iz_magic_header_rsb.readUInt32LE();
    const Part1_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    const Part2_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    const Part3_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    if (version === 4) {
        rsg_offset = iz_magic_header_rsb.readUInt32LE();
    }
    return {
        magic,
        version,
        rsg_offset,
        fileList_Length,
        fileList_BeginOffset,
        rsgList_Length,
        rsgList_BeginOffset,
        rsg_Number,
        rsgInfo_BeginOffset,
        rsgInfo_EachLength,
        composite_Number,
        compositeInfo_BeginOffset,
        compositeInfo_EachLength,
        compositeList_Length,
        compositeList_BeginOffset,
        autopool_Number,
        autopoolInfo_BeginOffset,
        autopoolInfo_EachLength,
        ptx_Number,
        ptxInfo_BeginOffset,
        ptxInfo_EachLength,
        Part1_BeginOffset,
        Part2_BeginOffset,
        Part3_BeginOffset,
    };
}
