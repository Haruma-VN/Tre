"use strict";
import default_function from './Tre.Modules/Tre.Callback/default.js';
export namespace Tre.Public {
    export async function Main(): Promise<void> {
        await default_function().finally(() => { });
    };
}
Tre.Public.Main();