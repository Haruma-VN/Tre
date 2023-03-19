"use strict";
import fs_js from "../../../../library/fs/implement.js";

async function  popcap_pam_from_gif(
    file_system_input_directory: string,
){
    await fs_js.gif_to_pngs(file_system_input_directory, "D:\\JSONPatch\\core\\")
}

export default popcap_pam_from_gif;