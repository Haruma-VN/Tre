"use strict";
import cat from "./cat.js";
import { readline_size } from "../../Tre.Progress/Readline/util.js";
import pack_atlas from '../../Tre.Progress/Timer/Exit.js';
const width = await readline_size();
const height = await readline_size();
const before = Date.now();
await cat(process.argv[2], parseInt(width), parseInt(height));
const now = Date.now();
const time = (now - before) / 1000;
pack_atlas(time)
// node main.js WorldMap_Kongfu_1536.spg