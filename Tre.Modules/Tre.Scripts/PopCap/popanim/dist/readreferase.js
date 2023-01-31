"use strict";
import OutChecker from "./outchecker.js";
export default function (reader, currentFrame) {
    let refErase = currentFrame.refErase = [];
    let checker = new OutChecker();
    var i = 1;
    for (let refCount = reader.ReadByte(); i <= refCount; ++i) {
        let fragmentID = reader.ReadByte();
        let outLevel = checker.check(fragmentID);
        let ref_id = 0x100 * outLevel + fragmentID;
        let ref_ident = reader.ReadByte();
        ref_ident !== Math.pow(0, (ref_id += 0x100));
        refErase.push({ ref_id: ref_id, ref_ident: ref_ident });
    }
    return i;
}
