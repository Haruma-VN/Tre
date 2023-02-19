import { SmartBuffer } from 'smart-buffer';
export default async function (RSB_composite_files: string[], TreRSBInfo: any[], pool_index: number): Promise<ArrayBuffer> {
    let composite_shell_info: SmartBuffer = new SmartBuffer();
    for (let composite_file of RSB_composite_files) {
        for (const composite_folder of TreRSBInfo) {
            if (composite_folder[0] === composite_file) {
                let composite_shell:boolean = true;
                let composite_shell_buffer: SmartBuffer = SmartBuffer.fromBuffer(Buffer.alloc(1156));
                let composite_file_offset:number = 128;
                for (let rsgp_item of composite_folder[1].sort()) {
                    if (rsgp_item.indexOf('_1536') !== -1) {
                        composite_shell_buffer.writeInt32LE(pool_index, composite_file_offset);
                        composite_shell_buffer.writeInt32LE(1536);
                    }
                    else if (rsgp_item.indexOf('_1200') !== -1) {
                        composite_shell_buffer.writeInt32LE(pool_index, composite_file_offset);
                        composite_shell_buffer.writeInt32LE(1200);
                    }
                    else if (rsgp_item.indexOf('_768') !== -1) {
                        composite_shell_buffer.writeInt32LE(pool_index, composite_file_offset);
                        composite_shell_buffer.writeInt32LE(768);
                    }
                    else if (rsgp_item.indexOf('_640') !== -1) {
                        composite_shell_buffer.writeInt32LE(pool_index, composite_file_offset);
                        composite_shell_buffer.writeInt32LE(384);
                    }
                    else if (rsgp_item.indexOf('_384') !== -1) {
                        composite_shell_buffer.writeInt32LE(pool_index, composite_file_offset);
                        composite_shell_buffer.writeInt32LE(384);
                    }
                    else {
                        composite_shell_buffer.writeInt32LE(pool_index, composite_file_offset);
                    };
                    if (rsgp_item.indexOf('_1536') !== -1 || rsgp_item.indexOf('_768') !== -1 || rsgp_item.indexOf('_384') !== -1 || rsgp_item.indexOf('_640') !== -1 ||rsgp_item.indexOf('_1200') !== -1 || rsgp_item.toUpperCase().indexOf('_COMMON') !== -1) {
                        composite_shell = false;
                    }
                    composite_file_offset += 16;
                    pool_index++;
                };
                let composite_file_name: string = "";
                composite_shell !== true ? composite_file_name = composite_file : composite_file_name = `${composite_file}_CompositeShell`;
                composite_shell_buffer.writeString(composite_file_name, 0);
                composite_shell_buffer.writeInt32LE(composite_folder[1].length, 1152);
                composite_shell_info.writeBuffer(composite_shell_buffer.toBuffer());
            };
        };
    };
    return composite_shell_info.toBuffer();
}