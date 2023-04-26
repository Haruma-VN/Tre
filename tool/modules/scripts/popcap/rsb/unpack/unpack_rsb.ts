"use strict";
import { SingleBar } from "cli-progress";
import { SmartBuffer } from "smart-buffer";
import path, { parse } from "node:path";
import rsb_read_header_info from "./rsb_read_header_info.js";
import extract_rsg_name_path from "./extract_rsg_name_path.js";
import extract_resources_data from "./extract_resources_data.js";
import rsg_file_info from "./rsg_file_info.js";
import rsg_unpack from "../../rsg/unpack_rsg.js";
import composite_item_list from "./composite_item_list.js";
import { readline_integer } from "../../../../readline/prompt/util.js";
import localization from "../../../../callback/localization.js";
import * as color from "../../../../library/color/color.js";
import fs_js from "../../../../library/fs/implement.js";
import { Console } from "../../../../callback/console.js";

export default async function (
    rsb_data_will_not_be_cipher: any,
    simple: boolean = false,
    unpack_everything: boolean = false
) {
    let decode_rton = false;
    let decode_ptx = false;
    let decode_data = false;
    let splitres = false;
    let ios_argb8888 = 0;
    const TreRSGInfo: any = new Array();
    const arguments_default_modifier: any = fs_js.read_json(
        fs_js.functions_json_location,
        true
    );
    if (simple) {
        const popcap_packages_conversion =
            arguments_default_modifier.popcap_rsb_unpack_simple.arguments
                .packages_conversion !== undefined &&
            arguments_default_modifier.popcap_rsb_unpack_simple.arguments
                .packages_conversion !== null &&
            arguments_default_modifier.popcap_rsb_unpack_simple.arguments
                .packages_conversion !== void 0 &&
            (typeof arguments_default_modifier.popcap_rsb_unpack_simple
                .arguments.packages_conversion === "string" ||
                Number.isInteger(
                    arguments_default_modifier.popcap_rsb_unpack_simple
                        .arguments.packages_conversion
                )) &&
            (parseInt(
                arguments_default_modifier.popcap_rsb_unpack_simple.arguments
                    .packages_conversion
            ) === 1 ||
                parseInt(
                    arguments_default_modifier.popcap_rsb_unpack_simple
                        .arguments.packages_conversion
                ) === 0)
                ? parseInt(
                      arguments_default_modifier.popcap_rsb_unpack_simple
                          .arguments.packages_conversion
                  )
                : 2;
        if (popcap_packages_conversion === 2) {
            Console.WriteLine(
                color.fgcyan_string(
                    `◉ ${localization("execution_argument")}: ${localization(
                        "decode_rtons"
                    )}`
                )
            );
            fs_js.execution_boolean_view();
        } else {
            const create_new_print_message =
                popcap_packages_conversion === 1
                    ? localization("decode_rtons")
                    : localization("no_decode_rtons");
            fs_js.execution_auto(
                `${localization(
                    "popcap_rsb_unpack_simple"
                )} ~ ${create_new_print_message}`
            );
        }
        const create_new_empty_viewer =
            popcap_packages_conversion === 2
                ? readline_integer(0, 1)
                : popcap_packages_conversion;
        decode_rton = create_new_empty_viewer === 1 ? true : false;
        if (decode_rton) {
            const support_popcap_resources_conversion =
                arguments_default_modifier.popcap_rsb_unpack_simple.arguments
                    .split_popcap_resources !== undefined &&
                arguments_default_modifier.popcap_rsb_unpack_simple.arguments
                    .split_popcap_resources !== null &&
                arguments_default_modifier.popcap_rsb_unpack_simple.arguments
                    .split_popcap_resources !== void 0 &&
                (typeof arguments_default_modifier.popcap_rsb_unpack_simple
                    .arguments.split_popcap_resources === "string" ||
                    Number.isInteger(
                        arguments_default_modifier.popcap_rsb_unpack_simple
                            .arguments.split_popcap_resources
                    )) &&
                (parseInt(
                    arguments_default_modifier.popcap_rsb_unpack_simple
                        .arguments.split_popcap_resources
                ) === 1 ||
                    parseInt(
                        arguments_default_modifier.popcap_rsb_unpack_simple
                            .arguments.split_popcap_resources
                    ) === 0)
                    ? parseInt(
                          arguments_default_modifier.popcap_rsb_unpack_simple
                              .arguments.split_popcap_resources
                      )
                    : 2;
            if (support_popcap_resources_conversion === 2) {
                Console.WriteLine(
                    color.fgcyan_string(
                        `◉ ${localization(
                            "execution_argument"
                        )}: ${localization("split_res")}`
                    )
                );
                fs_js.execution_boolean_view();
            } else {
                const create_new_print_message =
                    support_popcap_resources_conversion === 1
                        ? localization("split_popcap_res")
                        : localization("no_split_res");
                fs_js.execution_auto(
                    `${localization(
                        "popcap_rsb_unpack_simple"
                    )} ~ ${create_new_print_message}`
                );
            }
            const split_res_boolean =
                support_popcap_resources_conversion === 2
                    ? readline_integer(0, 1)
                    : support_popcap_resources_conversion;
            splitres = split_res_boolean === 1 ? true : false;
        }
    } else if (unpack_everything) {
        const popcap_packages_conversion =
            arguments_default_modifier.popcap_rsb_resource_unpack.arguments
                .packages_conversion !== undefined &&
            arguments_default_modifier.popcap_rsb_resource_unpack.arguments
                .packages_conversion !== null &&
            arguments_default_modifier.popcap_rsb_resource_unpack.arguments
                .packages_conversion !== void 0 &&
            (typeof arguments_default_modifier.popcap_rsb_resource_unpack
                .arguments.packages_conversion === "string" ||
                Number.isInteger(
                    arguments_default_modifier.popcap_rsb_resource_unpack
                        .arguments.packages_conversion
                )) &&
            (parseInt(
                arguments_default_modifier.popcap_rsb_resource_unpack.arguments
                    .packages_conversion
            ) === 1 ||
                parseInt(
                    arguments_default_modifier.popcap_rsb_resource_unpack
                        .arguments.packages_conversion
                ) === 0)
                ? parseInt(
                      arguments_default_modifier.popcap_rsb_resource_unpack
                          .arguments.packages_conversion
                  )
                : 2;
        if (popcap_packages_conversion === 2) {
            Console.WriteLine(
                color.fgcyan_string(
                    `◉ ${localization("execution_argument")}: ${localization(
                        "decode_rtons"
                    )}`
                )
            );
            fs_js.execution_boolean_view();
        } else {
            const create_new_print_message =
                popcap_packages_conversion === 1
                    ? localization("decode_rtons")
                    : localization("no_decode_rtons");
            fs_js.execution_auto(
                `${localization(
                    "popcap_rsb_resource_unpack"
                )} ~ ${create_new_print_message}`
            );
        }
        const create_new_empty_viewer =
            popcap_packages_conversion === 2
                ? readline_integer(0, 1)
                : popcap_packages_conversion;
        decode_rton = create_new_empty_viewer === 1 ? true : false;
        const support_popcap_ptx_conversion =
            arguments_default_modifier.popcap_rsb_resource_unpack.arguments
                .decode_ptx !== undefined &&
            arguments_default_modifier.popcap_rsb_resource_unpack.arguments
                .decode_ptx !== null &&
            arguments_default_modifier.popcap_rsb_resource_unpack.arguments
                .decode_ptx !== void 0 &&
            (typeof arguments_default_modifier.popcap_rsb_resource_unpack
                .arguments.decode_ptx === "string" ||
                Number.isInteger(
                    arguments_default_modifier.popcap_rsb_resource_unpack
                        .arguments.decode_ptx
                )) &&
            (parseInt(
                arguments_default_modifier.popcap_rsb_resource_unpack.arguments
                    .decode_ptx
            ) === 1 ||
                parseInt(
                    arguments_default_modifier.popcap_rsb_resource_unpack
                        .arguments.decode_ptx
                ) === 0)
                ? parseInt(
                      arguments_default_modifier.popcap_rsb_resource_unpack
                          .arguments.decode_ptx
                  )
                : 2;
        if (support_popcap_ptx_conversion === 2) {
            Console.WriteLine(
                color.fgcyan_string(
                    `◉ ${localization("execution_argument")}: ${localization(
                        "decode_ptx"
                    )}`
                )
            );
            fs_js.execution_boolean_view();
        } else {
            const create_new_print_message =
                support_popcap_ptx_conversion === 1
                    ? localization("decode_ptx")
                    : localization("no_decode_ptx");
            fs_js.execution_auto(
                `${localization(
                    "popcap_rsb_resource_unpack"
                )} ~ ${create_new_print_message}`
            );
        }
        const create_new_decode_ptx_argument =
            support_popcap_ptx_conversion === 2
                ? readline_integer(0, 1)
                : support_popcap_ptx_conversion;
        decode_ptx = create_new_decode_ptx_argument === 1 ? true : false;
        if (decode_ptx) {
            Console.WriteLine(
                color.fgcyan_string(
                    `◉ ${localization("execution_argument")}: ${
                        parse(rsb_data_will_not_be_cipher).base
                    } ${localization("ios_argb8888")}`
                )
            );
            fs_js.execution_boolean_view();
            ios_argb8888 = readline_integer(0, 1) === 1 ? 1 : 0;
        }
        fs_js.assertation_create("argument", localization("decode_data"));
        decode_data = readline_integer(0, 1) === 1 ? true : false;
        //
    }
    const rsb_buffer_for_unpacking = fs_js.read_file(
        rsb_data_will_not_be_cipher,
        "buffer"
    );
    const rsb_new_extract_folder = `${rsb_data_will_not_be_cipher}/../${
        parse(rsb_data_will_not_be_cipher).name
    }.bundle`;
    Console.WriteLine(
        `${color.fggreen_string(
            "◉ " + localization("execution_out") + ":\n     "
        )} ${path.resolve(rsb_new_extract_folder)}`
    );
    fs_js.create_directory(`${rsb_new_extract_folder}`);
    const iz_magic_header_rsb = SmartBuffer.fromBuffer(
        rsb_buffer_for_unpacking.slice(0, 0x70)
    );
    const rsb_header_info_for_unpacking = await rsb_read_header_info(
        iz_magic_header_rsb
    );
    if (rsb_header_info_for_unpacking.magic === "1bsr") {
        const rsb_rsg_header = rsb_buffer_for_unpacking.slice(
            rsb_header_info_for_unpacking.rsgList_BeginOffset,
            rsb_header_info_for_unpacking.rsgList_BeginOffset +
                rsb_header_info_for_unpacking.rsgList_Length
        );
        let rsg_name_list_uppercase = await extract_rsg_name_path(
            rsb_rsg_header,
            0,
            rsb_header_info_for_unpacking.rsgList_Length
        );
        let rsg_list_info = await rsg_file_info(
            rsb_header_info_for_unpacking.rsg_offset,
            rsb_buffer_for_unpacking,
            rsb_buffer_for_unpacking.slice(
                rsb_header_info_for_unpacking.rsgInfo_BeginOffset,
                rsb_header_info_for_unpacking.autopoolInfo_BeginOffset
            )
        );
        rsg_name_list_uppercase = rsg_name_list_uppercase.sort((a, b) => {
            return a.rsg_pool_index - b.rsg_pool_index;
        });
        rsg_list_info = rsg_list_info.sort((a, b) => {
            return a.rsg_item_pool_index - b.rsg_item_pool_index;
        });
        const bar = new SingleBar({
            format: fs_js.create_toolkit_view("progress_bar")
                ? color.fgcyan_string(
                      "◉ " + localization("execution_status") + " |"
                  ) +
                  color.fggreen_string("{bar}") +
                  color.fgcyan_string(`| {percentage}% || {value}/{total}`)
                : color.fgcyan_string(
                      "◉ " + localization("execution_actual_size") + ": "
                  ) + color.fgcyan_string(`{percentage}% || {value}/{total}`),
            barCompleteChar: "\u2588",
            barIncompleteChar: "\u2591",
            hideCursor: true,
        });
        const composite_folder_list = rsb_buffer_for_unpacking.slice(
            rsb_header_info_for_unpacking.compositeInfo_BeginOffset,
            rsb_header_info_for_unpacking.compositeList_BeginOffset
        );
        const composite_list_info = await composite_item_list(
            composite_folder_list
        );
        const rsg_item_unpack_list = await extract_resources_data(
            rsg_name_list_uppercase,
            rsg_list_info,
            rsb_buffer_for_unpacking,
            simple,
            decode_rton,
            splitres,
            rsb_new_extract_folder
        );
        if (unpack_everything) {
            bar.start(rsg_item_unpack_list[1].length, 0, {
                speed: "N/A",
            });
        }
        let popcap_rsg_count = 0;
        for (let composite_item of composite_list_info[0]) {
            const composite_item_list = new Array();
            for (let k = 0; k < composite_item.composite_length; k++) {
                for (let composite_pool_index in composite_list_info[1]) {
                    if (
                        composite_list_info[1][composite_pool_index]
                            .composite_pool_index ===
                        composite_item.composite_pool_index
                    ) {
                        for (let rsg_pool_index in rsg_item_unpack_list[1]) {
                            if (
                                composite_list_info[1][composite_pool_index]
                                    .rsg_pool_index ===
                                rsg_item_unpack_list[1][rsg_pool_index]
                                    .rsg_item_pool_index
                            ) {
                                const rsg_file_data =
                                    rsb_buffer_for_unpacking.slice(
                                        rsg_item_unpack_list[1][rsg_pool_index]
                                            .rsg_item_offset,
                                        rsg_item_unpack_list[1][rsg_pool_index]
                                            .rsg_item_offset +
                                            rsg_item_unpack_list[1][
                                                rsg_pool_index
                                            ].rsg_item_size
                                    );
                                let rsg_treinfo =
                                    rsg_item_unpack_list[1][rsg_pool_index]
                                        .rsg_name_item;
                                if (simple) {
                                    if (
                                        rsg_item_unpack_list[1][
                                            rsg_pool_index
                                        ].rsg_name_item.toUpperCase() ===
                                        "PACKAGES"
                                    ) {
                                        await rsg_unpack(
                                            rsg_file_data,
                                            rsb_new_extract_folder,
                                            false,
                                            decode_rton,
                                            false,
                                            true,
                                            2,
                                            true
                                        );
                                    } else if (
                                        rsg_item_unpack_list[1][
                                            rsg_pool_index
                                        ].rsg_name_item
                                            .toUpperCase()
                                            .indexOf("__MANIFESTGROUP__") !== -1
                                    ) {
                                    } else {
                                        fs_js.outfile_fs(
                                            `${rsb_new_extract_folder}/Packet/${rsg_item_unpack_list[1][rsg_pool_index].rsg_name_item}.rsg`,
                                            rsg_file_data
                                        );
                                    }
                                } else if (unpack_everything) {
                                    bar.increment();
                                    popcap_rsg_count++;
                                    bar.update(popcap_rsg_count);
                                    const rsg_file_info = await rsg_unpack(
                                        rsg_file_data,
                                        rsb_new_extract_folder,
                                        decode_ptx,
                                        decode_rton,
                                        decode_data,
                                        true,
                                        ios_argb8888,
                                        true
                                    );
                                    rsg_treinfo = Object.fromEntries([
                                        [
                                            rsg_item_unpack_list[1][
                                                rsg_pool_index
                                            ].rsg_name_item,
                                            rsg_file_info,
                                        ],
                                    ]);
                                } else {
                                    fs_js.outfile_fs(
                                        `${rsb_new_extract_folder}/Packet/${rsg_item_unpack_list[1][rsg_pool_index].rsg_name_item}.rsg`,
                                        rsg_file_data
                                    );
                                }
                                composite_item_list.push(rsg_treinfo);
                                composite_list_info[1].splice(
                                    composite_pool_index as any,
                                    1
                                );
                                rsg_item_unpack_list[1].splice(
                                    rsg_pool_index,
                                    1
                                );
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            TreRSGInfo.push([
                composite_item.composite_name,
                composite_item_list,
            ]);
        }
        bar.stop();
        fs_js.write_json(
            `${rsb_new_extract_folder}/TreRSBInfo.json`,
            Object.fromEntries(TreRSGInfo)
        );
    } else {
        throw new Error(localization("not_a_rsb"));
    }
}
