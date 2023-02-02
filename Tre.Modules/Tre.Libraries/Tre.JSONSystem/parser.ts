"use strict";
import JSONC from 'jsonc-simple-parser';
export default function (data: string | {}): {} {
    if (typeof data === 'object') {
        return data;
    }
    else {
        return JSONC.parse(data);
    }
}