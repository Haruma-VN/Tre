"use strict";
import path from "path";
import { readjson, writejson } from "../../../library/fs/util.js";
import localization from "../../../callback/localization.js";
import * as color from "../../../library/color/color.js";

export namespace Lawnstrings.popcap {
    export interface PopCapLawnstring {
        objects: [
            {
                aliases?: string[];
                objclass: string;
                objdata: {
                    LocStringValues: string[];
                };
            }
        ];
        version?: number;
    }

    export interface LawnstringsPropertyKeyAndValue {
        [key: string]: string;
    }

    export interface PopCapLawnstringDiffOutput {
        NewLocalization: LawnstringsPropertyKeyAndValue;
        ModifiedLocalization: LawnstringsPropertyKeyAndValue;
    }

    export function GetLawnstringsProperty(
        popcap_lawnstrings_file_location: string
    ): LawnstringsPropertyKeyAndValue {
        const lawnstrings_json: PopCapLawnstring = readjson(
            popcap_lawnstrings_file_location
        ) as PopCapLawnstring;
        const key: string[] = new Array();
        const value: string[] = new Array();
        for (
            let i: number = 0;
            i < lawnstrings_json.objects[0].objdata.LocStringValues.length;
            i++
        ) {
            if (i % 2 === 0) {
                key.push(
                    lawnstrings_json.objects[0].objdata.LocStringValues[i]
                );
            } else {
                value.push(
                    lawnstrings_json.objects[0].objdata.LocStringValues[i]
                );
            }
        }
        const lawnstrings_converted_with_property: LawnstringsPropertyKeyAndValue =
            {};
        if (key.length === value.length) {
            for (let i: number = 0; i < key.length; i++) {
                lawnstrings_converted_with_property[key[i]] = value[i];
            }
        }
        return lawnstrings_converted_with_property;
    }

    export function LawnstringDiff(
        original_directory: string,
        modified_directory: string
    ): PopCapLawnstringDiffOutput {
        const lawnstrings_original: LawnstringsPropertyKeyAndValue =
            GetLawnstringsProperty(original_directory);
        const lawnstrings_modified: LawnstringsPropertyKeyAndValue =
            GetLawnstringsProperty(modified_directory);
        const lawnstring_diff_output_expected: PopCapLawnstringDiffOutput = {
            NewLocalization: {},
            ModifiedLocalization: {},
        };
        const new_localization_key: string[] = new Array();
        const get_all_keys_from_original_lawnstring: string[] =
            Object.keys(lawnstrings_original);
        Object.keys(lawnstrings_modified).forEach(function (key: string) {
            if (!get_all_keys_from_original_lawnstring.includes(key)) {
                new_localization_key.push(key);
            }
        });
        const get_all_keys_from_modified_lawnstrings: string[] =
            Object.keys(lawnstrings_modified);
        const get_all_new_value_from_modified_lawnstrings: string[] =
            new Array();
        for (
            let i: number = 0;
            i < get_all_keys_from_original_lawnstring.length;
            i++
        ) {
            for (
                let j: number = 0;
                j < get_all_keys_from_modified_lawnstrings.length;
                j++
            ) {
                if (
                    get_all_keys_from_original_lawnstring[i] ===
                    get_all_keys_from_modified_lawnstrings[j]
                ) {
                    if (
                        lawnstrings_original[
                            get_all_keys_from_original_lawnstring[i]
                        ] ===
                        lawnstrings_modified[
                            get_all_keys_from_modified_lawnstrings[j]
                        ]
                    ) {
                        continue;
                    } else {
                        get_all_new_value_from_modified_lawnstrings.push(
                            get_all_keys_from_modified_lawnstrings[j]
                        );
                    }
                }
            }
        }
        for (let i: number = 0; i < new_localization_key.length; i++) {
            lawnstring_diff_output_expected.NewLocalization[
                new_localization_key[i]
            ] = lawnstrings_modified[new_localization_key[i]];
        }
        for (
            let i: number = 0;
            i < get_all_new_value_from_modified_lawnstrings.length;
            i++
        ) {
            lawnstring_diff_output_expected.ModifiedLocalization[
                get_all_new_value_from_modified_lawnstrings[i]
            ] =
                lawnstrings_modified[
                    get_all_new_value_from_modified_lawnstrings[i]
                ];
        }
        return lawnstring_diff_output_expected;
    }

    export function WriteDiffJSON(
        original_directory: string,
        modified_directory: string
    ): void {
        console.log(
            `${color.fggreen_string(
                "◉ " + localization("execution_out") + ":\n     "
            )} ${path.resolve(
                `${modified_directory}/../${
                    path.parse(modified_directory).name
                }.diff.json`
            )}`
        );
        return writejson(
            `${modified_directory}/../${
                path.parse(modified_directory).name
            }.diff.json`,
            LawnstringDiff(original_directory, modified_directory)
        );
    }

    export function WriteLocalizationJSON(directory: string): void {
        console.log(
            `${color.fggreen_string(
                "◉ " + localization("execution_out") + ":\n     "
            )} ${path.resolve(
                `${directory}/../${path.parse(directory).name}.structure.json`
            )}`
        );
        return writejson(
            `${directory}/../${path.parse(directory).name}.structure.json`,
            GetLawnstringsProperty(directory)
        );
    }

    export function ConvertLocalizationJSONtoPopCapJSON(
        directory: string
    ): PopCapLawnstring {
        const key: string[] = Object.keys(readjson(directory));
        const value: string[] = Object.values(readjson(directory));
        const output_popcap_localization_lawnstrings: PopCapLawnstring = {
            objects: [
                {
                    aliases: ["LawnStringsData"],
                    objclass: "LawnStringsData",
                    objdata: { LocStringValues: [] },
                },
            ],
            version: 1,
        };
        if (key.length === value.length) {
            for (let i: number = 0; i < key.length; i++) {
                output_popcap_localization_lawnstrings.objects[0].objdata.LocStringValues.push(
                    key[i]
                );
                output_popcap_localization_lawnstrings.objects[0].objdata.LocStringValues.push(
                    value[i]
                );
            }
        }
        return output_popcap_localization_lawnstrings;
    }

    export function WritePopCapLawnstringsFromLocalizationLawnstrings(
        directory: string
    ): void {
        console.log(
            `${color.fggreen_string(
                "◉ " + localization("execution_out") + ":\n     "
            )} ${path.resolve(
                `${directory}/../${path.parse(directory).name}.default.json`
            )}`
        );
        return writejson(
            `${directory}/../${path.parse(directory).name}.default.json`,
            ConvertLocalizationJSONtoPopCapJSON(directory)
        );
    }
}
