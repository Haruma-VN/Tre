"use strict";
import fs from 'node:fs';
import JSONC from 'jsonc-simple-parser';
import localization from "../../Tre.Callback/localization.js";

export interface json_config {
  json: {
    "strict_mode": boolean
  }
}

export default function (data: any): {} {
  const json_config: json_config = JSONC.parse(fs.readFileSync(process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json", { encoding: "utf-8", flag: "r" }));
  if (typeof data === 'object') {
    return data;
  }
  else {
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
      const jsonData = JSONC.parse(data);
      return jsonData;
    }
  }
}