(function(){
    Console.WriteLine("Drag me a json file");
    const json_path = Console.ReadJsonPath();
    const json = readjson(json_path);
    const key = Object.keys(json);
    key.sort((a,b)=>{
        if(a > b){
            return 1
        }
        else {
            return -1
        }
    })
    const output_json = {}
    for(let i = 0; i < key.length; i++){
        output_json[key[i]] = json[key[i]];
    }
    writejson(`${json_path}/../${basename(json_path)}.sort.json`, output_json)
}())