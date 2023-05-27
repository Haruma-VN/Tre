"use strict";
import localization from "../../callback/localization.js";
import { JSONPatchOperationError } from "../../implement/error.js";

export type PatchOperation =
    | { op: "add"; path: string[]; value: any }
    | { op: "remove"; path: string[] }
    | { op: "replace"; path: string[]; value: any }
    | { op: "move"; from: string[]; path: string[] }
    | { op: "copy"; from: string[]; path: string[] }
    | { op: "test"; path: string[]; value: any };

function get(obj: any, path: string[]): any {
    let current = obj;

    for (const token of path) {
        if (current === null || typeof current === "undefined") {
            return undefined;
        }
        current = current[token];
    }

    return current;
}

function set(obj: any, path: string[], value: any): void {
    let current = obj;

    for (let i = 0; i < path.length - 1; i++) {
        const token = path[i];
        if (!(token in current)) {
            current[token] = {};
        }
        current = current[token];
    }

    current[path[path.length - 1]] = value;
}

function remove(obj: any, path: string[]): void {
    let current = obj;

    for (let i = 0; i < path.length - 1; i++) {
        const token = path[i];
        if (!(token in current)) {
            return;
        }
        current = current[token];
    }

    delete current[path[path.length - 1]];
}

function applyPatch(obj: any, patch: PatchOperation): void {
    switch (patch.op) {
        case "add": {
            set(obj, patch.path, patch.value);
            break;
        }
        case "remove": {
            remove(obj, patch.path);
            break;
        }
        case "replace": {
            set(obj, patch.path, patch.value);
            break;
        }
        case "move": {
            const valueToMove = get(obj, patch.from);
            remove(obj, patch.from);
            set(obj, patch.path, valueToMove);
            break;
        }
        case "copy": {
            const valueToCopy = get(obj, patch.from);
            set(obj, patch.path, valueToCopy);
            break;
        }
        case "test": {
            const value = get(obj, patch.path);
            if (JSON.stringify(value) !== JSON.stringify(patch.value)) {
                throw new JSONPatchOperationError(localization("test_operation_failed"), patch.op);
            }
            break;
        }
        default:
            throw new JSONPatchOperationError(
                `${localization("invalid_patch_op")}`,
                `${(patch as any).op as never}`,
            ) as never;
    }
}

export default function applyPatchDocument(obj: any, patches: PatchOperation[]) {
    for (const patch of patches) {
        applyPatch(obj, patch);
    }
    return obj;
}
