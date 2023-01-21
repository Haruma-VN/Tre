"use strict";
Array.prototype.TreFilter = (callback) => {
    const output = new Array();
    for (let i in this) {
        if (this.hasOwnProperty(i)) {
            let result = callback(this[i], i, this)
            if (result) {
                output.push(this[i])
            }
        }
    }
    return output;
}