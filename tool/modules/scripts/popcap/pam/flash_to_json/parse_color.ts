"use strict";
export default function (x_Matrix: any) {
    function parse_color_compute(multiplier_s: string, offset_s: number) {
        return (
            Math.max(
                0,
                Math.min(
                    255,
                    parseFloat(
                        (Number(multiplier_s ?? 1) * 255 +
                            parseFloat(Number(offset_s ?? 0) as any)) as any
                    )
                )
            ) / 255
        );
    }
    return [
        parse_color_compute(x_Matrix.redMultiplier, x_Matrix.redOffset),
        parse_color_compute(x_Matrix.greenMultiplier, x_Matrix.greenOffset),
        parse_color_compute(x_Matrix.blueMultiplier, x_Matrix.blueOffset),
        parse_color_compute(x_Matrix.alphaMultiplier, x_Matrix.alphaOffset),
    ];
}
