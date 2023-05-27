declare type packet_info = {
    head_version: number,
    use_packet_data: boolean | null,
    compression_flags: number,
    res: Array<any>,
}