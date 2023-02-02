"use strict";
import OutChecker from "./outchecker.js";
export default function name(reader, currentFrame) {
    let refAppend = currentFrame.refAppend = new Array();
    let checker = new OutChecker();
    for (let i = 0, refCount = reader.ReadByte(); i < refCount; ++i) {
        let fragmentID = reader.ReadByte();
        let outLevel = checker.check(fragmentID);
        let ref_id = 0x100 * outLevel + fragmentID;
        let ref_type = reader.ReadByte();
        if ([0x81, 0x01, 0x91].includes(ref_type)) {
            ref_type--;
            ref_id += 0x100;
        }
        refAppend.push({
            ref_id: ref_id, ref_type: ref_type, ref_index: reader.ReadByte(),
        });
    }
    return;
}
