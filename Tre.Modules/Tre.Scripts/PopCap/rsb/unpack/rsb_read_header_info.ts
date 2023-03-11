"use strict";
export default function (iz_magic_header_rsb: any): any {
    const magic: number = iz_magic_header_rsb.readString(4);
    const version: number = iz_magic_header_rsb.readUInt32LE();
    let null_bytes: number = iz_magic_header_rsb.readBuffer(4);
    let rsgp_offset: number = iz_magic_header_rsb.readUInt32LE();
    const fileList_Length: number = iz_magic_header_rsb.readInt32LE();
    const fileList_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    null_bytes = iz_magic_header_rsb.readBuffer(8);
    const rsgpList_Length: number = iz_magic_header_rsb.readUInt32LE();
    const rsgpList_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    const rsgp_Number: number = iz_magic_header_rsb.readUInt32LE();
    const rsgpInfo_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    const rsgpInfo_EachLength: number = iz_magic_header_rsb.readUInt32LE();
    const composite_Number: number = iz_magic_header_rsb.readUInt32LE();
    const compositeInfo_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    const compositeInfo_EachLength: number = iz_magic_header_rsb.readUInt32LE();
    const compositeList_Length: number = iz_magic_header_rsb.readUInt32LE();
    const compositeList_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    const autopool_Number: number = iz_magic_header_rsb.readUInt32LE();
    const autopoolInfo_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    const autopoolInfo_EachLength: number = iz_magic_header_rsb.readUInt32LE();
    const ptx_Number: number = iz_magic_header_rsb.readUInt32LE();
    const ptxInfo_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    const ptxInfo_EachLength: number = iz_magic_header_rsb.readUInt32LE();
    const Part1_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    const Part2_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    const Part3_BeginOffset: number = iz_magic_header_rsb.readUInt32LE();
    if (version == 4) {
        rsgp_offset = iz_magic_header_rsb.readUInt32LE();
    };
    return {
        magic, version, rsgp_offset,
        fileList_Length, fileList_BeginOffset,
        rsgpList_Length, rsgpList_BeginOffset,
        rsgp_Number, rsgpInfo_BeginOffset, rsgpInfo_EachLength,
        composite_Number, compositeInfo_BeginOffset,
        compositeInfo_EachLength, compositeList_Length,
        compositeList_BeginOffset, autopool_Number,
        autopoolInfo_BeginOffset, autopoolInfo_EachLength,
        ptx_Number, ptxInfo_BeginOffset, ptxInfo_EachLength,
        Part1_BeginOffset, Part2_BeginOffset, Part3_BeginOffset
    }
}