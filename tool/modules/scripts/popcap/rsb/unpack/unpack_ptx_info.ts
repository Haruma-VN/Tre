"use strict";
export default function unpack_ptx_info(ptx_b: Buffer) {
    const ptx_info_list: Array<{width: number, height: number, width_plus: number, fmt: number}> = [];
    for (let i = 0; i < ptx_b.length; i += 16) {
        const width: number = ptx_b.readUInt16LE(i);
        const height: number = ptx_b.readUInt16LE(i + 4);
        const width_plus: number = ptx_b.readUInt16LE(i + 8);
        const fmt: number = ptx_b.readUInt16LE(i + 12);
        ptx_info_list.push({ width, height, width_plus, fmt });
    }
    return ptx_info_list;
    
}