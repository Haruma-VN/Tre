"use strict";
import readlineSync from "readline-sync";
import localization from "../../Tre.Callback/localization.js";
import * as color from "../../Tre.Libraries/Tre.Color/color.js";
export default function (bundle: number[]): number {
    const args = new Array();
    const value = readlineSync.prompt({
        limit: bundle,
        limitMessage: color.fgred_string(`! ${localization("execution_error")}:` +` ${localization("not_a_valid_input_argument")}`),
    });
    return parseInt(value);
}