"use strict";
import nodejs_path from "node:path";

class path {
    public static sep: string = "/";

    public static basename(path: string): string {
        return nodejs_path.basename(path);
    }

    public static dirname(path: string): string {
        return nodejs_path.dirname(path);
    }

    public static extname(path: string): string {
        return nodejs_path.extname(path);
    }

    public static isAbsolute(path: string): boolean {
        return nodejs_path.isAbsolute(path);
    }

    public static join(...paths: string[]): string {
        return nodejs_path.join(...paths);
    }

    public static parse(path: string): {
        root: string;
        dir: string;
        base: string;
        ext: string;
        name: string;
    } {
        return nodejs_path.parse(path);
    }

    public static relative(from: string, to: string): string {
        return nodejs_path.relative(from, to);
    }

    public static normalize(path: string): string {
        return nodejs_path.normalize(path);
    }

    public static resolve(...paths: Array<string>): string {
        return nodejs_path.resolve(...paths);
    }
}

export default path;
