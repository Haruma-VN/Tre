"use strict";
import XMLMapping from "xml-mapping";
import xmlButPrettier from "xml-but-prettier";
import fs_js from "../../../../library/fs/implement.js";
import localization from "../../../../callback/localization.js";
export default function (folder_input: string, texture_reslution: number) {
    const reslution = parseFloat((1200 / texture_reslution) as any).toFixed(6);
    const source_list = fs_js.full_reader(`${folder_input}/LIBRARY/source`);
    source_list.forEach(function (source: any) {
        let xml_source = XMLMapping.load(
            xmlButPrettier(fs_js.read_file(source, "utf8"))
        );
        let image_reslution =
            xml_source.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames
                .DOMFrame.elements.DOMBitmapInstance.matrix.Matrix;
        if (image_reslution === undefined) {
            throw new Error(localization("invaild_image_reslution"));
        }
        image_reslution.a = reslution;
        image_reslution.d = reslution;
        fs_js.outfile_fs(source, xmlButPrettier(XMLMapping.dump(xml_source)));
    });
}
