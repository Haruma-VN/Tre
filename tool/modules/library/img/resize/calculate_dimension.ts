"use strict";
export default function (orig: number | string, mod: number | string) {
    orig = (typeof orig === 'string') ? parseInt(orig) : orig;
    mod = (typeof mod === 'string') ? parseInt(mod) : mod;
    return ((orig) / (mod));
}