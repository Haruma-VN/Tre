import fs from "node:fs";
import {decryptRijndael} from "./decrypt.js";
const string = fs.readFileSync("./pp.rton", "base64");
decryptRijndael(string, "65bd1b2305f46eb2806b935aab7630bb", "65bd1b2305f46eb2806b935aab7630bb".slice(4,28));