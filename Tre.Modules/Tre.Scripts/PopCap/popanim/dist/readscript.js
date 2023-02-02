"use strict";
export default function (reader, currentFrame) {
    let scrKey = reader.ReadByte();
    let keep = true;
    if (scrKey == 0x01 || scrKey == 0x02) {
        currentFrame.FSCmd = new Array();
        while (keep) {
            let cmdLength = reader.ReadInt16();
            let cmdName = reader.ReadBytes(cmdLength);
            if (/^[\w|\x20]+$/.test(cmdName)) {
                if (currentFrame.FSCmd != undefined && currentFrame.FSCmd != null) {
                    currentFrame.FSCmd.push({
                        CmdName: cmdName,
                        Arg: reader.ReadBytes(reader.ReadInt16()).toString()
                    });
                }
            }
            else {
                if (currentFrame.FSCmd != undefined && currentFrame.FSCmd != null) {
                    if (!currentFrame.FSCmd.length) {
                        delete currentFrame.FSCmd;
                        reader.offset -= cmdLength + 3;
                    }
                    else {
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
