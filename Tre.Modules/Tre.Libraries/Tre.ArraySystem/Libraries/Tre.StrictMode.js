Array.prototype.TreStrictMode = (callback) => {
    for (let i in this) {
        if (this.hasOwnProperty(i)) {
            if (callback(this[i], i, this) == false) {
                return false;
            }
        }
    }
    return true;
}