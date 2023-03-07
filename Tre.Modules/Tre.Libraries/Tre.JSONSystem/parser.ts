"use strict";
import fs from 'node:fs';
import localization from "../../Tre.Callback/localization.js";
function parseJson(jsonStr: string) {
  const trailingCommaRegex = /,(?=\s*[\]}])/g;
  const jsonStrWithoutTrailingCommas = jsonStr.replace(trailingCommaRegex, '');
  try {
    return JSON.parse(jsonStrWithoutTrailingCommas, (key, value) => {
      if (value && typeof value === 'object') {
        Object.entries(value).forEach(([k, v]) => {
          if (typeof v === 'string' && v.includes('@line')) {
            value[k] = v.replace(/@line/g, '');
            throw new Error(`Found @line directive in ${k} on line ${value[k]}`);
          }
        });
      }
      return value;
    });
  } catch (e: any) {
    if (e instanceof SyntaxError) {
      const match = (e.message as any).match(/at position (\d+)/);
      if (match && match[1]) {
        const position = parseInt(match[1]);
        const lines = jsonStrWithoutTrailingCommas.split('\n');
        let lineNumber = 1;
        let lineStart = 0;
        for (const line of lines) {
          if (position < lineStart + line.length) {
            const lineContent = line.trim();
            const columnNumber = position - lineStart;
            const arrow = ' '.repeat(columnNumber) + '^';
            throw new Error(`${e.message}\n${lineNumber}:${columnNumber}: ${lineContent}\n${arrow}`);
          }
          lineStart += line.length + 1;
          lineNumber++;
        }
      }
    }
    throw e;
  }
}

export interface json_config {
  json: {
    "strict_mode": boolean
  }
}

export default function (data: any, force_trailing_commas_reader: boolean = false): {} {
  const json_config: json_config = parseJson(fs.readFileSync(process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json", { encoding: "utf-8", flag: "r" }));
  if (typeof data === 'object') {
    return data;
  }
  else {
    if (force_trailing_commas_reader) {
      const jsonData = parseJson(data);
      return jsonData;
    }
    if (json_config.json.strict_mode === true) {
      try {
        const jsonData = JSON.parse(data);
        return jsonData;
      } catch (error: any) {
        if (error instanceof SyntaxError) {
          if (error.message != null) {
            let position = (error.message as any).match(/\d+/g)[0];
            let lines = data.split('\n');
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
        return {};
      }
    }
    else {
      const jsonData = parseJson(data);
      return jsonData;
    }
  }
}