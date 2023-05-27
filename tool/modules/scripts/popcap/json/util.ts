"use strict";
import { Console } from "../../../callback/console.js";
import localization from "../../../callback/localization.js";
import * as color from "../../../library/color/color.js";
import rton2json from "../rton/rton2json.js";
import fs_js from "../../../library/fs/implement.js";
import { parse } from "../../../library/json/util.js";
import json2rton from "../rton/json2rton.js";
import { WrongFile } from "../../../implement/error.js";

namespace PopCapPackages.Json {
    export interface PopCapCommonJSON {
        version?: number;
        objects?: PopCapCommonJSONObject[];
    }

    export type PopCapCommonJSONObject = {
        objclass?: string;
        aliases: string[];
        objdata?: {
            TypeName?: string;
        };
    };

    export function ReadJSONObject(popcap_common_json_file_location: string): PopCapCommonJSON {
        switch (fs_js.parse_fs(popcap_common_json_file_location).ext.toString().toLowerCase()) {
            case ".json":
                return fs_js.read_json(popcap_common_json_file_location);
            case ".rton":
                return parse(
                    rton2json(
                        fs_js.read_file(popcap_common_json_file_location, "buffer"),
                        false,
                        undefined,
                        popcap_common_json_file_location,
                    ),
                    popcap_common_json_file_location,
                );
            default:
                throw new WrongFile(
                    `${localization("is_a_directory_not_a_valid_json_file")}`,
                    `${fs_js.get_full_path(popcap_common_json_file_location)}`,
                ) as never;
        }
    }

    export function Split(popcap_common_json_file_location: string, popcap_split_method_selector: number): void {
        if (!fs_js.is_file(popcap_common_json_file_location)) {
            throw new WrongFile(
                `${localization("is_a_directory_not_a_valid_json_file")}`,
                `${fs_js.get_full_path(popcap_common_json_file_location)}`,
            );
        }
        const popcap_common_json = ReadJSONObject(popcap_common_json_file_location);
        const directory_contain_popcap_splitable_data: string = `${fs_js.dirname(popcap_common_json_file_location)}/${
            fs_js.parse_fs(popcap_common_json_file_location).name
        }.pgj`;
        if (popcap_common_json.objects !== undefined) {
            fs_js.create_directory(directory_contain_popcap_splitable_data, true);
            for (let i: number = 0; i < popcap_common_json.objects.length; i++) {
                switch (popcap_split_method_selector) {
                    case 1:
                        if (popcap_common_json.objects[i] !== undefined) {
                            if (popcap_common_json.objects[i].aliases !== undefined) {
                                if (popcap_common_json.objects[i].aliases[0] !== undefined) {
                                    fs_js.write_json(
                                        `${directory_contain_popcap_splitable_data}/${popcap_common_json.objects[i].aliases[0]}.json`,
                                        popcap_common_json.objects[i],
                                        false,
                                    );
                                }
                            }
                        }
                        break;
                    case 2:
                        if (popcap_common_json.objects[i].aliases !== undefined) {
                            if (popcap_common_json.objects[i].objdata?.TypeName !== undefined) {
                                fs_js.write_json(
                                    `${directory_contain_popcap_splitable_data}/${popcap_common_json.objects[i].objdata?.TypeName}.json`,
                                    popcap_common_json.objects[i],
                                    false,
                                );
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return;
    }

    export function Cat(popcap_common_directory_file_location: string): PopCapCommonJSON | void {
        if (fs_js.is_file(popcap_common_directory_file_location)) {
            throw new WrongFile(
                `${localization("not_a_directory")}`,
                `${fs_js.get_full_path(popcap_common_directory_file_location)}`,
            );
        }
        const popcap_in_common_jsons_list: string[] = fs_js.one_reader(popcap_common_directory_file_location);
        const popcap_common_json_list: PopCapCommonJSONObject[] = new Array();
        popcap_in_common_jsons_list.forEach(function (popcap_json_file_directory: string) {
            const popcap_common_json_object = fs_js.read_json(popcap_json_file_directory) as PopCapCommonJSONObject;
            if (popcap_common_json_object.aliases === undefined) {
                return;
            } else {
                popcap_common_json_list.push(popcap_common_json_object);
            }
        });
        const create_popcap_common_json_object: PopCapCommonJSON = {
            version: 1,
            objects: popcap_common_json_list,
        };
        return create_popcap_common_json_object;
    }

    export function CatToFile(popcap_common_directory_file_location: string, file_out_type: "rton" | "json"): void {
        const create_popcap_common_json_object: PopCapCommonJSON = PopCapPackages.Json.Cat(
            popcap_common_directory_file_location,
        ) as PopCapCommonJSON;
        const output: string = `${fs_js.resolve(
            `${fs_js.dirname(popcap_common_directory_file_location)}/${
                fs_js.parse_fs(popcap_common_directory_file_location).name
            }.${file_out_type.toString().toLowerCase()}`,
        )}`;
        file_out_type === "json"
            ? fs_js.write_json(output, create_popcap_common_json_object, false)
            : fs_js.outfile_fs(
                  output,
                  json2rton(create_popcap_common_json_object, false, undefined, popcap_common_directory_file_location),
                  false,
              );
        return;
    }
}

export default PopCapPackages;
