"use strict";
import readlineSync from "readline-sync";
export default function (bundle: number[]): number {
    const args = new Array();
    const value = readlineSync.prompt({
        limit: bundle,
        limitMessage: `Invalid execution argument, please select the input the argument again.`,
    });
    return parseInt(value);
}