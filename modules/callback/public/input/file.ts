"use strict";
import { readline_normal } from "../../../readline/prompt/util.js";
import { Argument } from "../../toolkit_question.js";
import { Console } from "../../console.js";
import * as color from "../../../library/color/color.js";
import fs from "node:fs";
import localization from "../../localization.js";
import fs_js from "../../../library/fs/implement.js";

export default async function FileChecker(extension: string = "*.*"): Promise<string> {
    const is_windows_explorer_open: boolean = fs_js.create_toolkit_view('open_windows_explorer') as boolean;
    let dir: string = (is_windows_explorer_open) ? await fs_js.openWindowsExplorer("file", extension) : readline_normal();
    while (dir !== '') {
        if (dir === "./") {
            Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.execution_warning_log} \"./\" ${Argument.Tre.Packages.execute_error_not_valid_file_path}`));
            dir = (is_windows_explorer_open) ? await fs_js.openWindowsExplorer("file", extension) : readline_normal();
            continue;
        }
        if (dir[0] === "\"" && dir[dir.length - 1] === "\"") {
            dir = dir.slice(1, -1);
        }
        try {
            const stats = fs.statSync(dir);
            if (stats.isFile()) {
                return dir;
            } else {
                Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.execute_error_log} ${dir} `));
                dir = (is_windows_explorer_open) ? await fs_js.openWindowsExplorer("file", extension) : readline_normal();
            }
        } catch (err) {
            Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.execute_error_log} ${dir} ${localization("not_a_file")}`));
            dir = (is_windows_explorer_open) ? await fs_js.openWindowsExplorer("file", extension) : readline_normal();
        }
    };
    return dir;
}