"use strict";
Array.prototype.TreChecker = (callback) => {
    for (let i in this) {
        if (this.hasOwnProperty(i)) {
            if (callback(this[i], i, this)) {
                return true;
            }
        }
    }
    return false;
};