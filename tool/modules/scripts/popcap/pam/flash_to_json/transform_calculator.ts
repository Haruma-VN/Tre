"use strict";
export default function (transform: any) {
    if (transform[0] === transform[3] && transform[1] === -transform[2]) {
        if (transform[0] === 1.0 && transform[1] === 0.0) {
            return [transform[4], transform[5]];
        }
        const acos_value = Math.acos(transform[0]);
        const asin_value = Math.asin(transform[1]);
        if (Math.abs(Math.abs(acos_value) - Math.abs(asin_value)) <= 1e-2) {
            return [
                Number(parseFloat(asin_value as any).toFixed(6)),
                transform[4],
                transform[5],
            ];
        }
    }
    return transform.slice();
}
