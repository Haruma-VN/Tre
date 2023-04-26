"use strict";
export default function (transform: Array<number>): Array<bigint> {
    let result = new Array();
    if (transform.length == 2) {
        result = [1, 0, 0, 1, transform[0], transform[1]];
    } else if (transform.length == 6) {
        result = transform.slice();
    } else if (transform.length == 3) {
        result = [
            Math.cos(transform[0]),
            Math.sin(transform[0]),
            -Math.sin(transform[0]),
            Math.cos(transform[0]),
            transform[1],
            transform[2],
        ];
    }
    return result;
}
