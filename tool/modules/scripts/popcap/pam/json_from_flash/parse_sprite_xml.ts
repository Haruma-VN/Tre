"use strict";
import transformCalculator from "./transform_calculator.js";
import parse_transform from "./parse_transform.js";
import parse_color from "./parse_color.js";
import localization from "../../../../callback/localization.js";
import { SpriteXMLError } from "../../../../implement/error.js";

export default function (sprite_xml: any, index: number, sprite_name: string, frame_rate: number, file_path: string) {
    if (sprite_xml.DOMSymbolItem.name != (index == -1 ? "main_sprite" : `sprite/sprite_${index + 1}`)) {
        throw new SpriteXMLError(sprite_name + localization("sprite_invalid_name"), file_path);
    }
    if (Object.keys(sprite_xml.DOMSymbolItem.timeline).length != 1) {
        throw new SpriteXMLError(sprite_name + localization("sprite_timeline_invalid"), file_path);
    }
    if (sprite_xml.DOMSymbolItem.timeline.DOMTimeline.name != (index == -1 ? "main_sprite" : `sprite_${index + 1}`)) {
        throw new SpriteXMLError(sprite_name + localization("sprite_invalid_name_timeline"), file_path);
    }
    if (Object.keys(sprite_xml.DOMSymbolItem.timeline.DOMTimeline.layers).length != 1) {
        throw new SpriteXMLError(sprite_name + localization("sprite_invalid_layers"), file_path);
    }
    let model: any = null;
    let result: any = new Array();
    let DOMlayer_list = new Array();
    if (Array.isArray(sprite_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer)) {
        DOMlayer_list = sprite_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer;
    } else {
        DOMlayer_list.push(sprite_xml.DOMSymbolItem.timeline.DOMTimeline.layers.DOMLayer);
    }
    DOMlayer_list.reverse();
    let layer_count = 0;
    function get_frame_at_index(index: number) {
        if (result.length <= index) {
            result.concat(result[index - result.length + 1]);
        }
        if (result[index] == undefined) {
            result[index] = {
                label: null,
                stop: false,
                command: [],
                remove: [],
                append: [],
                change: [],
            };
        }
        return result[index];
    }

    function close_current_model() {
        if (model != null) {
            let target_frame = get_frame_at_index(model.frame_start + model.frame_duration);
            target_frame.remove.push({
                index: model.index,
            });
            model = null;
        }
    }
    DOMlayer_list.forEach(function (x_DOMLayer) {
        if (Object.keys(x_DOMLayer.frames).length != 1) {
            throw new SpriteXMLError(sprite_name + " - " + localization("sprite_invalid_frames"), file_path);
        }
        let x_DOMFrame_list = new Array();
        if (Array.isArray(x_DOMLayer.frames.DOMFrame)) {
            x_DOMFrame_list = x_DOMLayer.frames.DOMFrame;
        } else {
            x_DOMFrame_list.push(x_DOMLayer.frames.DOMFrame);
        }
        x_DOMFrame_list.forEach(function (x_DOMFrame) {
            const frame_index = Number(x_DOMFrame.index);
            const frame_duration = parseInt(Number(x_DOMFrame.duration ?? 1) as any);
            let transform = new Array();
            let color = new Array();
            const x_elements_list = x_DOMFrame.elements;
            if (Object.keys(x_elements_list).length == 0) {
                close_current_model();
                return;
            }
            if (Object.keys(x_elements_list).length != 1) {
                throw new SpriteXMLError(sprite_name + " - " + localization("sprite_invalid_elements"), file_path);
            }
            const x_DOMSymbolInstance_list = [x_elements_list.DOMSymbolInstance];
            if (x_DOMSymbolInstance_list[0] == undefined) {
                return;
            }
            if (x_DOMSymbolInstance_list.length != 1) {
                throw new SpriteXMLError(
                    sprite_name + " - " + localization("sprite_invalid_DOMSymbolInstance"),
                    file_path,
                );
            }
            const x_DOMSymbolInstance = x_DOMSymbolInstance_list[0];
            const name_match = x_DOMSymbolInstance.libraryItemName.match(/(image|sprite)\/(image|sprite)_([0-9]+)/);
            if (name_match[0] == undefined) {
                throw new SpriteXMLError(sprite_name + " - " + localization("sprite_invalid_name"), file_path);
            }
            if (name_match[1] != name_match[2]) {
                throw new SpriteXMLError(sprite_name + " - " + localization("sprite_invalid_name_x"), file_path);
            }
            let current_instance = {
                resource: Number(name_match[3]) - 1,
                sprite: name_match[2] == "sprite",
            };
            {
                if (x_DOMSymbolInstance.matrix == undefined || Object.keys(x_DOMSymbolInstance.matrix).length == 0) {
                    transform = [0, 0];
                } else if (Object.keys(x_DOMSymbolInstance.matrix).length == 1) {
                    const x_matrix = [x_DOMSymbolInstance.matrix.Matrix];
                    if (x_matrix.length != 1 || x_matrix[0] == undefined) {
                        throw new SpriteXMLError(
                            sprite_name + " - " + localization("sprite_invalid_matrix"),
                            file_path,
                        );
                    }
                    transform = transformCalculator(parse_transform(x_matrix[0]));
                } else {
                    throw new SpriteXMLError(sprite_name + " - " + localization("sprite_invalid_append"), file_path);
                }
            }
            {
                if (x_DOMSymbolInstance.color == undefined || Object.keys(x_DOMSymbolInstance.color).length == 0) {
                    color = [0, 0];
                } else if (Object.keys(x_DOMSymbolInstance.color).length == 1) {
                    const x_color = [x_DOMSymbolInstance.color.Color];
                    if (x_color[0] == undefined || x_color.length != 1) {
                        throw new SpriteXMLError(sprite_name + " - " + localization("sprite_invalid_color"), file_path);
                    }
                    color = parse_color(x_color[0]);
                } else {
                    throw new SpriteXMLError(sprite_name + " - " + localization("sprite_invalid_color"), file_path);
                }
            }
            let target_frame = get_frame_at_index(frame_index);
            if (model == null) {
                model = {
                    index: layer_count,
                    resource: current_instance.resource,
                    sprite: current_instance.sprite,
                    frame_start: frame_index,
                    frame_duration: frame_duration,
                    color: [1, 1, 1, 1],
                };
                target_frame.append.push({
                    index: model.index,
                    name: null,
                    resource: current_instance.resource,
                    sprite: current_instance.sprite,
                    additive: false,
                    preload_frame: 0,
                    time_scale: 1,
                });
                layer_count++;
            } else {
                if (current_instance.resource != model.resource || current_instance.sprite != model.sprite) {
                    throw new SpriteXMLError(sprite_name + " - " + localization("sprite_invalid_model"), file_path);
                }
            }
            model.frame_start = frame_index;
            model.frame_duration = frame_duration;
            const color_is_changed = !(
                model.color[0] == color[0] &&
                model.color[1] == color[1] &&
                model.color[2] == color[2] &&
                model.color[3] == color[3]
            );
            if (color_is_changed) {
                model.color = color;
            }
            target_frame.change.push({
                index: model.index,
                transform: transform,
                color: color_is_changed ? color : null,
                sprite_frame_number: null,
                source_rectangle: null,
            });
        });
        close_current_model();
    });
    for (let i = 0; i < result.length; i++) {
        if (result[i] == undefined) {
            result[i] = {
                label: null,
                stop: false,
                command: [],
                remove: [],
                append: [],
                change: [],
            };
        }
    }
    result.splice(result.length - 1, 1);
    return {
        name: sprite_name,
        description: "",
        frame_rate: frame_rate,
        work_area: [0, result.length],
        frame: result,
    };
}
