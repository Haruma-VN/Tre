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
            console.log('\x1b[32m◉ Execution finish: Press any key to continue...\x1b[0m');
            await prompt('', '');
            return;
        }
        let hasError: boolean = false;
        process.on('exit', function (code) {
            if (hasError || code !== 0) {
                console.log('\x1b[32m◉ Execution finish: Press any key to continue...\x1b[0m');
                prompt('', '');
            }
        });

        try {
            await default_function();
        } catch (error: any) {
            console.log(fgred_string(`◉ ${localization("execution_error")}: ${error.message}`));
            hasError = true;
        }
    };
}
Tre.Public.Main();