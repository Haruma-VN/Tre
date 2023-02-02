"use strict";
import readlineSync from "readline-sync";
export default function () {
    const value = readlineSync.prompt({});
    return (value);
}
