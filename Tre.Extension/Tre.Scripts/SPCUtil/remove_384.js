function remove384(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const subgroup = obj[key].SubGroup;
            if (subgroup) {
                for (const subkey in subgroup) {
                    if (subgroup.hasOwnProperty(subkey) && subkey.endsWith("_384")) {
                        delete subgroup[subkey];
                    }
                }
            }
        }
    }
}
(function () {
    Console.WriteLine("Drag a dir path");
    const dir = Console.ReadPath();
    const structinfo_dir = `${dir}/StructInfo.json`;
    const struct_info_json = readjson(structinfo_dir);
    const struct_info_json_obj = struct_info_json.Group;
    remove384(struct_info_json_obj);
    writejson(`${structinfo_dir}/../${path.parse(structinfo_dir).name}_patch.json`, struct_info_json);
    const res_info_dir = `${dir}/ResInfo.json`;
    const res_info_json = readjson(`${dir}/ResInfo.json`);
    const res_info_json_obj = res_info_json.Group;
    remove384(res_info_json_obj);
    writejson(`${res_info_dir}/../${path.parse(res_info_dir).name}_patch.json`, res_info_json);
    const packet_directory_for_remove_384 = `${dir}/Packet/`;
    const packet_data_inside_directory = read_single_folder(packet_directory_for_remove_384);
    packet_data_inside_directory.forEach(packet_data => {
        if(packet_data.indexOf("_384") != -1){
            Console.Notify(`Deleted ${packet_data} from Packet`);
            return delete_file(`${packet_directory_for_remove_384}/${packet_data}`);
        }
    });
}())