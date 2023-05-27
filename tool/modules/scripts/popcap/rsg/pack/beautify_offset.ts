"use strict";
export default function (length: number): number {
    if (length % 4096 === 0) {
        return 0;
    } else {
        return 4096 - (length % 4096);
    }
}
