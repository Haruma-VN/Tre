"use strict";
export default function (orig, mod) {
    return parseFloat(parseInt(orig) / parseInt(mod));
}