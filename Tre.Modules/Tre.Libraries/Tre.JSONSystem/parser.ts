"use strict";
import fs from 'node:fs';
import { TreErrorMessage } from '../../Tre.Debug/Tre.ErrorSystem.js';
export interface json_config {
  json: {
    "strict_mode": boolean
  }
}
import JSONC from 'jsonc-simple-parser';
export default function (data: string | {}): {} {
  const json_config: json_config = JSONC.parse(fs.readFileSync("C:/Tre.Vietnam/Tre.Extension/Tre.Settings/toolkit.json", { encoding: "utf-8", flag: "r" }));
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
          let position = error.message.match(/\d+/g)[0];
          let lines = data.split('\n');
          let lineNumber = 1;
          let currentPosition = 0;
          for (let line of lines) {
            if (currentPosition + line.length >= position) {
              if (line.match(/,\s*[\]\}]/)) {
                TreErrorMessage({ system: `Trailing comma at line ${lineNumber}: ${line.trim()}` }, `Trailing comma at line ${lineNumber}: ${line.trim()}`);
              }
              break;
            }
            currentPosition += line.length + 1;
            lineNumber++;
          }
          TreErrorMessage({ system: error.message.toString() }, `SyntaxError: Unexpected token } in JSON at line ${lineNumber}: ${lines[lineNumber - 1]}`);
        } else if (error instanceof TypeError) {
          TreErrorMessage({ system: `TypeError: The JSON data is not a string` }, `TypeError: The JSON data is not a string`);
        } else if (error instanceof URIError) {
          TreErrorMessage({ system: `URIError: The string contains illegal characters` }, `URIError: The string contains illegal characters`);
        } else {
          TreErrorMessage({ system: `Error: ${error.message}` }, `Error: ${error.message}`);
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