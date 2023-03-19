"use strict";
(function SplitPathAndID(
) {
    Console.WriteLine('Drag a res here');
    const dir = Console.ReadPath();
    const json = readjson(dir);
    const output_array = new Array();
    for (let i = 0; i < json.resources.length; ++i) {
        if (json.resources[i].atlas === true) {
            continue;
        }
        else {
            output_array.push({extension: json.resources[i].path[json.resources[i].path.length - 1], id: json.resources[i].id })
        }
    };
    writejson(`${dir}/../tre.json`, output_array);
}())