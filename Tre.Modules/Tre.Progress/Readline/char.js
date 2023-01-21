"use strict";
// BASED ON https://www.npmjs.com/package/readline-sync
import readlineSync from "readline-sync";
export default function () {
    const value = readlineSync.prompt({
        limit: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'],
        limitMessage: '$<lastInput> is not a char. It should be /\\d/g',
    });
    return value;
}