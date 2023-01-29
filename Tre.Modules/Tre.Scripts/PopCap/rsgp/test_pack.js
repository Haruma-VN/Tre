"use strict";
import fs from 'fs-extra';
import rsgp_pack from './rsgp_pack.js';
import path from 'path';
import exit from '../../../Tre.Progress/Timer/Exit.js';
const folder_input = process.argv[2];
const dirname = path.dirname(folder_input);
const name = path.parse(folder_input).name;
const file_output = dirname + '/' + name;
const before = Date.now();
let rsgp_file = await rsgp_pack(folder_input);
await fs.writeFileSync(file_output, rsgp_file);
const now = Date.now();
const time = (now - before) / 1000;
exit(time)