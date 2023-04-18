"use strict";
import imageAtt from "./xml_head_attribute.js";
export default function (image: any, index: number) {
    let image_xml = imageAtt();
    image_xml.DOMSymbolItem.name = `image/image_${index + 1}`;
    const timeline = {
        DOMTimeline: {
            name: `image_${index + 1}`,
            layers: {
                DOMLayer: {
                    frames: {
                        DOMFrame: {
                            index: "0",
                            elements: {
                                DOMSymbolInstance: {
                                    libraryItemName: `source/source_${
                                        index + 1
                                    }`,
                                    symbolType: "graphic",
                                    loop: "loop",
                                    matrix: {
                                        Matrix: {
                                            a: image.transform[0].toFixed(6),
                                            b: image.transform[1].toFixed(6),
                                            c: image.transform[2].toFixed(6),
                                            d: image.transform[3].toFixed(6),
                                            tx: image.transform[4].toFixed(6),
                                            ty: image.transform[5].toFixed(6),
                                        },
                                    },
                                    transformationPoint: {
                                        Point: {
                                            x: (-image.transform[4]).toFixed(6),
                                            y: (-image.transform[5]).toFixed(6),
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    };
    image_xml.DOMSymbolItem.timeline = timeline;
    return image_xml;
}
