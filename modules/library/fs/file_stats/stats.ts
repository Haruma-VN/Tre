"use strict";
import fs from "node:fs";
function checkFileStats(dir: string): fs.Stats {
    return fs.statSync(dir);
}
export default checkFileStats;