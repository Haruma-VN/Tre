"use strict";
import extname from "./extname/extname.js";
import basename from "./basename/basename.js";
import dirname from "./dirname/dirname.js";
import get_full_path from "./resolve/resolve.js";
export { extname, basename, dirname, get_full_path };
export default class {
    constructor(public dir: string) {}
    public getExtName() {
        return extname(this.dir);
    }
    public getBaseName() {
        return basename(this.dir);
    }
    public getDirName() {
        return dirname(this.dir);
    }
    public getFullPath() {
        return get_full_path(this.dir);
    }
}
