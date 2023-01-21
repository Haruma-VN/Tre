"use strict";
import encode from './encode.js';
import decode from './decode.js';
export {
    decode,
    encode,
};
export default class {
    constructor(dir) {
        this.dir = dir;
    };
    Base64Encode() {
        encode(dir);
    };
    Base64Decode() {
        decode(dir);
    };
}