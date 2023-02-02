"use strict";
export default function (): {}[] {
    return [
        {
            function: ["FunctionRL", "FunctionX"],
            include: "timer.js",
            callback: true,
            readline: true,
        },
        {
            function: "readline",
            include: "readline.js",
            callback: true,
            readline: true,
            synchronous: true, 
        },
        {
            function: "append",
            include: "append.js",
            callback: false,
            terminate: true,
        }
    ]
}