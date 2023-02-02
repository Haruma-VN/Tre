"use strict";
import md5 from 'crypto-js/md5.js';
export default function (message: string): string {
    return md5(message).toString();
}