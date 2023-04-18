"use strict";
import { PatchOperation } from "./patch.js";

export default function (input1: any, input2: any) {
    let patch: PatchOperation[] = [];

    const walk = (obj1: any, obj2: any, path: string[] = []) => {
        if (obj1 === null || obj1 === undefined) {
            return;
        }

        Object.keys(obj1).forEach((key: string) => {
            const val1 = obj1[key];
            const val2 = obj2[key];
            const currentPath: string[] = path.concat(key);

            if (!(key in obj2)) {
                patch.push({
                    op: "remove",
                    path: currentPath,
                });
                return;
            }

            if (Array.isArray(val1) && Array.isArray(val2)) {
                val1.forEach((val, i) => {
                    if (val2.length <= i) {
                        for (let j = i; j < val1.length; j++) {
                            patch.push({
                                op: "remove",
                                path: currentPath.concat([j.toString()]),
                            });
                        }
                    } else if (Array.isArray(val) || typeof val === "object") {
                        walk(val, val2[i], currentPath.concat([i.toString()]));
                    } else if (val !== val2[i]) {
                        patch.push({
                            op: "replace",
                            path: currentPath.concat([i.toString()]),
                            value: val2[i],
                        });
                    }
                });
                for (let i = val1.length; i < val2.length; i++) {
                    patch.push({
                        op: "add",
                        path: currentPath.concat([i.toString()]),
                        value: val2[i],
                    });
                }
            } else if (typeof val1 === "object" && typeof val2 === "object") {
                walk(val1, val2, currentPath);
            } else if (val1 !== val2) {
                patch.push({
                    op: "replace",
                    path: currentPath,
                    value: val2,
                });
            }
        });

        if (obj2 === null || obj2 === undefined) {
            return;
        }

        Object.keys(obj2).forEach((key) => {
            if (!(key in obj1)) {
                patch.push({
                    op: "add",
                    path: path.concat(key),
                    value: obj2[key],
                });
            }
        });
    };

    walk(input1, input2);
    return patch;
}
