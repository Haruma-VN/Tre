"use strict";
import sourceAtt from "./xml_head_attribute.js";
export default function (name: string, index: number, reslution: string) {
  let source_xml = sourceAtt();
  source_xml.DOMSymbolItem.name = `source/source_${index + 1}`;
  const timeline = {
    DOMTimeline: {
      name: `source_${index + 1}`,
      layers: {
        DOMLayer: {
          frames: {
            DOMFrame: {
              index: "0",
              elements: {
                DOMBitmapInstance: {
                  libraryItemName: `media/${name.split("|")[0]}`,
                  matrix: {
                    Matrix: {
                      a: reslution,
                      d: reslution,
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
  source_xml.DOMSymbolItem.timeline = timeline;
  return source_xml;
}
