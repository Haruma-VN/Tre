"use strict";
import OutChecker from "./outchecker.js";
import ReadBuffer from "./readbuffer.js";
interface RefEraseData {
    refErase: refX[],
}
interface refX {
    ref_id: number,
    ref_ident: number,
}
export default function (reader: ReadBuffer, currentFrame: RefEraseData) {
    let refErase: refX[] = currentFrame.refErase = [];
    let checker = new OutChecker();
    var i: number = 1;
    for (let refCount: number = reader.ReadByte(); i <= refCount; ++i) {
        let fragmentID: number = reader.ReadByte();
        let outLevel: number = checker.check(fragmentID);
        let ref_id: number = 0x100 * outLevel + fragmentID;
        let ref_ident: number = reader.ReadByte();
        ref_ident !== 0 ** (ref_id += 0x100);
        refErase.push({ ref_id: ref_id, ref_ident: ref_ident });
    }
    return i;
}