"use strict";
import path from "path";
import { readjson, writejson } from "../../../Tre.Libraries/Tre.FileSystem/util.js";
export var Lawnstrings;
(function (Lawnstrings) {
    var PopCap;
    (function (PopCap) {
        function GetLawnstringsProperty(popcap_lawnstrings_file_location) {
            const lawnstrings_json = readjson(popcap_lawnstrings_file_location);
            const key = new Array();
            const value = new Array();
            for (let i = 0; i < lawnstrings_json.objects[0].objdata.LocStringValues.length; i++) {
                if (i % 2 == 0) {
                    key.push(lawnstrings_json.objects[0].objdata.LocStringValues[i]);
                }
                else {
                    value.push(lawnstrings_json.objects[0].objdata.LocStringValues[i]);
                }
            }
            const lawnstrings_converted_with_property = {};
            if (key.length === value.length) {
                for (let i = 0; i < key.length; i++) {
                    lawnstrings_converted_with_property[key[i]] = value[i];
                }
            }
            return lawnstrings_converted_with_property;
        }
        PopCap.GetLawnstringsProperty = GetLawnstringsProperty;
        function LawnstringDiff(original_directory, modified_directory) {
            const lawnstrings_original = GetLawnstringsProperty(original_directory);
            const lawnstrings_modified = GetLawnstringsProperty(modified_directory);
            const lawnstring_diff_output_expected = { NewLocalization: {}, ModifiedLocalization: {} };
            const new_localization_key = new Array();
            const get_all_keys_from_original_lawnstring = Object.keys(lawnstrings_original);
            Object.keys(lawnstrings_modified).forEach(function (key) {
                if (!get_all_keys_from_original_lawnstring.includes(key)) {
                    new_localization_key.push(key);
                }
            });
            const get_all_keys_from_modified_lawnstrings = Object.keys(lawnstrings_modified);
            const get_all_new_value_from_modified_lawnstrings = new Array();
            for (let i = 0; i < get_all_keys_from_original_lawnstring.length; i++) {
                for (let j = 0; j < get_all_keys_from_modified_lawnstrings.length; j++) {
                    if (get_all_keys_from_original_lawnstring[i] === get_all_keys_from_modified_lawnstrings[j]) {
                        if (lawnstrings_original[get_all_keys_from_original_lawnstring[i]] === lawnstrings_modified[get_all_keys_from_modified_lawnstrings[j]]) {
                            continue;
                        }
                        else {
                            get_all_new_value_from_modified_lawnstrings.push(get_all_keys_from_modified_lawnstrings[j]);
                        }
                    }
                }
            }
            ;
            for (let i = 0; i < new_localization_key.length; i++) {
                lawnstring_diff_output_expected.NewLocalization[new_localization_key[i]] = lawnstrings_modified[new_localization_key[i]];
            }
            for (let i = 0; i < get_all_new_value_from_modified_lawnstrings.length; i++) {
                lawnstring_diff_output_expected.ModifiedLocalization[get_all_new_value_from_modified_lawnstrings[i]] = lawnstrings_modified[get_all_new_value_from_modified_lawnstrings[i]];
            }
            return lawnstring_diff_output_expected;
        }
        PopCap.LawnstringDiff = LawnstringDiff;
        function WriteDiffJSON(original_directory, modified_directory) {
            return writejson(`${modified_directory}/../${path.parse(modified_directory).name}.diff.json`, LawnstringDiff(original_directory, modified_directory));
        }
        PopCap.WriteDiffJSON = WriteDiffJSON;
        function WriteLocalizationJSON(directory) {
            return writejson(`${directory}/../${path.parse(directory).name}.structure.json`, GetLawnstringsProperty(directory));
        }
        PopCap.WriteLocalizationJSON = WriteLocalizationJSON;
        function ConvertLocalizationJSONtoPopCapJSON(directory) {
            const key = Object.keys(readjson(directory));
            const value = Object.values(readjson(directory));
            const output_popcap_localization_lawnstrings = {
                objects: [{
                        aliases: [
                            "LawnStringsData"
                        ],
                        objclass: "LawnStringsData", objdata: { LocStringValues: [] }
                    }], version: 1,
            };
            if (key.length === value.length) {
                for (let i = 0; i < key.length; i++) {
                    output_popcap_localization_lawnstrings.objects[0].objdata.LocStringValues.push(key[i]);
                    output_popcap_localization_lawnstrings.objects[0].objdata.LocStringValues.push(value[i]);
                }
            }
            return output_popcap_localization_lawnstrings;
        }
        PopCap.ConvertLocalizationJSONtoPopCapJSON = ConvertLocalizationJSONtoPopCapJSON;
        function WritePopCapLawnstringsFromLocalizationLawnstrings(directory) {
            return writejson(`${directory}/../${path.parse(directory).name}.default.json`, ConvertLocalizationJSONtoPopCapJSON(directory));
        }
        PopCap.WritePopCapLawnstringsFromLocalizationLawnstrings = WritePopCapLawnstringsFromLocalizationLawnstrings;
    })(PopCap = Lawnstrings.PopCap || (Lawnstrings.PopCap = {}));
})(Lawnstrings || (Lawnstrings = {}));
