"use strict";
import OutChecker from "./outchecker.js";
import RefAppend from './refappend.js';
import readreferase from "./readreferase.js";
import ReadTransform from "./readtransform.js";
import fixtype from "./fixtype.js";
import readscript from "./readscript.js";
export default function (reader, frameNum, isMainAnims) {
    let frames = global.frames = new Array();
    for (var j = 0; j < frameNum; ++j) {
        frames.push({
            frameIdx: j + 1,
        });
        const currentFrame = frames[j];
        const key = reader.ReadByte();
        let canReadTrans = true;
        switch (key) {
            case 0x00:
                // Unknown ??
                break;
            case 0x01:
                const k = readreferase(reader, currentFrame);
                for (let i = 0; i < k; ++i) {
                    frames.push({
                        frameIdx: ++j + 1,
                    });
                }
                if (k < 3) {
                    reader.offset += 2;
                }
                break;
            // Unknown???
            case 0x04:
            case 0x14:
            case 0x24:
                break;
            case 0x05:
            case 0x15:
            case 0x25:
                readreferase(reader, currentFrame);
                break;
            // Claim reference table
            case 0x06:
            case 0x16:
            case 0x26:
            case 0x0e:
                RefAppend(reader, currentFrame);
                break;
            case 0x07:
            case 0x17:
            case 0x27:
            case 0x0f:
            case 0x2f:
                readreferase(reader, currentFrame);
                RefAppend(reader, currentFrame);
                break;
            case 0x09:
                readreferase(reader, currentFrame);
                break;
            default:
                if (canReadTrans) {
                    const transCount = reader.ReadByte();
                    transCount > 0 && (currentFrame.element = []);
                    let checker = new OutChecker();
                    for (let l = 0; l < transCount; ++l) {
                        let fragmentId = reader.ReadByte();
                        let type = reader.ReadByte();
                        let oldType = type;
                        let outLevel = checker.check(fragmentId);
                        if (![0x08, 0x18, 0x28, 0x38, 0x48, 0x68].includes(type)) {
                            type -= outLevel;
                            type = fixtype(type, checker);
                        }
                        let transform = new ReadTransform(reader, { idx: 0x100 * checker.outLevel + fragmentId });
                        switch (type) {
                            case 0x08:
                                transform.getPosition();
                                break;
                            case 0x18:
                                transform.getMatrix().getPosition();
                                break;
                            case 0x28:
                                transform.getPosition().getColorSpace();
                                break;
                            case 0x38:
                                transform.getMatrix().getPosition().getColorSpace();
                                break;
                            case 0x48:
                                transform.getRotationAngle().getPosition();
                                break;
                            case 0x68:
                                transform.getRotationAngle().getPosition().getColorSpace();
                                break;
                            default:
                                break;
                        }
                        currentFrame.element[l] = transform.getObject();
                    }
                }
                ;
                break;
        }
        if (reader.BufferOffsetOut()) {
            let labelLength = reader.ReadInt16();
            let labelName = reader.ReadBytes(labelLength).toString();
            if (isMainAnims && /^[\w|\u0020]+$/.test(labelName)) {
                frames[j - 1] && (frames[j - 1].stop = true);
                currentFrame.label = labelName;
            }
            else {
                reader.offset -= labelLength + 2;
            }
            isMainAnims && readscript(reader, currentFrame);
        }
    }
    isMainAnims && frames[j - 1] && (frames[j - 1].stop = true);
    return frames;
}
