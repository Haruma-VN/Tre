"use strict";
import JSONC from 'jsonc-simple-parser';
export default function (data: {}): string {
    return JSONC.stringify(data, null, '\t');
}