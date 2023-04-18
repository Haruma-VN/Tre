"use strict";
import gzip_uncompress from "./uncompress.js";
import gzip_compress from "./compress.js";
export { gzip_compress, gzip_uncompress };
export default class {
    constructor(public dir: string) {}
    compress() {
        return gzip_compress(this.dir);
    }
    uncompress() {
        return gzip_uncompress(this.dir);
    }
}
