"use strict";
import transformCalculator from "./transform_calculator.js";
import spriteAtt from "./xml_head_attribute.js";
export default function (sprite: any, sub_sprite: any, index: number) {
  let model:any = new Object();
  let frame_node_list: any = new Object();
  sprite.frame.map((frame: any, frame_index: number) => {
    for (let remove of frame.remove) {
      model[remove.index].state = false;
    }
    for (let append of frame.append) {
      model[append.index] = {
        state: null,
        resource: append.resource,
        sprite: append.sprite,
        transform: [1, 0, 0, 1, 0, 0],
        color: [1, 1, 1, 1],
        frame_start: frame_index,
        frame_duration: frame_index,
      };
      frame_node_list[append.index] = new Array();
      if (frame_index > 0) {
        frame_node_list[append.index].push({
            index: 0,
            duration: frame_index,
            elements: {},
        });
      }
    }
    for (let change of frame.change) {
      let layer = model[change.index];
      layer.state = true;
      layer.transform = transformCalculator(change.transform);
      if (change.color != null) {
        layer.color = change.color;
      }
    }
    for (let layer_index of Object.keys(model)) {
      let layer = model[layer_index];
      let frame_node = frame_node_list[layer_index];
      let frame_count = frame_node.length;
      if (layer.state != null) {
        if (frame_count > 0) {
          frame_node[frame_count - 1].duration = layer.frame_duration;
        }
      }
      if (layer.state) {
        let frame_array = !layer.sprite
          ? {
              index: frame_index,
              duration: "",
              elements: {
                DOMSymbolInstance: {
                  libraryItemName: `image/image_${layer.resource + 1}`,
                  symbolType: "graphic",
                  loop: "loop",
                  matrix: {
                    Matrix: {
                      a: layer.transform[0].toFixed(6),
                      b: layer.transform[1].toFixed(6),
                      c: layer.transform[2].toFixed(6),
                      d: layer.transform[3].toFixed(6),
                      tx: layer.transform[4].toFixed(6),
                      ty: layer.transform[5].toFixed(6),
                    },
                  },
                  color: {
                    Color: {
                      redMultiplier: layer.color[0].toFixed(6),
                      greenMultiplier: layer.color[1].toFixed(6),
                      blueMultiplier: layer.color[2].toFixed(6),
                      alphaMultiplier: layer.color[3].toFixed(6),
                    },
                  },
                },
              },
            }
          : {
              index: frame_index,
              duration: "",
              elements: {
                DOMSymbolInstance: {
                  libraryItemName: `sprite/sprite_${layer.resource + 1}`,
                  symbolType: "graphic",
                  loop: "loop",
                  firstFrame:
                    (frame_index - layer.frame_start) %
                    sub_sprite[layer.resource].frame.length,
                  matrix: {
                    Matrix: {
                      a: layer.transform[0].toFixed(6),
                      b: layer.transform[1].toFixed(6),
                      c: layer.transform[2].toFixed(6),
                      d: layer.transform[3].toFixed(6),
                      tx: layer.transform[4].toFixed(6),
                      ty: layer.transform[5].toFixed(6),
                    },
                  },
                  color: {
                    Color: {
                      redMultiplier: layer.color[0].toFixed(6),
                      greenMultiplier: layer.color[1].toFixed(6),
                      blueMultiplier: layer.color[2].toFixed(6),
                      alphaMultiplier: layer.color[3].toFixed(6),
                    },
                  },
                },
              },
            };
        frame_node.push(frame_array);
        layer.state = null;
        layer.frame_duration = 0;
      }
      if (layer.state == false) {
        delete model[layer_index];
      }
      frame_node_list[layer_index] = frame_node;
      layer.frame_duration++;
    }
  });
  let sprite_xml = spriteAtt();
  for (let layer_index of Object.keys(model)) {
    let layer = model[layer_index];
    let frame_node = frame_node_list[layer_index];
    frame_node[frame_node.length - 1].duration = layer.frame_duration;
    delete model[layer_index];
  }
  sprite_xml.DOMSymbolItem.name =
    index == -1 ? "main_sprite" : `sprite/sprite_${index + 1}`;
  let DOMLayerSprite: any = new Object({ DOMLayer: [] });
  Object.keys(frame_node_list)
    .sort((a: any, b: any) => b - a)
    .map((layer_index) => {
      DOMLayerSprite.DOMLayer.push({
        name: Number(layer_index) + 1,
        frames: {
          DOMFrame: frame_node_list[layer_index],
        }
      });
    });
  const timeline = {
    DOMTimeline: {
      name: index == -1 ? "main_sprite" : `sprite_${index + 1}`,
      layers: DOMLayerSprite,
    },
  };
  sprite_xml.DOMSymbolItem.timeline = timeline;
  return sprite_xml;
}
