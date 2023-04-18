"use strict";
import encode from "./encode.js";
import decode from "./decode.js";
export { decode, encode };
export default class {
    constructor(public dir: string) {}
    Base64Encode() {
        encode(this.dir);
    }
    Base64Decode() {
        decode(this.dir);
    }
}
