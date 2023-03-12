"use strict";
import { readline_normal } from "../../../Tre.Progress/Readline/util.js";
import { Argument } from "../../toolkit_question.js";
import { Console } from "../../console.js";
import * as color from "../../../Tre.Libraries/Tre.Color/color.js";
import fs from "node:fs";
import localization from "../../localization.js";
export default function FileChecker() {
    let dir = readline_normal();
    while (dir !== '') {
        if (dir === "./") {
            Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.execution_warning_log} \"./\" ${Argument.Tre.Packages.execute_error_not_valid_file_path}`));
            dir = readline_normal();
            continue;
        }
        if (dir[0] === "\"" && dir[dir.length - 1] === "\"") {
            dir = dir.slice(1, -1);
        }
        try {
            const stats = fs.statSync(dir);
            if (stats.isFile()) {
                return dir;
            }
            else {
                Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.execute_error_log} ${dir} `));
                dir = readline_normal();
            }
        }
        catch (err) {
            Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.execute_error_log} ${dir} ${localization("not_a_file")}`));
            dir = readline_normal();
        }
    }
    ;
    return dir;
}
