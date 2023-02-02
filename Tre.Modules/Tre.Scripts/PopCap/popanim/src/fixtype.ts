"use strict";
interface Checker {
    outLevel: number;
}
export default function (type: number, checker: Checker) {
    let list: Number[] = [0x08, 0x18, 0x28, 0x38, 0x48, 0x68];
    let threshold = 3;
    while (!list.includes(type) && threshold > 0) {
        type--;
        checker.outLevel++;
        threshold--;
    }
    return type;
}