"use strict";
import fs from 'node:fs';
import localization from '../../../Tre.Callback/localization.js';

export default function (directories: string, data: string | Buffer): void {
    try {
        fs.writeFileSync(directories, data, { encoding: "utf-8", flag: "w" });
    } catch (error: any) {
        console.error(`${localization("cannot_write")} ${directories}. ${error.message.toString()}`);
    }
}
