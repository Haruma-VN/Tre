"use strict";
(function ExtractIntegerID() {
    Console.WriteLine("Drag your PlantTypes.json here");
    const file_path = Console.ReadPath();
    const json = readjson(file_path);
    const return_obj = new Object({});
    for (let i in json.objects) {
        if (json.objects[i].objdata != undefined && json.objects[i].objdata != null && json.objects[i].objdata.IntegerID != undefined && json.objects[i].objdata.IntegerID != null && json.objects[i].objdata.TypeName != null && json.objects[i].objdata.TypeName != undefined) {
            return_obj[json.objects[i].objdata.TypeName] = json.objects[i].objdata.IntegerID;
        }
    };
    writejson(`${file_path}/../Integer.json`, return_obj);
}())