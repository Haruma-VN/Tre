import zlib from 'zlib';
import fs from 'fs-extra';
export default async function (path) {
    let write = fs.createWriteStream(`${path}.smf`);
    const smf_compression = await zlib.deflateSync(fs.readFileSync(path), { level: 9 });
    await write.write(Buffer.from('D4FEADDE00204C05', 'hex'));
    await write.write(smf_compression);
    write.close();
}
