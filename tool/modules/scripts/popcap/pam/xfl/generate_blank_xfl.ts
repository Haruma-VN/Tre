"use trict";
import fs_js from "../../../../library/fs/implement.js";
import { parse } from "node:path";
import { dimension } from "../../../../library/img/util.js";
import createSprite from "./create_sprite.js";
import { atlasinfo_conduct } from "../../../default/atlas_info/util.js";
import check_resources_build from "../gif/check_manifest_build.js";
import localization from "../../../../callback/localization.js";
import evaluate_modules_workspace_assertation from "../../../../callback/evaluate_modules_workspace_assertation.js";
import pam_xfl_decode from "../json_to_flash/json_to_flash.js";
export default async function (
    path: string,
    number_sprites: number
): Promise<void> {
    const subgroup = `${parse(path).name}`;
    const pam_path = `${parse(path).dir}/${subgroup}.xfl`;
    const resource_build = await check_resources_build(path);
    const source_folder = fs_js.one_reader(path);
    const filter_source_folder = source_folder.filter(
        (image) => parse(image).ext.toUpperCase() === ".PNG"
    );
    const image = new Array();
    for (let i = 0; i < filter_source_folder.length; i++) {
        const source_dimension = await dimension(
            `${path}/${filter_source_folder[i]}`
        );
        const image_name = parse(filter_source_folder[i]).name;
        image.push({
            name: `${image_name}|${resource_build.extend_id.toUpperCase()}${image_name.toUpperCase()}`,
            size: [source_dimension.width, source_dimension.height],
            transform: [
                resource_build.scale_ratio,
                0,
                0,
                resource_build.scale_ratio,
                resource_build.position_x,
                resource_build.position_y,
            ],
        });
        const source = fs_js.read_file(
            `${path}/${filter_source_folder[i]}`,
            "buffer"
        );
        await fs_js.outfile_fs(
            `${pam_path}/LIBRARY/media/${filter_source_folder[i]}`,
            source
        );
    }
    const pam_json = {
        version: resource_build.version,
        frame_rate: resource_build.frame_rate,
        position: resource_build.position,
        size: [390, 390],
        image: image,
        sprite: createSprite(number_sprites, 1, "blank_sprite_"),
        main_sprite: createSprite(1, 1, "main_sprite")[0],
    };
    const resource_build_json_directory = `${path}/resource_build.json`;
    await pam_xfl_decode(pam_json, pam_path, 1536);
    atlasinfo_conduct(
        path,
        `${path}/Atlasinfo.json`,
        fs_js.read_json(resource_build_json_directory),
        false,
        `${subgroup}_1536`
    );
    fs_js.fs_copy(
        resource_build_json_directory,
        `${pam_path}/LIBRARY/media/resource_build.json`
    );
    fs_js.js_remove(resource_build_json_directory);
    fs_js.execution_status(
        "success",
        localization("deleted_resource_build_json")
    );
    await evaluate_modules_workspace_assertation(
        path,
        "popcap_texture_atlas_pack_cross_resolution"
    );
}
