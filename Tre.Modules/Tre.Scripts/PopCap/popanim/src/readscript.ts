"use strict";
import OutChecker from "./outchecker.js";
import ReadBuffer from "./readbuffer.js";
interface ReadScript {
    FSCmd?: { CmdName: string, Arg: string }[]
}
export default function (reader: ReadBuffer, currentFrame: ReadScript) {
    let scrKey: number = reader.ReadByte();
    let keep: boolean = true;
    if (scrKey == 0x01 || scrKey == 0x02) {
        currentFrame.FSCmd = new Array();
        while (keep) {
            let cmdLength: number = reader.ReadInt16();
            let cmdName: string = reader.ReadBytes(cmdLength);
            if (/^[\w|\x20]+$/.test(cmdName)) {
                if (currentFrame.FSCmd != undefined && currentFrame.FSCmd != null) {
                    currentFrame.FSCmd.push({
                        CmdName: cmdName,
                        Arg: reader.ReadBytes(reader.ReadInt16()).toString()
                    });
                }
            } else {
                if (currentFrame.FSCmd != undefined && currentFrame.FSCmd != null) {
                    if (!currentFrame.FSCmd.length) {
                        delete currentFrame.FSCmd;
                        reader.offset -= cmdLength + 3;
                    } else {
                        reader.offset -= cmdLength + 2;
                    }
                    keep = false;
                }
            }
        }
        return;
    }
    reader.offset -= 1;
}