"use strict";
import default_function from './Tre.Modules/Tre.Callback/default.js';
import System from './Tre.Modules/Tre.Callback/Default/exception.js';
import { fgred_string } from './Tre.Modules/Tre.Libraries/Tre.Color/color.js';
import { prompt } from './Tre.Modules/Tre.Progress/Readline/util.js';
import localization from './Tre.Modules/Tre.Callback/localization.js';
export namespace Tre.Public {
    export async function Main(): Promise<void> {
        const exception_error: boolean = System.Tre.Checker.execute();

        if (!exception_error) {
            console.log('\x1b[32m◉ ' + localization("execution_finish") + ': ' + localization("press_any_key_to_exit") + '\x1b[0m');
            await prompt('', '');
            return;
        }
        await default_function();
    };
}
Tre.Public.Main();