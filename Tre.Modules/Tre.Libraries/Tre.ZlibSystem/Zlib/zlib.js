"use strict";
import zlib_uncompress from './uncompress.js';
import zlib_compress from './compress.js';
export {
    zlib_compress,
    zlib_uncompress
}
export default class {
    constructor(dir) {
        this.dir = dir;
    };
    compress() {
        return zlib_compress(this.dir);
    };
    uncompress() {
        return zlib_uncompress(this.dir);
    };
};