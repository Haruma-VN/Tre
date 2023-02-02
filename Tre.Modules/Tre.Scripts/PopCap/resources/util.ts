"use strict";
import res_pack from './cat.js';
import res_split from './split.js';
export {
    res_pack,
    res_split,
}
export default class {
    constructor(public dir: string, public encode: number, public mode: number) {
    }
    ResPack() {
        res_pack(this.dir, this.mode, this.encode);
    }
    ResSplit() {
        res_split(this.dir);
    }
}