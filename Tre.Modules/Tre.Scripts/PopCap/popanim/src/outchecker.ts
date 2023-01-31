"use strict";
export default class OutChecker {
    constructor(public lastFragmentId: number = 0, public outLevel = 0) { };
    public check(fragmentID: number) {
        if (fragmentID < this.lastFragmentId) {
            this.outLevel++;
        };
        this.lastFragmentId = fragmentID;
        return this.outLevel;
    };
}