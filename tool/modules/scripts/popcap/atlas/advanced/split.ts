"use strict";
import { createCanvas, Image, Canvas, SKRSContext2D } from "@napi-rs/canvas";
import localization from "../../../../callback/localization.js";
import * as color from "../../../../library/color/color.js";
import fs_js from "../../../../library/fs/implement.js";
import { Console } from "../../../../callback/console.js";
import { split } from "../../../../library/img/util.js";
import { MissingProperty } from "../../../../implement/error.js";

export interface PopCapResJsonDataBundle {
    resources?: PopCapResJsonDetailInfo[];
    id?: string;
}

export interface PopCapResJsonDetailInfo {
    x: number;
    y: number;
    ax: number;
    ay: number;
    ah: number;
    aw: number;
    atlas?: boolean;
    id: string;
    path: string[] | string;
    parent: string;
}

export interface configAtlas {
    atlas: {
        split: {
            repairDuplicateFolder: boolean;
        };
    };
}
function atlas_split_advanced(execute_file_dir: string[]): void {
    let json: any = {};
    const img_list: Array<string> = new Array();
    let directory_name: string = "";
    let dir_sys: string = "";
    for (let i: number = 0; i < execute_file_dir.length; i++) {
        switch (fs_js.extname(execute_file_dir[i]).toLowerCase()) {
            case ".json":
                json = fs_js.read_json(execute_file_dir[i]);
                if (json.resources === undefined) {
                    throw new MissingProperty(localization("not_popcap_res"), "resources", execute_file_dir[i]);
                }
                directory_name = fs_js.parse_fs(execute_file_dir[i]).name + ".spg";
                dir_sys += `${fs_js.dirname(execute_file_dir[i])}/${directory_name}`;
                fs_js.create_directory(dir_sys.toString());
                break;
            case ".png":
                img_list.push(execute_file_dir[i]);
                break;
            default:
                continue;
        }
    }
    let count_images_split: number = 0;
    if ("resources" in json && json.resources !== undefined && json.resources !== null && json.resources !== void 0) {
        let extension_list = new Array();
        for (const img of img_list) {
            const img_split: Image = new Image();
            img_split.onload = function () {
                const img_canvas: Canvas = createCanvas(img_split.width, img_split.height);
                const img_ctx: SKRSContext2D = img_canvas.getContext("2d");
                img_ctx.drawImage(img_canvas, 0, 0);
                for (let i: number = 0; i < json.resources.length; ++i) {
                    if (json.resources[i].atlas !== undefined) {
                        continue;
                    }
                    if (typeof json.resources[i].path === "string") {
                        json.resources[i].path = json.resources[i].path.split("\\");
                    }
                    const popcap_atlas_output_atlas_directory: string =
                        dir_sys + "/" + fs_js.join_fs(...json.resources[i].path);
                    fs_js.create_directory(popcap_atlas_output_atlas_directory, true);
                    if (
                        json.resources[i].parent.toUpperCase() ===
                        "ATLASIMAGE_ATLAS_" + fs_js.parse_fs(img).name.toString().toUpperCase()
                    ) {
                        count_images_split++;
                        const filePath: str = fs_js.resolve(
                            `${popcap_atlas_output_atlas_directory}/${json.resources[i].id}.png`,
                        );
                        split(
                            img_ctx,
                            json.resources[i].ax,
                            json.resources[i].ay,
                            json.resources[i].aw,
                            json.resources[i].ah,
                            filePath,
                            json.resources[i].id,
                            extension_list,
                        );
                        const jsonPath = `${popcap_atlas_output_atlas_directory}/${json.resources[i].id}.json`;
                        fs_js.write_json(
                            jsonPath,
                            {
                                x:
                                    json.resources[i].x !== undefined &&
                                    json.resources[i].x !== null &&
                                    json.resources[i].x !== void 0
                                        ? json.resources[i].x
                                        : 0,
                                y:
                                    json.resources[i].y !== undefined &&
                                    json.resources[i].y !== null &&
                                    json.resources[i].y !== void 0
                                        ? json.resources[i].y
                                        : 0,
                                cols: json.resources[i].cols,
                            },
                            true,
                        );
                    }
                }
            };
            img_split.src = fs_js.read_file(img, "buffer");
        }
    }
    fs_js.execution_out(dir_sys);
    Console.WriteLine(color.fggreen_string("◉ " + localization("execution_actual_size") + ": ") + count_images_split);
}

export default atlas_split_advanced;
