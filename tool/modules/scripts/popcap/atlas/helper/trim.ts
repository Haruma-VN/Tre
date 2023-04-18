"use strict";

export interface return_value {
    width: number;
    height: number;
}

function getTrim(executor_in: any[]): return_value {
    const { maxWidth, maxHeight } = executor_in.reduce(
        (acc, rect) => ({
            maxWidth: Math.max(acc.maxWidth, rect.x + rect.width),
            maxHeight: Math.max(acc.maxHeight, rect.y + rect.height),
        }),
        { maxWidth: 0, maxHeight: 0 }
    );
    return {
        width: maxWidth,
        height: maxHeight,
    };
}

export default getTrim;
