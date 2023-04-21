"use strict";
import localization from "../../../../callback/localization.js";
export default function (dom_document: any, main_sprite: any) {
    if (Object.keys(dom_document)[0] != "DOMDocument") {
        throw new Error(localization("DOMDocument_invalid"));
    }
    if (Object.keys(dom_document.DOMDocument.media).length != 1) {
        throw new Error(localization("DOMDocument_invalid_media"));
    }
    if (Object.keys(dom_document.DOMDocument.symbols).length != 1) {
        throw new Error(localization("DOMDocument_invalid_symbols"));
    }
    if (Object.keys(dom_document.DOMDocument.timelines).length != 1) {
        throw new Error(localization("DOMDocument_invalid_timelines"));
    }
    const x_DOMTimeline = dom_document.DOMDocument.timelines.DOMTimeline;
    if (typeof x_DOMTimeline.name !== "string" &&
        x_DOMTimeline.name !== "animation") {
        throw new Error(localization("DOMDocument_invalid_name"));
    }
    if (Object.keys(x_DOMTimeline.layers).length != 1) {
        throw new Error(localization("DOMDocument_invalid_layers"));
    }
    const x_DOMLayer_list = x_DOMTimeline.layers.DOMLayer;
    if (x_DOMLayer_list.length != 3) {
        throw new Error(localization("DOMDocument_invalid_DOMLayer"));
    }
    if (Object.keys(x_DOMLayer_list[0].frames).length != 1) {
        throw new Error(localization("DOMDocument_invalid_flow"));
    }
    let DOMFrame_flow_list = new Array();
    if (Array.isArray(x_DOMLayer_list[0].frames.DOMFrame)) {
        DOMFrame_flow_list = x_DOMLayer_list[0].frames.DOMFrame;
    }
    else {
        DOMFrame_flow_list.push(x_DOMLayer_list[0].frames.DOMFrame);
    }
    DOMFrame_flow_list.forEach(function (x_DOMFrame) {
        const frame_index = x_DOMFrame.index;
        if (x_DOMFrame.name != undefined) {
            if (x_DOMFrame.labelType != "name") {
                throw new Error(localization("DOMDocument_invalid_labelType"));
            }
            main_sprite[frame_index].label = x_DOMFrame.name;
        }
        let x_Actionscript = x_DOMFrame.Actionscript;
        if (x_Actionscript == undefined) {
            return;
        }
        if (Object.keys(x_Actionscript).length != 1) {
            throw new Error(localization("DOMDocument_invalid_Actionscript"));
        }
        if (Object.keys(x_Actionscript.script).length != 1) {
            throw new Error(localization("DOMDocument_invalid_script"));
        }
        if (Object.keys(x_Actionscript.script)[0] != "$cd") {
            throw new Error(localization("DOMDocument_invalid_CDATA_script"));
        }
        if (x_Actionscript.script.$cd.trim() != "stop();") {
            throw new Error(localization("DOMDocument_invalid_stop_event"));
        }
        main_sprite[frame_index].stop = true;
    });
    if (Object.keys(x_DOMLayer_list[1].frames).length != 1) {
        throw new Error(localization("DOMDocument_invalid_command"));
    }
    let DOMFrame_command_list = new Array();
    if (Array.isArray(x_DOMLayer_list[1].frames.DOMFrame)) {
        DOMFrame_command_list = x_DOMLayer_list[1].frames.DOMFrame;
    }
    else {
        DOMFrame_command_list.push(x_DOMLayer_list[1].frames.DOMFrame);
    }
    DOMFrame_command_list.forEach(function (x_DOMFrame) {
        const frame_index = x_DOMFrame.index;
        let x_Actionscript = x_DOMFrame.Actionscript;
        if (x_Actionscript == undefined) {
            return;
        }
        if (Object.keys(x_Actionscript).length != 1) {
            throw new Error(localization("DOMDocument_invalid_Actionscript"));
        }
        if (Object.keys(x_Actionscript.script).length != 1) {
            throw new Error(localization("DOMDocument_invalid_script"));
        }
        if (Object.keys(x_Actionscript.script)[0] != "$cd") {
            throw new Error(localization("DOMDocument_invalid_CDATA_script"));
        }
        const command_string = x_Actionscript.script.$cd.trim().split("\n");
        for (let command of command_string) {
            const regex_result = command.trim().match(/fscommand\("(.*)", "(.*)"\);/);
            if (regex_result == undefined) {
                throw new Error(localization("DOMDocument_invalid_command"));
            }
            main_sprite[frame_index].command.push([
                regex_result[1],
                regex_result[2],
            ]);
        }
    });
    if (Object.keys(x_DOMLayer_list[2].frames).length != 1) {
        throw new Error(localization("DOMDocument_invalid_sprite"));
    }
    if (Object.keys(x_DOMLayer_list[2].frames.DOMFrame.elements).length != 1) {
        throw new Error(localization("DOMDocument_invalid_sprite_elements"));
    }
    if (x_DOMLayer_list[2].frames.DOMFrame.elements.DOMSymbolInstance.libraryItemName != 'main_sprite') {
        throw new Error(localization("DOMDocument_invalid_libraryItemName"));
    }
    return main_sprite;
}
