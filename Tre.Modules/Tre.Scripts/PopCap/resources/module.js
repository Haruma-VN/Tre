"use strict";
import { res_pack, res_split } from './util.js';
import { ExitExecution, DefaultExit } from '../../../Tre.Progress/util.js';
import { readline_integer } from '../../../Tre.Progress/util.js';
export function SplitRes() {
    ExitExecution(res_split);
}
export async function ConcatRes() {
    const mode = await readline_integer(1, 2);
    const encode = await readline_integer(1, 2);
    const before = Date.now();
    let a = await res_pack(process.argv[2], mode, encode);
    while (a != 0) {
        a = await res_pack(process.argv[2], mode, encode);
    }
    const now = Date.now();
    const time = (now - before) / 1000;
    DefaultExit(time);
}