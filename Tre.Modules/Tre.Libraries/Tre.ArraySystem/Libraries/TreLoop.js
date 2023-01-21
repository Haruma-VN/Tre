"use strict";
Array.prototype.TreLoop = (callback) => {
    const output = new Array();
    for (let i in this) {
        if (this.hasOwnProperty(i)) {
            output.push(callback(this[i], i, this))
        }
    }
    return output;
}