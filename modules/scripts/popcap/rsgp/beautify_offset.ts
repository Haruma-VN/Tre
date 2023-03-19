"use strict";
export default function (Offset: number) {
    if (Offset % 4096 == 0) {
        return 0;
    }
    else {
        return (4096 - (Offset % 4096));
    }
};