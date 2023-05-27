"use strict";
import localization from "../../callback/localization.js";
import { args } from "../../implement/arguments.js";
import { JSONParseSyntaxError, JSONParseTrailingCommasError, JSONParseTypeError } from "../../implement/error.js";
import fs_js from "../fs/implement.js";

function parseJson(jsonStr: string, default_file_path: string, allow_trailing_commas: boolean = false): any {
    const jsonStrWithoutTrailingCommas = allow_trailing_commas
        ? jsonStr.replace(/(?<=(true|false|null|["\d}\]])\s*)\s*,(?=\s*[}\]])/g, "")
        : jsonStr;
    try {
        return JSON.parse(jsonStrWithoutTrailingCommas, (key, value) => {
            if (value && typeof value === "object") {
                Object.entries(value).forEach(([k, v]) => {
                    if (typeof v === "string" && v.includes("@line")) {
                        value[k] = v.replace(/@line/g, "");
                        throw new JSONParseSyntaxError(
                            `${localization("syntax_error")} ${value[k]}`,
                            default_file_path,
                        );
                    }
                });
            }
            return value;
        });
    } catch (error: any) {
        if (error instanceof SyntaxError) {
            if (error.message !== null) {
                let position = (error.message as any).match(/\d+/g)[0];
                let lines = jsonStr.split("\n");
                let lineNumber = 1;
                let currentPosition = 0;
                for (let line of lines) {
                    if (currentPosition + line.length >= position) {
                        if (line.match(/,\s*[\]\}]/)) {
                            throw new JSONParseTrailingCommasError(
                                localization("trailing_commas_at_line") + `${lineNumber}: ${line.trim()}`,
                                default_file_path,
                            );
                        }
                        break;
                    }
                    currentPosition += line.length + 1;
                    lineNumber++;
                }
                throw new JSONParseSyntaxError(
                    localization("syntax_error") + ` ${lineNumber}: ${lines[lineNumber - 1]}`,
                    default_file_path,
                );
            }
        } else if (error instanceof TypeError) {
            throw new JSONParseTypeError(`${localization("type_error")}`, default_file_path);
        } else if (error instanceof URIError) {
            throw new JSONParseTypeError(`${localization("invalid_char")}`, default_file_path);
        } else {
            throw new Error(error.message.toString());
        }
    }
}

export interface json_config {
    json: {
        strict_mode: boolean;
    };
}

export default function (
    data: any,
    json_default_filepath: string,
    force_trailing_commas_reader: boolean = false,
): {} & any {
    const config_json: string = fs_js.dirname(args.main_js as any) + "/extension/settings/toolkit.json";
    const json_config: json_config = parseJson(fs_js.read_file(config_json, "utf8"), config_json, true);
    if (typeof data === "object") {
        return data;
    } else {
        if (force_trailing_commas_reader) {
            const jsonData = parseJson(data, json_default_filepath, true);
            return jsonData;
        }
        if (json_config.json.strict_mode) {
            const jsonData = parseJson(data, json_default_filepath, false);
            return jsonData;
        } else {
            const jsonData = parseJson(data, json_default_filepath, true);
            return jsonData;
        }
    }
}
