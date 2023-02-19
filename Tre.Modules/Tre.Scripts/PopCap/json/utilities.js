"use strict";
import path from "path";
import { readjson, writejson, makefolder, check_is_file, read_dir } from "../../../Tre.Libraries/Tre.FileSystem/util.js";
import { Console } from "../../../Tre.Callback/console.js";
var PopCapPackages;
(function (PopCapPackages) {
    var Json;
    (function (Json) {
        function ReadJSONObject(popcap_common_json_file_location) {
            return readjson(popcap_common_json_file_location);
        }
        Json.ReadJSONObject = ReadJSONObject;
        function Split(popcap_common_json_file_location, popcap_split_method_selector) {
            if (!check_is_file(popcap_common_json_file_location)) {
                return Console.Notify("Asserted argument is not a valid file");
            }
            const popcap_common_json = ReadJSONObject(popcap_common_json_file_location);
            const directory_contain_popcap_splitable_data = `${popcap_common_json_file_location}/../${path.parse(popcap_common_json_file_location).name}.pgj`;
            if (popcap_common_json.objects != undefined) {
                makefolder(directory_contain_popcap_splitable_data);
                for (let i = 0; i < popcap_common_json.objects.length; i++) {
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
        Json.Split = Split;
        function Cat(popcap_common_directory_file_location) {
            if (check_is_file(popcap_common_directory_file_location)) {
                return Console.Notify("Asserted argument is not a valid directory");
            }
            const popcap_in_common_jsons_list = read_dir(popcap_common_directory_file_location);
            const popcap_common_json_list = new Array();
            popcap_in_common_jsons_list.forEach(function (popcap_json_file_directory) {
                const popcap_common_json_object = readjson(popcap_json_file_directory);
                if (popcap_common_json_object.aliases === undefined) {
                    return;
                }
                else {
                    popcap_common_json_list.push(popcap_common_json_object);
                }
            });
            const create_popcap_common_json_object = { version: 1, objects: popcap_common_json_list };
            return create_popcap_common_json_object;
        }
        Json.Cat = Cat;
        function CatToFile(popcap_common_directory_file_location) {
            const create_popcap_common_json_object = PopCapPackages.Json.Cat(popcap_common_directory_file_location);
            return writejson(`${popcap_common_directory_file_location}/../${path.parse(popcap_common_directory_file_location).name}.json`, create_popcap_common_json_object);
        }
        Json.CatToFile = CatToFile;
    })(Json = PopCapPackages.Json || (PopCapPackages.Json = {}));
})(PopCapPackages || (PopCapPackages = {}));
export default PopCapPackages;
