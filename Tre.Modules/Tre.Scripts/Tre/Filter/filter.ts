"use strict";
import { parse } from '../../../Tre.Libraries/Tre.JSONSystem/util.js';
interface res_data {
    slot?: number,
    cols?: number,
    id: string,
    path: [],
    ax?: number,
    ay?: number,
    ah?: number,
    aw?: number,
    x?: number,
    y?: number,
}
export default function (data:res_data[]): res_data[] {
    (data as any) = (typeof data == "string") ? parse(data) : data;
    const Res_Duplicate: res_data[] = new Array();
    for (let i: number = 0; i < data.length; ++i) {
        if(data[i].slot != undefined){
            for (let j: number = 0; j < data.length; j++) {
                if(data[j].slot != undefined){
                    if (data[i]?.path[(data[i]?.path.length - 1)] === data[(data[j]?.path.length - 1)].path && data[i]?.id != data[j]?.id){
                        Res_Duplicate.push(data[i], data[j]);
                    }
                }
            }
        }
    }
    return Res_Duplicate;
}