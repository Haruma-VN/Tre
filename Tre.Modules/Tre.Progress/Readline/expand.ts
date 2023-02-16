"use strict";
import readlineSync from "readline-sync";
import localization from "../../Tre.Callback/localization.js";
export default function (bundle: number[]): number {
    const args = new Array();
    const value = readlineSync.prompt({
        limit: bundle,
        limitMessage: `${localization("not_a_valid_input_argument")}`,
    });
    return parseInt(value);
}