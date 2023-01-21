import trailing_commas from './trailing.js';
import fs from 'node:fs';
fs.writeFileSync('./test.json', (trailing_commas(fs.readFileSync(process.argv[2]))).toString())