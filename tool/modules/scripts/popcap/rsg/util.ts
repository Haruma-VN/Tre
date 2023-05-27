import up_rsg from "./unpack/unpack_rsg.js";
import p_rsg from "./pack/pack_rsg.js";
export namespace rsg_method {
    /**
     *
     * @param {String} rsg_input_path - Path to the rsg input file.
     * @param {Buffer} rsg_buffer - Rsg as buffer.
     * @param {boolean} simple_mode - Simple mode, default is false.
     * @param {boolean} return_mode - Return_mode mode, default is false.
     * @param {boolean} disable_notify - Disable notify, default is false.
     *
     */
    export function unpack_rsg(
        rsg_input_path: string,
        rsg_buffer: Buffer,
        simple_mode: boolean,
        return_mode: boolean = false,
        disable_notify: boolean = false
    ) {
        return up_rsg(rsg_input_path, rsg_buffer, simple_mode, return_mode, disable_notify);
    }
    /**
     *
     * @param {String} rsg_folder_input_path - Path to the rsg input folder.
     * @param {packet_info | null} packet_info - Customize packet info, default is null.
     * @param {boolean} simple_mode - Simple mode, default is false.
     * @param {boolean} return_mode - Return_mode mode, default is false.
     * @param {boolean} disable_notify - Disable notify, default is false.
     *
     */
    export function pack_rsg(
        rsg_folder_input_path: string,
        packet_info: packet_info | null,
        simple_mode: boolean,
        return_mode: boolean = false,
        disable_notify: boolean = false
    ) {
        return p_rsg(rsg_folder_input_path, packet_info, simple_mode, return_mode, disable_notify);
    }
}
