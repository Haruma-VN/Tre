"use strict";
import fs_js from "../../../../library/fs/implement.js";
import XMLMapping from "xml-mapping";
import xmlButPrettier from "xml-but-prettier";
import parseImageXML from "./parse_image_xml.js";
import parseSpriteXML from "./parse_sprite_xml.js";
import parseDOMDocument from "./parse_dom_document.js";
export default function (folder_xfl_path: string) {
    const extra_json: any = fs_js.read_json(`${folder_xfl_path}/extra.json`);
    const dom_document = XMLMapping.load(xmlButPrettier(fs_js.read_file(`${folder_xfl_path}/DOMDocument.xml`, "utf8")));
    const frame_rate: number = Number(dom_document.DOMDocument.frameRate);
    const width: number = Number(dom_document.DOMDocument.width);
    const height: number = Number(dom_document.DOMDocument.height);
    const image: Array<{
        name: any;
        size: any;
        transform: number[];
    }> = new Array();
    const sprite = new Array();
    extra_json.image.map(function (item: string, index: number) {
        image.push(
            parseImageXML(
                XMLMapping.load(
                    xmlButPrettier(fs_js.read_file(`${folder_xfl_path}/LIBRARY/image/image_${index + 1}.xml`, "utf8")),
                ),
                index,
                item,
                `${folder_xfl_path}/LIBRARY/image/image_${index + 1}.xml`,
            ),
        );
    });
    extra_json.sprite.map(function (item: string, index: number) {
        sprite.push(
            parseSpriteXML(
                XMLMapping.load(
                    xmlButPrettier(
                        fs_js.read_file(`${folder_xfl_path}/LIBRARY/sprite/sprite_${index + 1}.xml`, "utf8"),
                    ),
                ),
                index,
                (item as any).name,
                frame_rate,
                `${folder_xfl_path}/LIBRARY/sprite/sprite_${index + 1}.xml`,
            ),
        );
    });
    const main_sprite: any = parseSpriteXML(
        XMLMapping.load(xmlButPrettier(fs_js.read_file(`${folder_xfl_path}/LIBRARY/main_sprite.xml`, "utf8"))),
        -1,
        "main_sprite",
        frame_rate,
        `${folder_xfl_path}/LIBRARY/main_sprite.xml`,
    );
    parseDOMDocument(
        dom_document,
        main_sprite.frame,
        main_sprite.work_area[1] - 1,
        `${folder_xfl_path}/DOMDocument.xml`,
    );
    return {
        version: extra_json.version,
        frame_rate: frame_rate,
        position: extra_json.position,
        size: [width, height],
        image,
        sprite,
        main_sprite,
    };
}
