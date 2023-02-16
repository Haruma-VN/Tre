import zlib from 'zlib';
import fs from 'fs-extra';
export default async function (path: string): Promise<void> {
    const smf_compression: zlib.Deflate = zlib.createDeflate({ level: 9 });
    let read: fs.ReadStream = fs.createReadStream(path);
    let write: fs.WriteStream = fs.createWriteStream(`${path}.smf`);
    await write.write(Buffer.from('D4FEADDE00204C05', 'hex'));
    await read.pipe(smf_compression).pipe(write);
};