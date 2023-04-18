"use strict";
import localization from "../localization.js";
function exit_program(): void {
    console.log(
        "\x1b[32m◉ " +
            localization("execution_finish") +
            ": " +
            localization("press_any_key_to_exit") +
            "\x1b[0m"
    );
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.removeAllListeners("exit");
    process.stdin.on("data", process.exit.bind(process, 0));
}
export default exit_program;
