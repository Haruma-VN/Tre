"use strict";
import dimension from "../../../../library/img/dimension/dimension.js";
import fs_js from "../../../../library/fs/implement.js";
import template_source from "../template/source.js";
import template_image from "../template/image.js";
import XMLMapping from "xml-mapping";
import xmlButPrettier from "xml-but-prettier";
/**
 *
 * @param additional_media - Additional media pngs
 * @param xfl_path - Pass XFL folder path
 * @param animation_resize
 * Pass resize, it should be 1536, 768, 384, 640 or 1200
 * @abstract
 * The game was based on 1200, so 1200 should not be changed
 */
async function add_content(
    additional_media: Array<string>,
    xfl_path: string,
    animation_resize: 1536 | 768 | 384 | 640 | 1200
): Promise<void> {
    const append_media: Array<{
        width: number;
        height: number;
        img_path: string;
    }> = new Array();
    for (const img of additional_media) {
        const additional_media_helper_dimension: {
            width: number;
            height: number;
        } = await dimension(img);
        append_media.push({
            ...additional_media_helper_dimension,
            img_path: img,
        });
    }
    const extra_json: {
        version: number;
        position: [number, number];
        image: Array<{
            name: string;
            size: [number, number];
        }>;
        sprite: Array<{
            name: string;
        }>;
        main_sprite: {
            name: string;
        };
    } = fs_js.read_json(`${xfl_path}/extra.json`) as any;
    fs_js.copy_manifest(`${xfl_path}`);
    const manifest_json: resource_build = fs_js.read_json(
        `${xfl_path}/resource_build.json`
    ) as any;
    fs_js.delete_resource_build(`${xfl_path}`);
    const original_size_of_image: number = extra_json.image.length;
    const original_size_of_sprite: number = extra_json.sprite.length;
    const flash_animation_resize: number = 1200 / animation_resize;
    const DOMDocument_path: string = `${xfl_path}/DOMDocument.xml`;
    const dom_document: dom_document = XMLMapping.load(
        xmlButPrettier(fs_js.read_file(`${DOMDocument_path}`, "utf8"))
    ) as any;
    const dom_document_source: Array<Include> =
        dom_document.DOMDocument.symbols.Include.filter((a) => {
            return a.href.includes(`source`);
        });
    const dom_document_image: Array<Include> =
        dom_document.DOMDocument.symbols.Include.filter((a) => {
            return a.href.includes(`image`);
        });
    const dom_document_sprite: Array<Include> =
        dom_document.DOMDocument.symbols.Include.filter((a) => {
            return a.href.includes(`sprite`) && !a.href.includes(`main_sprite`);
        });
    const dom_document_main_sprite: Array<Include> =
        dom_document.DOMDocument.symbols.Include.filter((a) => {
            return a.href.includes(`main_sprite`);
        });
    for (let i = 0; i < append_media.length; ++i) {
        const append_media_name: string = fs_js.parse_fs(
            append_media[i].img_path
        ).name;
        const index_of_sprite: number = original_size_of_image + i + 1;
        extra_json.image.push({
            name: `${append_media_name}|${`${manifest_json.extend_id}${append_media_name}`.toUpperCase()}`,
            size: [
                Math.ceil(append_media[i].width * flash_animation_resize),
                Math.ceil(append_media[i].height * flash_animation_resize),
            ],
        });
        dom_document.DOMDocument.media.DOMBitmapItem.push({
            name: `media/${append_media_name}`,
            href: `media/${append_media_name}.png`,
        });
        dom_document_source.push({
            href: `source/source_${index_of_sprite}.xml`,
        });
        dom_document_image.push({
            href: `image/image_${index_of_sprite}.xml`,
        });
        fs_js.outfile_fs(
            `${xfl_path}/LIBRARY/source/source_${index_of_sprite}.xml`,
            template_source(
                index_of_sprite,
                append_media_name,
                flash_animation_resize
            )
        );
        fs_js.outfile_fs(
            `${xfl_path}/LIBRARY/image/image_${index_of_sprite}.xml`,
            template_image(index_of_sprite, {
                tx: 0,
                ty: 0,
            })
        );
        fs_js.fs_copy(
            append_media[i].img_path,
            `${xfl_path}/LIBRARY/media/${
                fs_js.parse_fs(append_media[i].img_path).base
            }`
        );
    }
    dom_document.DOMDocument.symbols.Include = [
        ...dom_document_source,
        ...dom_document_image,
        ...dom_document_sprite,
        ...dom_document_main_sprite,
    ];
    fs_js.js_remove(DOMDocument_path);
    fs_js.outfile_fs(
        DOMDocument_path,
        xmlButPrettier(XMLMapping.dump(dom_document))
    );
    fs_js.js_remove(`${xfl_path}/extra.json`);
    fs_js.write_json(`${xfl_path}/extra.json`, extra_json);
    fs_js.delete_resource_build(`${xfl_path}`);
}

export default add_content;
