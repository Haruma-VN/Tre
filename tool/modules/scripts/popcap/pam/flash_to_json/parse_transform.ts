"use strict";
export default function (x_Matrix: any) {
    return [
        parseFloat(Number(x_Matrix.a ?? 1) as never),
        parseFloat(Number(x_Matrix.b ?? 0) as never),
        parseFloat(Number(x_Matrix.c ?? 0) as never),
        parseFloat(Number(x_Matrix.d ?? 1) as never),
        parseFloat(Number(x_Matrix.tx ?? 0) as never),
        parseFloat(Number(x_Matrix.ty ?? 0) as never)
    ]
}