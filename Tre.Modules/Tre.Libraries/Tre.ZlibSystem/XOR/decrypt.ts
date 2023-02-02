"use strict";
export default function (key: string, string: string): string {
    let keyBuf = Buffer.from(key, 'hex')
    let stringBuf = Buffer.from(string, 'hex')
    let outBuf = Buffer.alloc(stringBuf.length)
    for (let n = 0; n < stringBuf.length; n++)
        outBuf[n] = stringBuf[n] ^ keyBuf[n % keyBuf.length]
    return (outBuf.toString());
}