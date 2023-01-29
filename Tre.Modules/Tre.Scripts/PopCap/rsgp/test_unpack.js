"use strict";
import { readfilebuffer, outfile, writejson, makefolder } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import rsgp_unpack from './unpack_rsgp.js';
import exit from '../../../Tre.Progress/Timer/Exit.js';
const before = Date.now();
const file_input = process.argv[2];
const folder_output = file_input + '.dir/';
const rsgp_data = readfilebuffer(file_input);
const rsgp_array = rsgp_unpack(rsgp_data);
await rsgp_array.forEach(data => {
    outfile(folder_output + 'Res/' + data.path, data.buffer);
})
await writejson(folder_output + 'TreRSGPInfo.json', rsgp_array.Treinfo);
const now = Date.now();
const time = (now - before) / 1000;
exit(time);
// node main.js PlantDoubleSamara_1536.rsgp