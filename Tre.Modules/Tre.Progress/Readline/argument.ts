"use strict";
import readlineSync from "readline-sync";
import localization from "../../Tre.Callback/localization.js";
import * as color from "../../Tre.Libraries/Tre.Color/color.js";
export default function (): string {
    const value = readlineSync.prompt({
        limit: ['y', 'n'],
        limitMessage: color.fgred_string('$<lastInput>' + localization("not_a_valid_boolean_input_argument")),
    });
    return value.toString();
}