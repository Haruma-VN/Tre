"use strict";
import prompt from "./prompt.js";
export default function (): string {
    const value = prompt("\x1b[36m◉ ", undefined);
    return value.toString();
}
