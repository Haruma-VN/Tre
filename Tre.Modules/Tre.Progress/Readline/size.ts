"use strict";
import readlineSync from "readline-sync";
export default function (): number {
    const value = readlineSync.prompt({
        limit: [16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32],
        limitMessage: '$<lastInput> is not a valid texture input. Available: "16384", "8192", "4096", "2048", "1024", "512", "256", "128", "64", "32"',
    });
    return parseInt(value);
}