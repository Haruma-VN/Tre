"use strict";
import localization from "./modules/callback/localization.js";
import default_function from "./modules/callback/default.js";
import System from "./modules/callback/default/exception.js";
import { prompt } from "./modules/readline/prompt/util.js";
import { Console } from "./modules/callback/console.js";

export namespace Tre.Public {
    export async function Main(): Promise<void> {
        const exception_error: boolean = System.Tre.Checker.execute();

        if (!exception_error) {
            Console.WriteLine(
                "\x1b[32m◉ " +
                    localization("execution_finish") +
                    ": " +
                    localization("press_any_key_to_exit") +
                    "\x1b[0m"
            );
            await prompt("", "");
            return;
        }
        await default_function();
    }
}
Tre.Public.Main();
