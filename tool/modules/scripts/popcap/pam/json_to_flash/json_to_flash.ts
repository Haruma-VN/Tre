"use strict";
import fs_js from "../../../../library/fs/implement.js";
import XMLMapping from "xml-mapping";
import xmlButPrettier from "xml-but-prettier";
import writeExtraJson from "./write_extrajson.js";
import writeSourceXfl from "./write_sourcexfl.js";
import writeImageXfl from "./write_imagexfl.js";
import writeSpriteXfl from "./write_spritexfl.js";
import writeDomDocument from "./write_domdocument.js";
export default function (animation_json: any, animation_path: string, texture_reslution: number, is_notify: boolean) {
    const pamxfl_folder = `${fs_js.parse_fs(animation_path).dir}/${fs_js.parse_fs(animation_path).name}.xfl`;
    const reslution = parseFloat((1200 / texture_reslution) as any).toFixed(6);
    if (is_notify) {
        fs_js.execution_out(pamxfl_folder);
    }
    for (let i = 0; i < animation_json.image.length; i++) {
        const source_document = writeSourceXfl(animation_json.image[i].name, i, reslution);
        const source_document_xml_pretty = xmlButPrettier(XMLMapping.dump(source_document));
        fs_js.outfile_fs(`${pamxfl_folder}/LIBRARY/source/source_${i + 1}.xml`, source_document_xml_pretty, true);
        const image_document = writeImageXfl(animation_json.image[i], i);
        const image_document_xml_pretty = xmlButPrettier(XMLMapping.dump(image_document));
        fs_js.outfile_fs(`${pamxfl_folder}/LIBRARY/image/image_${i + 1}.xml`, image_document_xml_pretty, true);
    }
    for (let k = 0; k < animation_json.sprite.length; k++) {
        const sprite_document = writeSpriteXfl(animation_json.sprite[k], animation_json.sprite, k);
        const sprite_document_xml_pretty = xmlButPrettier(XMLMapping.dump(sprite_document));
        fs_js.outfile_fs(`${pamxfl_folder}/LIBRARY/sprite/sprite_${k + 1}.xml`, sprite_document_xml_pretty, true);
    }
    const main_sprite_document = writeSpriteXfl(animation_json.main_sprite, animation_json.sprite, -1);
    const main_sprite_document_xml_pretty = xmlButPrettier(XMLMapping.dump(main_sprite_document));
    fs_js.outfile_fs(`${pamxfl_folder}/LIBRARY/main_sprite.xml`, main_sprite_document_xml_pretty, true);
    const dom_document = writeDomDocument(animation_json);
    const dom_document_xml_pretty = xmlButPrettier(XMLMapping.dump(dom_document));
    fs_js.outfile_fs(`${pamxfl_folder}/DOMDocument.xml`, dom_document_xml_pretty, true);
    fs_js.outfile_fs(`${pamxfl_folder}/main.xfl`, Buffer.from("PROXY-CS5", "utf-8"), true);
    const extrajson = writeExtraJson(animation_json);
    if (!fs_js.js_exists(`${pamxfl_folder}/media`)) {
        fs_js.create_directory(`${pamxfl_folder}/LIBRARY/media`);
    }
    fs_js.write_json(`${pamxfl_folder}/extra.json`, extrajson, true);
    return;
}
