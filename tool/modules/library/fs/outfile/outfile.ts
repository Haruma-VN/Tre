"use strict";
import fs from "fs-extra";
import localization from "../../../callback/localization.js";

export default function (directories: string, data: any) {
    try {
        fs.outputFileSync(directories, data);
    } catch (error: any) {
        throw new Error(
            `${localization(
                "cannot_write"
            )} ${directories}. ${error.message.toString()}`
        );
    }
}
