"use strict";
// import encode_argb from './Encode/argb8888.js';
// encode_argb(process.argv[2])

// node encode.js UI_UNIVERSE_1536_00.png

import encode_pvrtc from './Encode/pvrtc_4bpp_rgba.js';
encode_pvrtc(process.argv[2], 0)

// node encode.js C:/Users/PC/Desktop/Tre/Tre.Modules/Tre.Libraries/Tre.Images/WORLDMAP_TWISTER_1536_00.png