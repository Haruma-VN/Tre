"use strict";
import fs from 'node:fs';
import localization from '../../../Tre.Callback/localization.js';
export default function (dir: string = process.argv[2]): string[] {
    try {
        const arr: string[] = new Array();
        fs.readdirSync(dir).forEach(file => {
            arr.push(file);
        });
        return arr;
    } catch (error: any) {
        throw new Error(`${localization("cannot_read")} ${dir}. ${(error.message as String).toString()}`);
    }
}