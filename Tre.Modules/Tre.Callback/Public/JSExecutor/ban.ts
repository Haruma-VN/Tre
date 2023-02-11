"use strict";
import { TreErrorMessage } from "../../../Tre.Debug/Tre.ErrorSystem.js";
export default function (list_ban_function: (string)[], js_shell_string: string): boolean {
    for (let ban_word of list_ban_function) {
        if (js_shell_string.indexOf(ban_word) != -1) {
            TreErrorMessage({ error: "Failed Execute JavaScript Void", reason: `${ban_word} is not defined` }, `${ban_word} is not defined`);
            return false
        }
    }
    return true
}