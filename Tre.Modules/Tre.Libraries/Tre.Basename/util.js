"use strict";
import extname from './extname/extname.js';
import basename from './basename/basename.js';
export{
    extname,
    basename,
}
export default class{
    constructor(dir){
        this.dir = dir;
    };
    getExtName(){
        return extname(this.dir);
    };
    getBaseName(){
        return basename(this.dir);
    };
}