import zlib from 'zlib';
import fs from 'fs-extra';
import { resolve } from 'node:path';
import localization from '../../../../Tre.Callback/localization.js';
import * as color from "../../../../Tre.Libraries/Tre.Color/color.js";

export default async function (path: string): Promise<void> {
    console.log(`${color.fggreen_string("◉ " + localization("execution_out")+":\n     ")} ${resolve(`${path}.smf`)}`);
    let write = fs.createWriteStream(`${path}.smf`);
    const smf_compression = await zlib.deflateSync(fs.readFileSync(path), { level: 9 });
    await write.write(Buffer.from('D4FEADDE00204C05', 'hex'));
    await write.write(smf_compression);
    write.close();
}
