"use strict";
export default function (string: string, key: string): string {
    let c = '';
    while (key.length < string.length) {
        key += key;
    };
    for (let i = 0; i < string.length; i++) {
        let value1 = string[i].charCodeAt(0);
        let value2 = key[i].charCodeAt(0);

        let xorValue = value1 ^ value2;

        let xorValueAsHexString = xorValue.toString("16" as any);

        if (xorValueAsHexString.length < 2) {
            xorValueAsHexString = "0" + xorValueAsHexString;
        }

        c += xorValueAsHexString;
    }
    return c;
}