"use strict";
export default class OutChecker {
    constructor(lastFragmentId = 0, outLevel = 0) {
        this.lastFragmentId = lastFragmentId;
        this.outLevel = outLevel;
    }
    ;
    check(fragmentID) {
        if (fragmentID < this.lastFragmentId) {
            this.outLevel++;
        }
        ;
        this.lastFragmentId = fragmentID;
        return this.outLevel;
    }
    ;
}
