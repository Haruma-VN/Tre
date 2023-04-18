"use strict";
import fs from "node:fs";
function if_file_exists(dir: string): boolean {
    return fs.existsSync(dir);
}
export default if_file_exists;
