"use strict";
import { TreErrorMessage } from "../../../Tre.Debug/Tre.ErrorSystem.js";
import localization from "../../localization.js";
export default function (list_ban_function: string[], code: string): boolean {
    const lines: string[] = code.split("\n");
    for (const bannedWord of list_ban_function) {
        const regex: RegExp = new RegExp(`\\b${bannedWord}\\.\\w+\\(`, "g");
        for (const line of lines) {
            let match;
            while ((match = regex.exec(line))) {
                TreErrorMessage({ error: `${localization("js_shell_execute_fail")}`, reason: `${bannedWord} ${localization("is_not_defined")}` }, `:${bannedWord} ${localization("is_not_defined")}`);
                return false;
            }
        }
    }
    return true;
}