"use strict";
import fs_js from "../../../../library/fs/implement.js";
import { dimension } from "../../../../library/img/util.js";
import XMLMapping from "xml-mapping";
import xmlButPrettier from "xml-but-prettier";
import writeSourceXfl from "../json_to_flash/write_sourcexfl.js";
import writeImageXfl from "../json_to_flash/write_imagexfl.js";
import writeSpriteXfl from "../json_to_flash/write_spritexfl.js";
import { atlasinfo_conduct } from "../../../default/atlas_info/util.js";
import check_resources_build from "../gif/check_manifest_build.js";
import localization from "../../../../callback/localization.js";
import evaluate_modules_workspace_assertation from "../../../../callback/evaluate_modules_workspace_assertation.js";
import createSprite from "./create_sprite.js";
import { Console } from "../../../../callback/console.js";

export default async function (path: string, number_sprites: number) {
    const extra_json: any = fs_js.read_json(`${path}/extra.json`);
    const source_folder = fs_js.one_reader(`${path}/LIBRARY/media`);
    const subgroup = `${fs_js.parse_fs(path).name}`;
    const image_list = new Array();
    const filter_source_folder = source_folder
        .filter((image) => fs_js.parse_fs(image).ext.toUpperCase() === ".PNG")
        .map((image) => fs_js.parse_fs(image).name);
    for (let i = 0; i < extra_json.image.length; i++) {
        const image_name = extra_json.image[i].name.split("|")[0];
        image_list.push(image_name);
        if (!filter_source_folder.includes(image_name)) {
            throw new Error(`Missing ${image_name} in media folder`);
        }
    }
    let source_count = 0;
    let image_count = extra_json.image.length;
    let resource_build: any = {};
    if (filter_source_folder.length - image_count > 0) {
        resource_build = await check_resources_build(`${path}/LIBRARY/media`);
    }
    let xml_source = XMLMapping.load(xmlButPrettier(fs_js.read_file(`${path}/LIBRARY/source/source_1.xml`, "utf8")));
    const image_reslution =
        xml_source.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame.elements.DOMBitmapInstance.matrix
            .Matrix.a;
    let atlas_reslution = 1200;
    const texture_reslution = [384, 640, 768, 1200, 1536];
    for (let reslution of texture_reslution) {
        if (reslution * image_reslution === atlas_reslution) {
            Console.WriteLine(reslution);
            atlas_reslution = reslution;
            break;
        }
    }
    for (let k = 0; k < filter_source_folder.length; k++) {
        if (!image_list.includes(filter_source_folder[k])) {
            source_count++;
            const source_dimension = await dimension(`${path}/LIBRARY/media/${filter_source_folder[k]}.png`);
            const image: {
                name: string;
                size: [number, number];
                transform?: [number, number, number, number, number, number];
            } = {
                name: `${filter_source_folder[k]}|${resource_build.extend_id.toUpperCase()}${filter_source_folder[
                    k
                ].toUpperCase()}`,
                size: [source_dimension.width, source_dimension.height],
                transform: [
                    resource_build.scale_ratio,
                    0,
                    0,
                    resource_build.scale_ratio,
                    resource_build.position_x,
                    resource_build.position_y,
                ],
            };
            const source_document = writeSourceXfl(`${filter_source_folder[k]}|_`, image_count++, image_reslution);
            const source_document_xml_pretty = xmlButPrettier(XMLMapping.dump(source_document));
            fs_js.outfile_fs(`${path}/LIBRARY/source/source_${image_count + 1}.xml`, source_document_xml_pretty);
            const image_document = writeImageXfl(image, image_count);
            const image_document_xml_pretty = xmlButPrettier(XMLMapping.dump(image_document));
            fs_js.outfile_fs(`${path}/LIBRARY/image/image_${image_count}.xml`, image_document_xml_pretty);
            delete image.transform;
            extra_json.image.push(image);
        }
    }
    let sprite_count = extra_json.sprite.length;
    const sprite_length = number_sprites + sprite_count;
    const sprite_list = createSprite(sprite_length, sprite_count + 1, "blank_sprite_");
    for (let sprite of sprite_list) {
        extra_json.sprite.push({ name: sprite.name });
    }
    for (let h = sprite_count; h < sprite_length; h++) {
        const sprite_document = writeSpriteXfl(sprite_list[h - sprite_count], extra_json.sprite, h);
        const sprite_document_xml_pretty = xmlButPrettier(XMLMapping.dump(sprite_document));
        fs_js.outfile_fs(`${path}/LIBRARY/sprite/sprite_${h + 1}.xml`, sprite_document_xml_pretty);
    }
    if (source_count !== 0) {
        const resource_build_json_directory = `${path}/LIBRARY/media/resource_build.json`;
        atlasinfo_conduct(
            `${path}/LIBRARY/media`,
            `${path}/LIBRARY/media/Atlasinfo.json`,
            fs_js.read_json(resource_build_json_directory),
            false,
            `${subgroup}_${atlas_reslution}`,
        );
        fs_js.js_remove(resource_build_json_directory);
        fs_js.execution_status("success", localization("deleted_resource_build_json"));
        await evaluate_modules_workspace_assertation(`${path}/LIBRARY/media`, "popcap_atlas_pack_cross_resolution");
        fs_js.execution_status("success", `added ${source_count} images`);
    }
    if (number_sprites !== 0) {
        fs_js.execution_status("success", `added ${number_sprites} sprites`);
    } else if (source_count === 0 && source_count === 0) {
        fs_js.execution_status("success", `nothing changed`);
    }
    fs_js.write_json(`${path}/extra.json`, extra_json);
}
