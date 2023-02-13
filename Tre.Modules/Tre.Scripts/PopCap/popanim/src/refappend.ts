"use strict";
import OutChecker from "./outchecker.js";
import ReadBuffer from "./readbuffer.js";
interface RefAppendData {
    refAppend: refX[],
}
interface refX {
    ref_id: number,
    ref_type: number,
    ref_index: number,
}
export default function name(reader: ReadBuffer, currentFrame: RefAppendData): void {
    let refAppend: refX[] = currentFrame.refAppend = new Array();
    let checker = new OutChecker();
    for (let i:number = 0, refCount = reader.ReadByte(); i < refCount; ++i) {
        let fragmentID: number = reader.ReadByte();
        let outLevel = checker.check(fragmentID);
        let ref_id = 0x100 * outLevel + fragmentID;
        let ref_type = reader.ReadByte();
        if ([0x81, 0x01, 0x91].includes(ref_type)) {
            ref_type--;
            ref_id += 0x100;
        }
        refAppend.push({
            ref_id: ref_id, ref_type: ref_type, ref_index: reader.ReadByte(),
        })
    }
    return;
}