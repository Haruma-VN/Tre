"use strict";
import writeSpriteXfl from "../json_to_flash/write_spritexfl.js";
import parse_transform from "../flash_to_json/parse_transform.js";
import parse_color from "../flash_to_json/parse_color.js";
export default function (pam_sprite: string[], image_list: string[]) {
    const layer_sprite_list = new Array();
    for (let i = 0; i < pam_sprite.length; i++) {
        const frame_node_list = writeSpriteXfl(
            pam_sprite[i],
            pam_sprite,
            i,
            true
        );
        const sprite_list = new Array();
        for (const layer_index of Object.keys(frame_node_list)) {
            const DOMLayer = structuredClone(frame_node_list[layer_index]);
            for (const frame_object of DOMLayer) {
                const DOMSymbolInstance =
                    frame_object.elements.DOMSymbolInstance;
                if (DOMSymbolInstance !== undefined) {
                    const name_match = DOMSymbolInstance.libraryItemName.match(
                        /(image|sprite)\/(image|sprite)_([0-9]+)/
                    );
                    const resource = Number(name_match[3]) - 1;
                    const sprite_type = name_match[2] === "sprite";
                    const transform = parse_transform(
                        DOMSymbolInstance.matrix.Matrix
                    );
                    const color = parse_color(
                        DOMSymbolInstance.color.Color
                    ).map((color_channel) => color_channel * 255);
                    const frame_sprite_list = sprite_type
                        ? structuredClone(layer_sprite_list[resource])
                        : structuredClone(image_list[resource]);
                    for (let i = 0; i < frame_sprite_list.length; i++) {
                        const frame_sprite = frame_sprite_list[i];
                        if (frame_sprite.transform === undefined) {
                            frame_sprite.transform = new Array();
                        }
                        if (frame_sprite.color === undefined) {
                            frame_sprite.color = new Array();
                        }
                        frame_sprite.transform.push(transform);
                        frame_sprite.color.push(color);
                        sprite_list.push(frame_sprite);
                    }
                }
            }
        }
        layer_sprite_list.push(sprite_list);
    }
    return layer_sprite_list;
}
