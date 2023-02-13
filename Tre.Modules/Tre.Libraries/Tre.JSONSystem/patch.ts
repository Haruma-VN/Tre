import { TreErrorMessage } from "../../Tre.Debug/Tre.ErrorSystem.js";
interface PatchX{
    loop: boolean,
    patch: any[],
}
export default function applyPatch(source: any, patch: PatchX): any {
    try {
        if (patch.loop) {
            let result: any[] = [];
            if (Array.isArray(source)) {
                for (const member of source) {
                    result.push(applyPatch(member, { loop: false, patch: patch.patch }));
                }
                return result;
            } else {
                TreErrorMessage({ error: "Cannot apply loop operation on non-array source." }, "Cannot apply loop operation on non-array source.");
            }
        } else {
            if (patch.patch) {
                for (const op of patch.patch) {
                    switch (op.op) {
                        case "add": {
                            const pathElements = op.path.split("/").slice(1);
                            let obj = source;
                            for (let i: number = 0; i < pathElements.length - 1; i++) {
                                const pathElement = pathElements[i];
                                if (!obj[pathElement]) {
                                    obj[pathElement] = {};
                                }
                                obj = obj[pathElement];
                            }
                            obj[pathElements[pathElements.length - 1]] = op.value;
                            break;
                        }
                        case "remove": {
                            const pathElements = op.path.split("/").slice(1);
                            let obj = source;
                            for (let i = 0; i < pathElements.length - 1; i++) {
                                const pathElement = pathElements[i];
                                obj = obj[pathElement];
                            }
                            delete obj[pathElements[pathElements.length - 1]];
                            break;
                        }
                        case "replace": {
                            const pathElements = op.path.split("/").slice(1);
                            let obj = source;
                            for (let i = 0; i < pathElements.length - 1; i++) {
                                const pathElement = pathElements[i];
                                obj = obj[pathElement];
                            }
                            obj[pathElements[pathElements.length - 1]] = op.value;
                            break;
                        }
                        case "move": {
                            const fromPathElements = op.from.split("/").slice(1);
                            let fromObj = source;
                            for (let i = 0; i < fromPathElements.length - 1; i++) {
                                const pathElement = fromPathElements[i];
                                fromObj = fromObj[pathElement];
                            }
                            const value = fromObj[fromPathElements[fromPathElements.length - 1]];

                            const pathElements = op.path.split("/").slice(1);
                            let obj = source;
                            for (let i = 0; i < pathElements.length - 1; i++) {
                                const pathElement = pathElements[i];
                                obj = obj[pathElement];
                            }
                            obj[pathElements[pathElements.length - 1]] = value;
                            delete fromObj[fromPathElements[fromPathElements.length - 1]];
                            break;
                        }
                        case "copy": {
                            const fromPathElements = op.from.split("/").slice(1);
                            let fromObj = source;
                            for (let i = 0; i < fromPathElements.length - 1; i++) {
                                const pathElement = fromPathElements[i];
                                fromObj = fromObj[pathElement];
                            }
                            const value = fromObj[fromPathElements[fromPathElements.length - 1]];

                            const pathElements = op.path.split("/").slice(1);
                            let obj = source;
                            for (let i = 0; i < pathElements.length - 1; i++) {
                                const pathElement = pathElements[i];
                                obj = obj[pathElement];
                            }
                            obj[pathElements[pathElements.length - 1]] = value;
                            break;
                        }
                    }
                }
            }
            return source;
        }
    } catch (error: any) {
        TreErrorMessage({ error: error.toString() }, error.toString());
        return source;
    }
}