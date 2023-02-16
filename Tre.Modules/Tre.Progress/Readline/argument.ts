"use strict";
import readlineSync from "readline-sync";
import localization from "../../Tre.Callback/localization.js";
export default function (): string {
    const value = readlineSync.prompt({
        limit: ['y', 'n'],
        limitMessage: '$<lastInput>' + localization("not_a_valid_boolean_input_argument"),
    });
    return value.toString();
}