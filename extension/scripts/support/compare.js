"use strict";
function create_res_compare(
    original_res = [],
    modified_res = [],
) {
    const outview_for_compare = [];
    const original_res_name = original_res.map(res => {
        return res.name;
    });
    for (let i = 0; i < original_res.length; i++) {
        for (let j = 0; j < modified_res.length; j++) {
            if (original_res[i].name === modified_res[j].name) {
                // fs_js.execution_notify("received",
                //     original_res[i].name);
                if (stringify(original_res[i].data) !== stringify(modified_res[j].data)) {
                    outview_for_compare.push(modified_res[j].name);
                }
                // fs_js.execution_notify("success",
                //     "Finish compare " + original_res[i].name);
                break;
            }
        }
    }
    modified_res.map(res => {
        return res.name;
    }).filter(res => {
        return res != undefined;
    }).forEach(name => {
        if (!original_res_name.includes(name)) {
            outview_for_compare.push(name);
        }
    })
    return [...new Set(outview_for_compare)];
}

(function evaluate() {
    fs_js.execution_notify("argument",
        "Nhập đường dẫn gốc vào đây");
    const original_path = Console.ReadPath();
    fs_js.execution_notify("received",
        original_path);
    fs_js.execution_notify("argument",
        "Nhập đường dẫn đã sửa đổi vào đây");
    const modified_path = Console.ReadPath();
    fs_js.execution_notify("received",
        modified_path);
    fs_js.execution_notify("argument",
        "Tài nguyên PopCap's path");
    fs_js.execution_notify("void",
        "      1. Tài nguyên mới (PvZ2 10.4 + )");
    fs_js.execution_notify("void",
        "      2. Tài nguyên cũ (PvZ2 10.3 - )");
    const popcap_resources_selector = Console.IntegerReadLine(1, 2);
    const create_view_messsage = (popcap_resources_selector === 1) ? "mới" : "cũ";
    const create_new_resources_holder_for_original = [];
    fs_js.one_reader(original_path).forEach(function (file) {
        const create_empty_resources_json_holder = fs_js.read_json(original_path + "/" + file);
        if ("resources" in create_empty_resources_json_holder) {
            // create new checker
            // string
            if (popcap_resources_selector === 1) {
                for (let i = 0; i < create_empty_resources_json_holder.resources.length; i++) {
                    if (typeof create_empty_resources_json_holder.resources[i].path === "string") {
                        continue;
                    }
                    else {
                        create_empty_resources_json_holder.path = create_empty_resources_json_holder.join('\\');
                    }
                }
                create_new_resources_holder_for_original.push({
                    name: file,
                    data: create_empty_resources_json_holder
                });
            }
            // array
            if (popcap_resources_selector === 2) {
                for (let i = 0; i < create_empty_resources_json_holder.resources.length; i++) {
                    if (js_checker.is_array(create_empty_resources_json_holder.resources[i].path)) {
                        continue;
                    }
                    else {
                        create_empty_resources_json_holder.resources[i].path = create_empty_resources_json_holder.resources[i].path.split('\\');
                    }
                }
                create_new_resources_holder_for_original.push({
                    name: file,
                    data: create_empty_resources_json_holder
                });
            }
        }
        if ("subgroups" in create_empty_resources_json_holder) {
            // skip
            create_new_resources_holder_for_original.push({
                name: file,
                data: create_empty_resources_json_holder
            });
        }
    })

    fs_js.execution_notify("success",
        `Thành công chuyển đổi sang ${create_view_messsage} cho đường dẫn gốc`);

    const create_new_resources_holder_for_modified = [];
    fs_js.one_reader(modified_path).forEach(function (file) {
        const create_empty_resources_json_holder = fs_js.read_json(modified_path + "/" + file);
        if ("resources" in create_empty_resources_json_holder) {
            // create new checker
            // string
            if (popcap_resources_selector === 1) {
                for (let i = 0; i < create_empty_resources_json_holder.resources.length; i++) {
                    if (typeof create_empty_resources_json_holder.resources[i].path === "string") {
                        continue;
                    }
                    else {
                        create_empty_resources_json_holder.path = create_empty_resources_json_holder.join('\\');
                    }
                    create_new_resources_holder_for_modified.push({
                        name: file,
                        data: create_empty_resources_json_holder,
                    });
                }
            }
            // array
            if (popcap_resources_selector === 2) {
                for (let i = 0; i < create_empty_resources_json_holder.resources.length; i++) {
                    if (js_checker.is_array(create_empty_resources_json_holder.resources[i].path)) {
                        continue;
                    }
                    else {
                        create_empty_resources_json_holder.resources[i].path = create_empty_resources_json_holder.resources[i].path.split('\\');
                    }
                }
                create_new_resources_holder_for_modified.push({
                    name: file,
                    data: create_empty_resources_json_holder
                });
            }
        }
        if ("subgroups" in create_empty_resources_json_holder) {
            // skip
            create_new_resources_holder_for_modified.push({
                name: file,
                data: create_empty_resources_json_holder,
            });
        }
    })

    fs_js.execution_notify("success",
        `Thành công chuyển đổi sang ${create_view_messsage} cho đường dẫn sửa đổi`);
    const popcap_resources_compare_view = create_res_compare(create_new_resources_holder_for_original, create_new_resources_holder_for_modified);
    if (popcap_resources_compare_view.length === 0) {
        fs_js.execution_notify("success",
            "Không có gì thay đổi, hai gói tài nguyên là như nhau");
    }
    else {
        fs_js.execution_notify("success",
            `Tìm thấy ${color.fgred_string(`${popcap_resources_compare_view.length}`)} thay đổi qua các tệp`);
        fs_js.execution_out(fs_js.get_full_path(`${fs_js.get_full_path(modified_path)}/../${fs_js.js_basename(modified_path)}.modified`));
    }
}())