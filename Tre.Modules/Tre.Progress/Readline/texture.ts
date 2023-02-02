"use strict";
import readlineSync from "readline-sync";
export default function (): number {
    const value = readlineSync.prompt({
        limit: [1536, 768, 384, 640, 1200],
        limitMessage: '$<lastInput> is not a valid texture input. Available: "1536", "768", "384", "640", "1200"',
    });
    return parseInt(value);
}