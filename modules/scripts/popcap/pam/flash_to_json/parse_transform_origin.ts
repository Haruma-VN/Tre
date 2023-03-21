"use strict";
export default function (x_Matrix: any) {
    return [
        parseFloat(Number(x_Matrix.x ?? 0) as never),
        parseFloat(Number(x_Matrix.y ?? 0) as never)
    ]
}