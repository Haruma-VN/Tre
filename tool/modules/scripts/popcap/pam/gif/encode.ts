"use strict";
import fs_js from "../../../../library/fs/implement.js";
import check_manifest_build from "./check_manifest_build.js";

function popcap_pam_from_gif(
    file_system_input_directory: string,
    file_system_output_path_for_gif_to_pam: string
): structure {
    const frames_lists_of_string: Array<string> = fs_js.gif_to_pngs(
        file_system_input_directory,
        file_system_output_path_for_gif_to_pam
    );
    const read_resource_build: resource_build = check_manifest_build(
        file_system_output_path_for_gif_to_pam
    );
    const scale_ratio: number = read_resource_build["scale_ratio"];
    const create_new_image_list: Array<image_structure> = new Array();
    for (let i: number = 0; i < frames_lists_of_string.length; i++) {
        const create_dimension_view: {
            width: number;
            height: number;
        } = (fs_js.get_dimension(frames_lists_of_string[i])) as {
            width: number;
            height: number;
        };
        const get_popcap_image_name: string = fs_js.parse_fs(
            frames_lists_of_string[i]
        ).name;
        const create_transform_list: transform = [
            1,
            0,
            0,
            1,
            read_resource_build.position_x,
            read_resource_build.position_y,
        ];
        create_new_image_list.push({
            name: `${get_popcap_image_name}|${
                read_resource_build.extend_id +
                get_popcap_image_name.toUpperCase()
            }`,
            transform: create_transform_list,
            size: [create_dimension_view.width, create_dimension_view.height],
        });
    }
    // todo

    const create_new_sprite_list: Array<sprite_structure> = new Array();

    const create_new_main_sprite_area: main_sprite_structure = {
        name: "",
        description: "",
        frame_rate: read_resource_build.frame_rate as number,
        work_area: [0, frames_lists_of_string.length],
        frame: [],
    };
    for (let i = 0; i < frames_lists_of_string.length; i++) {
        const frame_json: main_sprite_frame_structure = {
            label: null,
            stop: i === frames_lists_of_string.length - 1 ? true : false,
            command: [],
            remove:
                i === 0
                    ? []
                    : [
                          {
                              index: i - 1,
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
                    time_scale: 1,
                },
            ],
            change: [
                {
                    index: i,
                    transform: [
                        scale_ratio !== 1 ? 1 * scale_ratio : scale_ratio,
                        0,
                        0,
                        scale_ratio !== 1 ? 1 * scale_ratio : scale_ratio,
                        read_resource_build.position_x,
                        read_resource_build.position_y,
                    ],
                    color: [1, 1, 1, 1],
                    sprite_frame_number: null,
                    source_rectangle: null,
                },
            ],
        };
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
    };
    return create_new_output_json satisfies structure;
}

export default popcap_pam_from_gif;
