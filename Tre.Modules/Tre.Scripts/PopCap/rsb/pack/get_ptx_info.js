import { SmartBuffer } from 'smart-buffer';
export default async function (rsgp_unpacked) {
    let ptx_buffer = new SmartBuffer();
    rsgp_unpacked.forEach((data) => {
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
