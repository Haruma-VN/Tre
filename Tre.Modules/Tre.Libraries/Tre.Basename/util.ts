"use strict";
import extname from './extname/extname.js';
import basename from './basename/basename.js';
import dirname from './dirname/dirname.js';
export {
    extname,
    basename,
    dirname,
}
export default class {
    constructor(public dir: string) {
    };
    getExtName() {
        return extname(this.dir);
    };
    getBaseName() {
        return basename(this.dir);
    };
    getDirName() {
        return dirname(this.dir);
    };
}