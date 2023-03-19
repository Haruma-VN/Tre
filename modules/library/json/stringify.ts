"use strict";
import { readjson } from '../fs/util.js';
import addTrailingCommas from './support/trailing_commas.js';
export interface stringify_data {
    json: {
        allow_trailing_commas?: boolean,
        space: string,
    }
}
export default function (data: {}): string {
    const config_json:stringify_data = readjson((process.cwd() + "/extension/settings/toolkit.json")) as stringify_data;
    let space:string = '\t';
    if("space" in config_json.json){
        space = config_json.json.space;
    }
    let output_data: string = JSON.stringify(data, null, space);
    if("allow_trailing_commas" in config_json.json){
        if(config_json.json.allow_trailing_commas){
            output_data = addTrailingCommas(output_data);
        }
    }
    return output_data;
}