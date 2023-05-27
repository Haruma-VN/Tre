interface rsg_head_infomation {
    magic: string;
    version: number;
    flags: number;
    file_offset: number;
    part_0_offset: number;
    part_0_zlib: number;
    part_0_size: number;
    part_1_offset: number;
    part_1_zlib: number;
    part_1_size: number;
    file_list_length: number;
    file_list_offset: number;
};