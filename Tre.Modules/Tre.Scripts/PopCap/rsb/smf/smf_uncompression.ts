import zlib from 'zlib';
import fs from 'fs-extra';
import { parse } from 'node:path';
export default async function (path: string): Promise<void> {
    let write = fs.createWriteStream(`${parse(path).dir}/${parse(path).name}`);
    const smf_uncompression = await zlib.inflateSync(fs.readFileSync(path).slice(8));
    await write.write(smf_uncompression);
    write.close();
}
