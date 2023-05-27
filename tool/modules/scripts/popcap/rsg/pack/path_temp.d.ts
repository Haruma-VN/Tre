declare type path_temp = Array<{
    path_slice: string,
    key: number,
    packet_index: number,
    is_atlas: boolean,
    position: Array<{
        w_position: number,
        offset: number
    }>
}>