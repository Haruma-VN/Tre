import { SmartBuffer } from 'smart-buffer';
export interface rsgp_info_for_ptx {
    Width: number,
    Height: number,
    Fmt: number
}
export default async function (rsgp_unpacked: rsgp_info_for_ptx[]): Promise<Buffer> {
    let ptx_buffer: SmartBuffer = new SmartBuffer();
    rsgp_unpacked.forEach((data: rsgp_info_for_ptx) => {
        if (data.Width !== undefined) {
            let ptx_info = new SmartBuffer();
            ptx_info.writeInt32LE(data.Width);
            ptx_info.writeInt32LE(data.Height);
            ptx_info.writeInt32LE(data.Width * 4);
            ptx_info.writeInt32LE(data.Fmt);
            ptx_buffer.writeBuffer(ptx_info.toBuffer());
        }
    });
    return ptx_buffer.toBuffer();
}