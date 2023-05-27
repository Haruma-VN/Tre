"use strict";
import localization from "../../../../callback/localization.js";
import { ImageXMLError } from "../../../../implement/error.js";
import parse_transform from "./parse_transform.js";
import parse_transform_origin from "./parse_transform_origin.js";
export default function (image_xml: any, index: number, item: any, file_path: string) {
    const image_name = item.name.split("|")[0];
    if (image_xml.DOMSymbolItem.name != `image/image_${index + 1}`) {
        throw new ImageXMLError(`${image_name} - ${localization("image_invalid_name")}`, file_path);
    }
    if (Object.keys(image_xml.DOMSymbolItem.timeline).length != 1) {
        throw new ImageXMLError(`${image_name} - ${localization("image_invalid_timeline")}`, file_path);
    }
    if (image_xml.DOMSymbolItem.timeline.DOMTimeline.name != `image_${index + 1}`) {
        throw new ImageXMLError(`${image_name} - ${localization("image_invalid_name_timeline")}`, file_path);
    }
    if (Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers).length != 1) {
        throw new ImageXMLError(`${image_name} - ${localization("image_invalid_layers")}`, file_path);
    }
    if (
        Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer).length != 1 &&
        Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer).length != 4
    ) {
        throw new ImageXMLError(`${image_name} - ${localization("image_invalid_DOMLayer")}`, file_path);
    }
    if (Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames).length != 1) {
        throw new ImageXMLError(`${image_name} - ${localization("image_invalid_frames")}`, file_path);
    }
    if (
        Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame).length != 2 &&
        Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame).length != 3
    ) {
        throw new ImageXMLError(`${image_name} - ${localization("image_invalid_OMFrame")}`, file_path);
    }
    if (
        Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame.elements).length != 1
    ) {
        throw new ImageXMLError(`${image_name} - ${localization("image_invalid_elements")}`, file_path);
    }
    if (
        image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame.elements.DOMSymbolInstance
            .libraryItemName != `source/source_${index + 1}`
    ) {
        throw new ImageXMLError(`${image_name} - ${localization("image_invalid_libraryItemName")}`, file_path);
    }
    if (
        Object.keys(
            image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame.elements.DOMSymbolInstance
                .matrix,
        ).length != 1
    ) {
        throw new ImageXMLError(`${image_name} - ${localization("image_invalid_matrix")}`, file_path);
    }
    if (
        Object.keys(
            image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame.elements.DOMSymbolInstance
                .transformationPoint,
        ).length != 1
    ) {
        throw new ImageXMLError(`${image_name} - ${localization("image_invalid_transformationPoint")}`, file_path);
    }
    const matrix =
        image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame.elements.DOMSymbolInstance.matrix
            .Matrix;
    const transform_point =
        image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame.elements.DOMSymbolInstance
            .transformationPoint.Point;
    const transform = parse_transform(matrix);
    const transform_origin = parse_transform_origin(transform_point);
    if (transform[4] != -transform_origin[0] || transform[5] != -transform_origin[1]) {
        throw new ImageXMLError(`${image_name} - ${localization("image_invalid_matrix")}`, file_path);
    } else {
        return {
            name: item.name,
            size: item.size,
            transform,
        };
    }
}
