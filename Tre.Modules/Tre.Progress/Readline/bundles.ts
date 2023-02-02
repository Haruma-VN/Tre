"use strict";
import readlineSync from "readline-sync";
export default function (): string {
    const value = readlineSync.prompt({});
    return (value);
}