"use strict";
export default function mix_transform(
    source: number[],
    change: number[]
): [number, number, number, number, number, number] {
    return [
        change[0] * source[0] + change[2] * source[1],
        change[1] * source[0] + change[3] * source[1],
        change[0] * source[2] + change[2] * source[3],
        change[1] * source[2] + change[3] * source[3],
        change[0] * source[4] + change[2] * source[5] + change[4],
        change[1] * source[4] + change[3] * source[5] + change[5],
    ];
}
