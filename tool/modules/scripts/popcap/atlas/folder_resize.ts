"use strict";
import fs_js from "../../../library/fs/implement.js";
import { calculate, resize } from "../../../library/img/resize/util.js";
export default async function folder_resize(
    dir: string,
    orig: number | string,
    mod: number | string,
    new_set_entry_point?: string,
) {
    if (new_set_entry_point === null || new_set_entry_point === undefined || new_set_entry_point === void 0) {
        new_set_entry_point = `${fs_js.dirname(dir)}/${fs_js
            .parse_fs(dir)
            .name.replace(`_${orig.toString()}`, `_${mod.toString()}`)}.spg`;
    }
    if (typeof orig === "string") {
        orig = parseInt(orig);
    }
    if (typeof mod === "string") {
        mod = parseInt(mod);
    }
    if (!fs_js.js_exists(new_set_entry_point)) {
        fs_js.create_directory(new_set_entry_point);
    }
    const read_dir: Array<string> = fs_js.one_reader(dir);
    const image_dir: Array<string> = read_dir.filter((file) => fs_js.js_check_extname(file, ".png"));
    const atlas_info: any = fs_js.read_json(`${dir}/Atlasinfo.json`, true);
    atlas_info.subgroup = atlas_info.subgroup.replace(`_${orig.toString()}`, `_${mod.toString()}`);
    for (let k = 0; k < atlas_info.groups.length; k++) {
        for (let i = 0; i < atlas_info.groups[k].path.length; i++) {
            if (atlas_info.groups[k].path[i] === orig.toString()) {
                atlas_info.groups[k].path[i] = mod.toString();
                break;
            }
        }
    }
    fs_js.write_json(`${new_set_entry_point}/Atlasinfo.json`, atlas_info, true);
    for (let i = 0; i < image_dir.length; i++) {
        const input: { width: number; height: number } = await fs_js
            .get_async_dimension(`${dir}/${image_dir[i]}`)
            .then((data: any) => data)
            .catch((error: any) => {
                throw new Error(error.message as string);
            });
        const transform_x = calculate(orig, mod);
        if (input.width / transform_x <= 1 || input.height / transform_x <= 1) {
            await resize(
                `${dir}/${image_dir[i]}`,
                input.width,
                input.height,
                `${new_set_entry_point}/${image_dir[i]}`,
                true,
            );
        } else {
            await resize(
                `${dir}/${image_dir[i]}`,
                Math.ceil(input.width / transform_x),
                Math.ceil(input.height / transform_x),
                `${new_set_entry_point}/${image_dir[i]}`,
                true,
            );
        }
    }
    return new_set_entry_point;
}
