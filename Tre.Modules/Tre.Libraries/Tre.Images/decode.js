"use strict";
// import decode_argb8888 from './Decode/argb8888.js';
// import encode_argb8888 from './Encode/argb8888.js';
// decode_argb8888(process.argv[2], 6024, 4096)
// decode_rgba8888(process.argv[2], 4096, 8192)
// node decode.js C:/Users/PC/Desktop/Tre/Tre.Modules/Tre.Libraries/Tre.Images/WORLDMAP_TWISTER_1536_00.PTX

import decode_etc1 from './Decode/etc1alpha.js';
await decode_etc1(process.argv[2], 4096, 4096);
// console.log(a)