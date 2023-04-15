"use strict";
import parse_transform from "./parse_transform.js";
import parse_transform_origin from "./parse_transform_origin.js";
export default function (image_xml: any, index: number, item: any) {
  const image_name = item.name.split('|')[0];
  if (image_xml.DOMSymbolItem.name != `image/image_${index + 1}`) {
    throw new Error(image_name + " - image_invalid_name");
  }
  if (Object.keys(image_xml.DOMSymbolItem.timeline).length != 1) {
    throw new Error(image_name + " - image_invalid_timeline");
  }
  if (image_xml.DOMSymbolItem.timeline.DOMTimeline.name != `image_${index + 1}`) {
    throw new Error(image_name + " - image_invalid_name_timeline");
  }
  if (Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers).length != 1) {
    throw new Error(image_name + " - image_invalid_layers");
  }
  if (Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer).length != 1 && Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer).length != 4) {
    throw new Error(image_name + " - image_invalid_DOMLayer");
  }
  if (Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames).length != 1) {
    throw new Error(image_name + " - image_invalid_frames");
  }
  if (Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame).length != 2 && Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame).length != 3) {
    throw new Error(image_name + " - image_invalid_OMFrame");
  }
  if (Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame.elements).length != 1) {
    throw new Error(image_name + " - image_invalid_elements");
  }
  if (image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame.elements.DOMSymbolInstance.libraryItemName != `source/source_${index + 1}`) {
    throw new Error(image_name + " - image_invalid_libraryItemName");
  }
  if (Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame.elements.DOMSymbolInstance.matrix).length != 1) {
    throw new Error(image_name + " - image_invalid_matrix");
  }
  if (Object.keys(image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame.elements.DOMSymbolInstance.transformationPoint).length != 1) {
    throw new Error(image_name + " - image_invalid_transformationPoint");
  }
  const matrix =
    image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame
      .elements.DOMSymbolInstance.matrix.Matrix;
  const transform_point =
    image_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer.frames.DOMFrame
      .elements.DOMSymbolInstance.transformationPoint.Point;
  const transform = parse_transform(matrix);
  const transform_origin = parse_transform_origin(transform_point);
  if (transform[4] != -transform_origin[0] || transform[5] != -transform_origin[1]) {
    throw new Error(image_name + " - image_invalid_matrix");
  } else {
    return {
    name: item.name,
    size: item.size,
    transform}
  }
}
