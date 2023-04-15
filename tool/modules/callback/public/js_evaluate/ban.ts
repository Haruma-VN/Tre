"use strict";
import localization from "../../localization.js";
export default function (list_ban_function: string[], code: string): boolean {
    const lines: string[] = code.split("\n");
    for (const bannedWord of list_ban_function) {
        const regex: RegExp = new RegExp(`\\b${bannedWord}\\.\\w+\\(`, "g");
        for (const line of lines) {
            let match;
            while ((match = regex.exec(line))) {
                throw new Error(`${bannedWord} ${localization("is_not_defined")}`);
            }
        }
    }
    return true;
}