"use strict";
import PAM2JSON from './dist/pam2json.js';
import fs from 'fs';
const file_input = process.argv[2];
const file = new PAM2JSON(file_input);
console.log(file.start())