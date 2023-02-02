"use strict";
import readlineSync from "readline-sync";
export default function () {
    const value = readlineSync.prompt({
        limit: ['y', 'n'],
        limitMessage: '$<lastInput> is not a valid boolean answer. It should be "y" or "n"',
    });
    return value;
}