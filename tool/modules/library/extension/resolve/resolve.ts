"use strict";
import path from "node:path";
function get_full_path(file_system_in: string): string {
    return path.resolve(file_system_in);
}
export default get_full_path;
