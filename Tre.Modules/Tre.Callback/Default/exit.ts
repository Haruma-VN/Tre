"use strict";
import localization from "../localization.js";
function exit_program(): void {
    console.log('\x1b[32m' + localization("press_any_key_to_exit") + '\x1b[0m');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
}
export default exit_program;