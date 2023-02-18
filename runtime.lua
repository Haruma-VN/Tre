local luv = require("luv")
local js = require("luv-js")

local function run_js_file(filename)
  local content = luv.fs_readfile(filename)
  local result = js.execute(content)
  print(result)
end

run_js_file("./main.js")
