"use strict";
import localization from "../../../../callback/localization.js";
import { DOMDocumentError } from "../../../../implement/error.js";
export default function (dom_document: any, main_sprite: any, last_frame: number, file_path: string) {
    if (Object.keys(dom_document)[0] != "DOMDocument") {
        throw new DOMDocumentError(localization("DOMDocument_invalid"), file_path);
    }
    if (Object.keys(dom_document.DOMDocument.media).length != 1) {
        throw new DOMDocumentError(localization("DOMDocument_invalid_media"), file_path);
    }
    if (Object.keys(dom_document.DOMDocument.symbols).length != 1) {
        throw new DOMDocumentError(localization("DOMDocument_invalid_symbols"), file_path);
    }
    if (Object.keys(dom_document.DOMDocument.timelines).length != 1) {
        throw new DOMDocumentError(localization("DOMDocument_invalid_timelines"), file_path);
    }
    const x_DOMTimeline = dom_document.DOMDocument.timelines.DOMTimeline;
    if (typeof x_DOMTimeline.name !== "string" && x_DOMTimeline.name !== "animation") {
        throw new DOMDocumentError(localization("DOMDocument_invalid_name"), file_path);
    }
    if (Object.keys(x_DOMTimeline.layers).length != 1) {
        throw new DOMDocumentError(localization("DOMDocument_invalid_layers"), file_path);
    }
    const x_DOMLayer_list = x_DOMTimeline.layers.DOMLayer;
    if (x_DOMLayer_list.length != 3) {
        throw new DOMDocumentError(localization("DOMDocument_invalid_DOMLayer"), file_path);
    }
    if (Object.keys(x_DOMLayer_list[0].frames).length != 1) {
        throw new DOMDocumentError(localization("DOMDocument_invalid_flow"), file_path);
    }
    let DOMFrame_flow_list = new Array();
    if (Array.isArray(x_DOMLayer_list[0].frames.DOMFrame)) {
        DOMFrame_flow_list = x_DOMLayer_list[0].frames.DOMFrame;
    } else {
        DOMFrame_flow_list.push(x_DOMLayer_list[0].frames.DOMFrame);
    }
    DOMFrame_flow_list.forEach(function (x_DOMFrame) {
        const frame_index = x_DOMFrame.index;
        if (x_DOMFrame.name != undefined) {
            if (x_DOMFrame.labelType != "name") {
                throw new DOMDocumentError(localization("DOMDocument_invalid_labelType"), file_path);
            }
            main_sprite[frame_index].label = x_DOMFrame.name;
        }
        let x_Actionscript = x_DOMFrame.Actionscript;
        if (x_Actionscript == undefined) {
            return;
        }
        if (Object.keys(x_Actionscript).length != 1) {
            throw new DOMDocumentError(localization("DOMDocument_invalid_Actionscript"), file_path);
        }
        if (Object.keys(x_Actionscript.script).length != 1) {
            throw new DOMDocumentError(localization("DOMDocument_invalid_script"), file_path);
        }
        if (Object.keys(x_Actionscript.script)[0] != "$cd") {
            throw new DOMDocumentError(localization("DOMDocument_invalid_CDATA_script"), file_path);
        }
        if (x_Actionscript.script.$cd.trim() != "stop();") {
            throw new DOMDocumentError(localization("DOMDocument_invalid_stop_event"), file_path);
        }
        if (main_sprite[frame_index] !== undefined) {
            main_sprite[frame_index].stop = true;
        } else if (main_sprite[frame_index] === undefined && frame_index >= last_frame) {
            main_sprite[last_frame].stop = true;
        }
    });
    if (Object.keys(x_DOMLayer_list[1].frames).length != 1) {
        throw new DOMDocumentError(localization("DOMDocument_invalid_command"), file_path);
    }
    let DOMFrame_command_list = new Array();
    if (Array.isArray(x_DOMLayer_list[1].frames.DOMFrame)) {
        DOMFrame_command_list = x_DOMLayer_list[1].frames.DOMFrame;
    } else {
        DOMFrame_command_list.push(x_DOMLayer_list[1].frames.DOMFrame);
    }
    DOMFrame_command_list.forEach(function (x_DOMFrame) {
        const frame_index = x_DOMFrame.index;
        let x_Actionscript = x_DOMFrame.Actionscript;
        if (x_Actionscript == undefined) {
            return;
        }
        if (Object.keys(x_Actionscript).length != 1) {
            throw new DOMDocumentError(localization("DOMDocument_invalid_Actionscript"), file_path);
        }
        if (Object.keys(x_Actionscript.script).length != 1) {
            throw new DOMDocumentError(localization("DOMDocument_invalid_script"), file_path);
        }
        if (Object.keys(x_Actionscript.script)[0] != "$cd") {
            throw new DOMDocumentError(localization("DOMDocument_invalid_CDATA_script"), file_path);
        }
        const command_string = x_Actionscript.script.$cd.trim().split("\n");
        for (let command of command_string) {
            const regex_result = command.trim().match(/fscommand\("(.*)", "(.*)"\);/);
            if (regex_result == undefined) {
                throw new DOMDocumentError(localization("DOMDocument_invalid_command"), file_path);
            }
            main_sprite[frame_index].command.push([regex_result[1], regex_result[2]]);
        }
    });
    if (Object.keys(x_DOMLayer_list[2].frames).length != 1) {
        throw new DOMDocumentError(localization("DOMDocument_invalid_sprite"), file_path);
    }
    if (Object.keys(x_DOMLayer_list[2].frames.DOMFrame.elements).length != 1) {
        throw new DOMDocumentError(localization("DOMDocument_invalid_sprite_elements"), file_path);
    }
    if (x_DOMLayer_list[2].frames.DOMFrame.elements.DOMSymbolInstance.libraryItemName != "main_sprite") {
        throw new DOMDocumentError(localization("DOMDocument_invalid_libraryItemName"), file_path);
    }
    return main_sprite;
}
