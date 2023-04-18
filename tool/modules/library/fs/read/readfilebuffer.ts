"use strict";
import fs from "fs-extra";
import localization from "../../../callback/localization.js";

export default function (buffer: string): any {
    try {
        return fs.readFileSync(buffer);
    } catch (error: any) {
        throw new Error(
            `${localization(
                "cannot_read"
            )} ${buffer}. ${buffer}: ${error.message.toString()}`
        );
    }
}
