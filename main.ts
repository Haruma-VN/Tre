"use strict";
import default_function from './Tre.Modules/Tre.Callback/default.js';
async function Main(): Promise<void> {
    await default_function().finally(() => { });
};
Main();