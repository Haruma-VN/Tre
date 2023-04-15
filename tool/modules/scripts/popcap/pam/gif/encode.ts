"use strict";
import { js_checker } from "../../../../callback/evaluation_modules_workspace_assertation.js";
import localization from "../../../../callback/localization.js";
import fs_js from "../../../../library/fs/implement.js";
import { readline_normal } from "../../../../readline/util.js";
import path from "node:path";
import * as color from "../../../../library/color/color.js";

async function popcap_pam_from_gif(
    file_system_input_directory: string,
    file_system_output_path_for_gif_to_pam: string,
): Promise<structure> {
    const frames_lists_of_string: Array<string> = await fs_js.gif_to_pngs(
        file_system_input_directory,
        file_system_output_path_for_gif_to_pam,
    );
    fs_js.copy_manifest(file_system_output_path_for_gif_to_pam);
    let create_readline_interface: string = readline_normal();
    while (true) {
        if (create_readline_interface === "") {
            break;
        }
        console.log(color.yellow_string(`◉ ${localization("execution_warning")}: ${localization("pass_an_empty_str")}`));
        create_readline_interface = readline_normal();
    }
    const read_resource_build: any = fs_js.read_json(`${file_system_output_path_for_gif_to_pam}/resource_build.json`) as resource_build;
    if (!("extend_id" in read_resource_build) || !(typeof (read_resource_build.extend_id) === "string")) {
        throw new Error(localization("not_found_extend_id"));
    }
    if (!("extend_path" in read_resource_build) || !(js_checker.is_array(read_resource_build.extend_path))) {
        throw new Error(localization("not_found_extend_path"));
    }
    if (!("position_x" in read_resource_build)) {
        throw new Error(localization("not_found_position_x"));
    }
    if (!("position_y" in read_resource_build)) {
        throw new Error(localization("not_found_position_y"));
    }
    if (!("popcap_resource_x" in read_resource_build)) {
        throw new Error(localization("not_found_popcap_resource_x"));
    }
    if (!("popcap_resource_y" in read_resource_build)) {
        throw new Error(localization("not_found_popcap_resource_y"));
    }
    if (!("frame_rate" in read_resource_build)) {
        throw new Error(localization("not_found_frame_rate"));
    }
    if (!("version" in read_resource_build) || (parseInt(read_resource_build.version) > 6 || parseInt(read_resource_build) < 1)) {
        throw new Error(localization("not_found_version"));
    }
    if (!("position" in read_resource_build) || !(js_checker.is_array(read_resource_build.position))) {
        throw new Error(localization("not_found_position"));
    }
    if (!("popcap_resource_path_type" in read_resource_build) && (typeof read_resource_build.popcap_resource_path_type) === "string") {
        throw new Error(localization("not_found_popcap_expand_path"));
    }
    if (!("trim" in read_resource_build)) {
        throw new Error(localization("not_found_trim"));
    }
    const create_new_image_list: Array<image_structure> = new Array();
    for (let i: number = 0; i < frames_lists_of_string.length; i++) {
        const create_dimension_view: {
            width: number,
            height: number,
        } = await fs_js.get_dimension(frames_lists_of_string[i]) as {
            width: number,
            height: number,
        };
        const get_popcap_image_name: string = path.parse(frames_lists_of_string[i]).name;
        const create_transform_list: transform = [
            1,
            0,
            0,
            1,
            read_resource_build.position_x,
            read_resource_build.position_y
        ];
        create_new_image_list.push({
            name: `${get_popcap_image_name}|${read_resource_build.extend_id + get_popcap_image_name.toUpperCase()}`,
            transform: create_transform_list,
            size: [
                create_dimension_view.width,
                create_dimension_view.height,
            ],
        })
    }
    // todo


    const create_new_sprite_list: Array<sprite_structure> = new Array();




    const create_new_main_sprite_area: main_sprite_structure = {
        name: "",
        description: "",
        frame_rate: read_resource_build.frame_rate as number,
        work_area: [
            0,
            frames_lists_of_string.length,
        ],
        frame: [],
    }
    for (let i = 0; i < frames_lists_of_string.length; i++) {
        const frame_json: main_sprite_frame_structure = {
            label: null,
            stop: (i === frames_lists_of_string.length - 1) ? true : false,
            command: [],
            remove: (i === 0) ? [] : [
                {
                    index: (i - 1),
                },
            ],
            append: [
                {
                    index: i,
                    name: null,
                    resource: i,
                    sprite: false,
                    additive: false,
                    preload_frame: 0,
                    timescale: 1,
                }
            ],
            change: [
                {
                    index: i,
                    transform:
                        [
                            1,
                            0,
                            0,
                            1,
                            read_resource_build.position_x,
                            read_resource_build.position_y,
                        ],
                    color: [
                        1,
                        1,
                        1,
                        1,
                    ],
                    anim_frame_num: 0,
                    src_rect: null,
                },
            ]
        }
        create_new_main_sprite_area.frame.push(frame_json);
    }
    const create_new_output_json: structure = {
        version: read_resource_build.version as 1 | 2 | 3 | 4 | 5 | 6,
        frame_rate: read_resource_build.frame_rate as number,
        position: [
            read_resource_build.position[0] as number,
            read_resource_build.position[1] as number,
        ],
        size: [
            create_new_image_list[0].size[0] as number,
            create_new_image_list[0].size[1] as number,
        ],
        image: create_new_image_list as Array<image_structure>,
        sprite: create_new_sprite_list as Array<sprite_structure>,
        main_sprite: create_new_main_sprite_area as main_sprite_structure,
    }
    return create_new_output_json satisfies structure;
}

export default popcap_pam_from_gif;