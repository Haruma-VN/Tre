"use strict";
import fs from 'node:fs';
import localization from "../../callback/localization.js";

function parseJson(jsonStr: string, allow_trailing_commas: boolean = false): any {
  const jsonStrWithoutTrailingCommas = (allow_trailing_commas) ? jsonStr.replace(/(?<=(true|false|null|["\d}\]])\s*)\s*,(?=\s*[}\]])/g, '') : jsonStr;
  try {
    return JSON.parse(jsonStrWithoutTrailingCommas, (key, value) => {
      if (value && typeof value === 'object') {
        Object.entries(value).forEach(([k, v]) => {
          if (typeof v === 'string' && v.includes('@line')) {
            value[k] = v.replace(/@line/g, '');
            throw new Error(`${localization("syntax_error")} ${value[k]}`);
          }
        });
      }
      return value;
    });
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      if (error.message != null) {
        let position = (error.message as any).match(/\d+/g)[0];
        let lines = jsonStr.split('\n');
        let lineNumber = 1;
        let currentPosition = 0;
        for (let line of lines) {
          if (currentPosition + line.length >= position) {
            if (line.match(/,\s*[\]\}]/)) {
              throw new Error(localization("trailing_commas_at_line") + `${lineNumber}: ${line.trim()}`);
            }
            break;
          }
          currentPosition += line.length + 1;
          lineNumber++;
        }
        throw new Error(localization("syntax_error") + ` ${lineNumber}: ${lines[lineNumber - 1]}`);

      }
    } else if (error instanceof TypeError) {
      throw new Error(`${localization("type_error")}`);
    } else if (error instanceof URIError) {
      throw new Error(`${localization("invalid_char")}`);
    } else {
      throw new Error(error.message.toString());
    }
  }
}

export interface json_config {
  json: {
    "strict_mode": boolean
  }
}

export default function (data: any, force_trailing_commas_reader: boolean = false): {} {
  const json_config: json_config = parseJson(fs.readFileSync(process.cwd() + "/extension/settings/toolkit.json", { encoding: "utf-8", flag: "r" }), true);
  if (typeof data === 'object') {
    return data;
  }
  else {
    if (force_trailing_commas_reader) {
      const jsonData = parseJson(data, true);
      return jsonData;
    }
    if (json_config.json.strict_mode) {
      const jsonData = parseJson(data, false);
      return jsonData;
    }
    else {
      const jsonData = parseJson(data, true);
      return jsonData;
    }
  }
}