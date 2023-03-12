"use strict";
import * as file_system from "../../../../Tre.Libraries/Tre.FileSystem/util.js";
import { extname, basename } from "../../../../Tre.Libraries/Tre.Basename/util.js";
import localization from "../../../../Tre.Callback/localization.js";
import * as color from "../../../../Tre.Libraries/Tre.Color/color.js";
import path from "node:path";
import getTrim from "../helper/trim.js";
import { MaxRectsPacker } from "maxrects-packer";
import * as portal from "../../../../Tre.Libraries/Tre.Images/util.js";

export interface sprite_template {
    width: number,
    height: number,
    path: Array<string>,
    id: string,
    infoX: number,
    infoY: number,
    cols?: number,
    image_directory: string,
}

export interface popcap_extra_information {
    x?: number,
    y?: number,
    cols?: number,
}

async function atlas_pack_experimental(directory: string, width: number, height: number, popcap_output_subgroup_name?: string, extend_for_new_pvz2_int_version: boolean = false, is_trim_mode:boolean = false) {
    if (popcap_output_subgroup_name === "" || popcap_output_subgroup_name === undefined || popcap_output_subgroup_name === null || popcap_output_subgroup_name === void 0) {
        popcap_output_subgroup_name = basename(directory);
    }
    const containable_files: Array<string> = file_system.read_dir(directory);
    const containable_pngs: Array<string> = new Array();
    for (let file of containable_files) {
        if (extname(file).toString().toLowerCase() === ".png") {
            containable_pngs.push(file);
        }
    }
    let total_sprites_process_in_thiz_function: number = 0;
    const containable_jsons: Array<any> = containable_pngs.map((filepath: string) => {
        const parts: path.ParsedPath = path.parse(filepath);
        parts.base = `${parts.name}.json`;
        const new_json_file_path: string = path.join(parts.dir, parts.base);
        if (file_system.if_file_exists(new_json_file_path)) {
            return new_json_file_path;
        }
        return null;
    }).filter((filepath) => filepath !== null);
    let res: string = "1536";
    if (popcap_output_subgroup_name.toString().indexOf('_1536') != -1) { res = "1536" }
    else if (popcap_output_subgroup_name.toString().indexOf('_768') != -1) { res = "768" }
    else if (popcap_output_subgroup_name.toString().indexOf('_384') != -1) { res = "384" }
    else if (popcap_output_subgroup_name.toString().indexOf('_640') != -1) { res = "640" }
    else if (popcap_output_subgroup_name.toString().indexOf('_1200') != -1) { res = "1200" }
    else {
        throw new Error(localization("cannot_find_res_data_indicated_in_subgroup"));
    }
    const img_list: Array<any> = new Array();
    for (let i in containable_pngs) {
        const sprite_dimension: { width: number, height: number } = await portal.dimension(containable_pngs[i]).then((result: { width: number, height: number }) => {
            return result;
        });
        for (let popcap_sprite_extra_json_name_base of containable_jsons) {
            if (basename(containable_pngs[i]) === basename(popcap_sprite_extra_json_name_base)) {
                const popcap_sprite_file_directory_as_parsed: path.ParsedPath = path.parse(path.relative(directory.toString(), popcap_sprite_extra_json_name_base));
                const popcap_sprite_json_information_for_extra_coordinate: popcap_extra_information = file_system.readjson(popcap_sprite_extra_json_name_base);
                total_sprites_process_in_thiz_function++;
                img_list.push({
                    width: sprite_dimension.width,
                    height: sprite_dimension.height,
                    path: [...popcap_sprite_file_directory_as_parsed.dir.split(path.sep)],
                    id: basename(containable_pngs[i]),
                    infoX: (popcap_sprite_json_information_for_extra_coordinate.x != undefined && popcap_sprite_json_information_for_extra_coordinate.x != void 0 && popcap_sprite_json_information_for_extra_coordinate.x != null) ? popcap_sprite_json_information_for_extra_coordinate.x : 0,
                    infoY: (popcap_sprite_json_information_for_extra_coordinate.y != undefined && popcap_sprite_json_information_for_extra_coordinate.y != void 0 && popcap_sprite_json_information_for_extra_coordinate.y != null) ? popcap_sprite_json_information_for_extra_coordinate.y : 0,
                    cols: (popcap_sprite_json_information_for_extra_coordinate.cols != undefined && popcap_sprite_json_information_for_extra_coordinate.cols != void 0 && popcap_sprite_json_information_for_extra_coordinate.cols != null) ? popcap_sprite_json_information_for_extra_coordinate.y : undefined,
                    image_directory: containable_pngs[i],
                });
            }
        }
    }
    const options = {
        smart: true,
        pot: false,
        square: true,
        allowRotation: false,
    };
    const img_data = new Array();
    let packer = new MaxRectsPacker(width, height, 1, options);
    packer.addArray(img_list);
    packer.bins.forEach((bin: any) => {
        img_data.push(bin.rects);
    });
    let result_json: any = {
        id: popcap_output_subgroup_name,
        type: "simple",
        parent: popcap_output_subgroup_name.replace('_1536', '').replace('_768', '').replace('_384', '').replace('_640', '').replace('_1200', ''),
        res: res,
        resources: new Array(),
    };
    const append_array = new Array();
    const dimension_array_value: Array<{ width: number, height: number }> = new Array();
    for (let i = 0; i < img_data.length; ++i) {
        const count = (i < 9 && i >= 0) ? ("0" + i) : i;
        dimension_array_value.push(is_trim_mode ? getTrim(img_data[i]) : {width: width, height: height});
        result_json.resources.push({
            slot: 0,
            id: "ATLASIMAGE_ATLAS_" + popcap_output_subgroup_name.toUpperCase() + "_" + count,
            path: [
                "atlases",
                popcap_output_subgroup_name + "_" + count,
            ],
            type: "Image",
            atlas: true,
            width: parseInt(dimension_array_value[i].width.toString()),
            height: parseInt(dimension_array_value[i].height.toString()),
        },)
        const child_array = new Array();
        for (let j in img_data[i]) {
            child_array.push({
                input: img_data[i][j].image_directory,
                left: img_data[i][j].x,
                top: img_data[i][j].y,
            });
            if (img_data[i][j].x != undefined && img_data[i][j].y != undefined && img_data[i][j].width != undefined && img_data[i][j].height != undefined && img_data[i][j].infoX != undefined && img_data[i][j].infoY != undefined) {
                result_json.resources.push({
                    slot: 0,
                    id: img_data[i][j].id,
                    path: img_data[i][j].path,
                    type: "Image",
                    parent: "ATLASIMAGE_ATLAS_" + popcap_output_subgroup_name.toUpperCase() + "_" + count,
                    ax: img_data[i][j].x,
                    ay: img_data[i][j].y,
                    aw: img_data[i][j].width,
                    ah: img_data[i][j].height,
                    x: img_data[i][j].infoX,
                    y: img_data[i][j].infoY,
                    cols: img_data[i][j].cols,
                },)
            }
        };
        append_array.push(child_array);
    };
    for (let i = 0; i < append_array.length; ++i) {
        const count = (i < 9 && i >= 0) ? ("0" + i.toString()) : i;
        await portal.cat(append_array[i], `${directory}/../${popcap_output_subgroup_name.toUpperCase()}_${count}.png`, dimension_array_value[i].width, dimension_array_value[i].height);
        console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${path.resolve(`${directory}/../${popcap_output_subgroup_name.toUpperCase()}_${count}.png`)}`);
    };
    if (extend_for_new_pvz2_int_version) {
        for (let i: number = 0; i < result_json.resources.length; ++i) {
            if ("path" in result_json.resources[i] && Array.isArray(result_json.resources[i].path)) {
                result_json.resources[i].path = result_json.resources[i].path.join("\\");
            }
        }
    }
    file_system.writejson(directory + "/../" + popcap_output_subgroup_name + '.json', result_json);
    console.log(color.fggreen_string("◉ " + `${localization("execution_actual_size")}: `) + `${img_list.length}`);
    console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${path.resolve(directory + "/../" + popcap_output_subgroup_name + '.json')}`);
    return 0;
}
export default atlas_pack_experimental;