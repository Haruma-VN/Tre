import zlib from 'zlib';
import fs from 'fs-extra';
import { parse } from 'node:path';
import { slice } from 'stream-slice';
export default async function (path: string):Promise<void> {
    const smf_uncompression: zlib.Inflate = zlib.createInflate();
    let read: fs.ReadStream = fs.createReadStream(path);
    let write: fs.WriteStream = fs.createWriteStream(`${parse(path).dir}/${parse(path).name}`);
    await read.pipe(slice(8)).pipe(smf_uncompression).pipe(write);
};