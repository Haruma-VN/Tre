"use strict";
export default function () {
    return [
        {
            parent: "util.js",
            modules: ["argument.js", "number.js", "char.js"],
            function: [
                "readline_argument",
                "readline_char",
                "readline_integer",
            ]
        },
        {
            children: "argument.js",
            function: "readline_argument"
        },
        {
            children: "number.js",
            function: "readline_integer"
        },
        {
            children: "char.js",
            function: "readline_integer"
        }
    ]
}
