"use strict";
import path from "path";
import { readjson, writejson, makefolder, check_is_file, read_dir } from "../../../Tre.Libraries/Tre.FileSystem/util.js";
import { Console } from "../../../Tre.Callback/console.js";
namespace PopCapPackages.Json {

    export interface PopCapCommonJSON {
        version?: number,
        objects?: PopCapCommonJSONObject[]
    }

    export type PopCapCommonJSONObject = {
        objclass?: string,
        aliases: string[],
        objdata?: {
            TypeName?: string,
        }
    }

    export function ReadJSONObject(popcap_common_json_file_location: string): PopCapCommonJSON {
        return readjson(popcap_common_json_file_location)
    }

    export function Split(popcap_common_json_file_location: string, popcap_split_method_selector: number): void {
        if (!check_is_file(popcap_common_json_file_location)) {
            return Console.Notify("Asserted argument is not a valid file");
        }
        const popcap_common_json = ReadJSONObject(popcap_common_json_file_location);
        const directory_contain_popcap_splitable_data: string = `${popcap_common_json_file_location}/../${path.parse(popcap_common_json_file_location).name}.pgj`;
        if (popcap_common_json.objects != undefined) {
            makefolder(directory_contain_popcap_splitable_data);
            for (let i: number = 0; i < popcap_common_json.objects.length; i++) {
                switch (popcap_split_method_selector) {
                    case 1:
                        if (popcap_common_json.objects[i] != undefined) {
                            if (popcap_common_json.objects[i].aliases !== undefined) {
                                if (popcap_common_json.objects[i].aliases[0] !== undefined) {
                                    writejson(`${directory_contain_popcap_splitable_data}/${popcap_common_json.objects[i].aliases[0]}.json`, popcap_common_json.objects[i]);
                                }
                            }
                        }
                        break;
                    case 2:
                        if (popcap_common_json.objects[i].aliases != undefined) {
                            if (popcap_common_json.objects[i].objdata?.TypeName != undefined) {
                                writejson(`${directory_contain_popcap_splitable_data}/${popcap_common_json.objects[i].objdata?.TypeName}.json`, popcap_common_json.objects[i]);
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
        if (check_is_file(popcap_common_directory_file_location)) {
            return Console.Notify("Asserted argument is not a valid directory");
        }
        const popcap_in_common_jsons_list: string[] = read_dir(popcap_common_directory_file_location);
        const popcap_common_json_list: PopCapCommonJSONObject[] = new Array();
        popcap_in_common_jsons_list.forEach(function (popcap_json_file_directory: string) {
            const popcap_common_json_object = readjson(popcap_json_file_directory) as PopCapCommonJSONObject;
            if (popcap_common_json_object.aliases === undefined) {
                return;
            }
            else {
                popcap_common_json_list.push(popcap_common_json_object);
            }
        });
        const create_popcap_common_json_object: PopCapCommonJSON = { version: 1, objects: popcap_common_json_list };
        return create_popcap_common_json_object;
    }

    export function CatToFile(popcap_common_directory_file_location: string): void {
        const create_popcap_common_json_object = PopCapPackages.Json.Cat(popcap_common_directory_file_location) as PopCapCommonJSON;
        return writejson(`${popcap_common_directory_file_location}/../${path.parse(popcap_common_directory_file_location).name}.json`, create_popcap_common_json_object)
    }

}

export default PopCapPackages;