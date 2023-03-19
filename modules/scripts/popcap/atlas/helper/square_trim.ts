"use strict";

export interface return_value {
    width: number,
    height: number,
}

function create_2n_square(num: number): number {
    const power = Math.ceil(Math.log2(num));
    return Math.pow(2, power);
}

function squareTrim(executor_in: any[]): return_value {
    const { maxWidth, maxHeight } = executor_in.reduce(
        (acc, rect) => ({
            maxWidth: Math.max(acc.maxWidth, rect.x + rect.width),
            maxHeight: Math.max(acc.maxHeight, rect.y + rect.height),
        }),
        { maxWidth: 0, maxHeight: 0 }
    );
    return {
        width: create_2n_square(maxWidth),
        height: create_2n_square(maxHeight),
    }
}

export default squareTrim;