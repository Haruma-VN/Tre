# Functions

`Tre` is a PvZ2-Modding tool. It has various functions that will help you process PopCap's file.

This documentation was written in `4.0.0`, however if the future versions have any changes I will make changes to this documentation.

<!-- -   [1. JS Evaluate](#javascript_evaluate)
-   [2. PopCap Resources Split](#popcap_resources_split)
-   [3. PopCap Resources Cat](#popcap_resources_cat)
-   [4. PopCap Resources Cat](#popcap_resources_rewrite)
-   [5. PopCap Resources Cat](#popcap_old_resources_conversion_to_new_resources)
-   [6. PopCap Resources Cat](#popcap_new_resources_conversion_to_old_resources)
-   [7. PopCap Resources Cat](#popcap_resources_local_data_compare)
-   [8. PopCap Resources Cat](#popcap_resources_to_manifest)
-   [9. PopCap Resources Cat](#popcap_resources_cat)
-   [10. PopCap Resources Cat](#popcap_resources_cat)
-   [11. PopCap Resources Cat](#popcap_resources_cat)
-   [12. PopCap Resources Cat](#popcap_resources_cat)
-   [13. PopCap Resources Cat](#popcap_resources_cat)
-   [14. PopCap Resources Cat](#popcap_resources_cat)
-   [15. PopCap Resources Cat](#popcap_resources_cat)
-   [16. PopCap Resources Cat](#popcap_resources_cat)
-   [17. PopCap Resources Cat](#popcap_resources_cat)
-   [18. PopCap Resources Cat](#popcap_resources_cat)
-   [19. PopCap Resources Cat](#popcap_resources_cat)
-   [20. PopCap Resources Cat](#popcap_resources_cat) -->

## 1. JS Evaluate

-   Built-in function: `javascript_evaluate`

-   Provide Tre a JS Script to evaluate. You can write scripts in JS and make Tre executes it to use the built-in functions of Tre. To know the functions, you need to check the source code on [GitHub](https://github.com/Haruma-VN/Tre/tree/master/tool)

-   It is recommended to use [`TypeScript`](https://www.typescriptlang.org/) instead because it will appear the built-in functions.

-   Filter: This current function filter is the extension `.js`, you can make changes in `~/extension/settings/functions.json`.

## 2. PopCap Resources Split

-   Built-in function: `popcap_resources_split`

-   Provide Tre a official's `RESOURCES.json`, use `PopCap Resources Split` to do the process. After it done, the tool will provide you a splitted folder with various jsons inside which you will be working with them later.

-   Filter: This current function filter is the extension `.json`, you can make changes in `~/extension/settings/functions.json`.

## 3. PopCap Resources Cat

-   Built-in function: `popcap_resources_cat`

-   Provide Tre a splitted `RESOURCES` folder, Tre will returns you `RESOURCES` after merged.

-   Input arguments: `mode` & `encode`
-   `mode`: `?`, `1`, `2`

```
?: The tool will likely to ask this argument
1: The tool will set the default behavior of this function to concat regular (which mean it does not repair resources)
2: The tool will set the default behavior of this function to concat beautify (which mean it does repair resources)
```

-   `encode`: `?`, `0`, `1`

```
?: The tool will likely to ask this argument
0: The tool will set the default behavior of this function to return the resources file as .json
1: The tool will set the default behavior of this function to return the resources file as .rton
```

-   Filter: This current function filter is the extension `.res`, you can make changes in `~/extension/settings/functions.json`.

## 4. PopCap Resources Rewrite

-   Built-in function: `popcap_resources_rewrite`

-   Provide Tre a `RESOURCES.JSON` or `RESOURCES.RTON`, Tre will returns you `RESOURCES` after rewrite `slot` & `slot_count`.

-   Input arguments: `mode` & `encode`
-   `mode`: `?`, `1`, `2`

```
?: The tool will likely to ask this argument
1: The tool will set the default behavior of this function to concat regular (which mean it does not repair resources)
2: The tool will set the default behavior of this function to concat beautify (which mean it does repair resources)
```

-   `encode`: `?`, `0`, `1`

```
?: The tool will likely to ask this argument
0: The tool will set the default behavior of this function to return the resources file as .json
1: The tool will set the default behavior of this function to return the resources file as .rton
```

-   Filter: This current function filter is the extension `.json`, you can make changes in `~/extension/settings/functions.json`.

## 5. PopCap Old Resources to New Resources

-   Built-in function:`popcap_old_resources_conversion_to_new_resources`

-   Provide Tre a official's `RESOURCES.json` below version `10.4`, the tool will provide you a `RESOURCES.json` can be used with new version `(10.4 or more)`.

-   Notice: This functions should not be used to take whole `RESOURCES` from lower versions to new versions as it might have some bugs.

-   Filter: This current function filter is the extension `.json`, you can make changes in `~/extension/settings/functions.json`.

## 6. PopCap New Resources to Old Resources

-   Built-in function:`popcap_new_resources_conversion_to_old_resources`

-   Provide Tre a official's `RESOURCES.json` above or equal to version `10.4`, the tool will provide you a `RESOURCES.json` can be used with new version `(10.3 or less)`.

-   Notice: This functions should not be used to take whole `RESOURCES` from above versions to older versions as it might have some bugs.

-   Filter: This current function filter is the extension `.json`, you can make changes in `~/extension/settings/functions.json`.

## 7. PopCap Resources Compare

-   Built-in function: `popcap_resources_local_data_compare`

-   This function is to compare two `RESOURCES` folder, however it's not recommended to use as it might have some bugs.

-   This function is disabled by default, you need to go to `~/extension/settings/functions.json` and turn it on by yourself. This behavior will not change as it uselessness. The keyword is `popcap_resources_local_data_compare`

-   Filter: This current function filter is the extension `.res`, you can make changes in `~/extension/settings/functions.json`.

## 8. PopCap Resources to Manifest

-   Built-in function: `popcap_resources_to_manifest`

-   This function will take `RESOURCES.JSON` splitted folder and convert to `manifest.json` can be used to pack RSB.

-   Filter: This current function filter is the extension `.res`, you can make changes in `~/extension/settings/functions.json`.

## 9. PopCap Small Res to Atlas Info

-   Built-in function: `popcap_resources_to_atlasinfo`

-   This function will take `subgroup res` inside splitted folder and convert to `AtlasInfo.json` can be used to process with `Atlas` functions.

-   Filter: This current function filter is the extension `.json`, you can make changes in `~/extension/settings/functions.json`.

## 10. PopCap Resources Beautify

-   Built-in function: `popcap_resources_beautify`

-   This function will take `subgroup res` inside splitted folder and beautify it for you.

-   This function is disabled by default, you need to go to `~/extension/settings/functions.json` and turn it on by yourself. This behavior will not change as it uselessness. The keyword is `popcap_resources_beautify`

-   Filter: This current function filter is the extension `.json`, you can make changes in `~/extension/settings/functions.json`.

## 11. AtlasInfo Split

-   Built-in function: `atlas_info_split`

-   This function will take `AtlasInfo.json` and split it to a `splitted folder` where you can work with it.

-   It is not recommended to use this function than editing the `AtlasInfo.json` yourself as it might takes longer.

-   Filter: This current function filter is the extension `.json`, you can make changes in `~/extension/settings/functions.json`.

## 12. AtlasInfo Cat

-   Built-in function: `atlas_info_cat`

-   This function will take `AtlasInfo.bundles` and merge it to a `AtlasInfo.json` which you can use to interact with some `Atlas` functions.

-   It is not recommended to use this function than editing the `AtlasInfo.json` yourself as it might takes longer.

-   Filter: This current function filter is the extension `.bundles`, you can make changes in `~/extension/settings/functions.json`.

## 13. AtlasInfo Constructor

-   Built-in function: `atlas_info_constructor`

-   This function will take `any` folder contains `.png` inside and generates a `AtlasInfo.json` which you can use to interact with some `Atlas` functions.

-   Filter: All folders can be suggested with this function, you can make changes in `~/extension/settings/functions.json`.

## 14. PopCap Atlas Split

-   Built-in function: `popcap_texture_atlas_split`

-   This function will take `at least` one `json` & one `png` and split sprites provide a better interact with the spritesheets.

-   This function can work with all vanilla versions, also include `10.4` or above.

-   Input arguments: `split`
-   `split`: `?`, `1`, `2`

```
?: The tool will likely to ask this argument
1: The tool will set the default behavior of this function to split by path, this could have some bugs with pvz2c but the filename will be short, useful for making PAM
2: The tool will set the default behavior of this function to split by id, this will not appear to have any bugs but the filename will be long
```

-   Filter: This function will `only appear` if you provide Tre `at least 2 files` and `execute_all_in_queues` bool is `true`, but you can make changes in `~/extension/settings/functions.json`.

## 15. PopCap Atlas Pack Simple

-   Built-in function: `popcap_texture_atlas_cat_simple`

-   This function will take the folder contains `sprites` and merge to one or many `atlas`.
-   Input arguments: `padding`
-   `padding`: `?`, `1`, `any integer number`

-   Filter: This current function filter is the extension `.spg`, you can make changes in `~/extension/settings/functions.json`.

## 16. PopCap Atlas Split

-   Built-in function: `popcap_texture_atlas_cat`

-   This function will take the folder contains `sprites` and merge to one or many `atlas`.

-   This function is not recommended to use as it asking for too many arguments.

-   This function can work with all vanilla versions, also include `10.4` or above.

-   Input arguments: `smart`, `pot`, `square`, `rotation` & `padding`
-   `smart`, `pot`, `square`, `rotation`: `?`, `1`, `2`

```
?: The tool will likely to ask this argument
0: The tool will set the default behavior to false (not apply for padding)
1: The tool will set the default behavior to true (not apply for padding)
```

-   `padding`: `?`, `1`, `any integer number`

-   Filter: This current function filter is the extension `.spg`, you can make changes in `~/extension/settings/functions.json`.

## 17. PopCap PTX RGBA8888 Encode

-   Built-in function: `popcap_texture_encode_rgba8888`

-   This function will encode RGBA8888 (0) for you. This is the supported texture format for `PvZ2 Android`.

-   Filter: This current function filter is the extension `.png`, you can make changes in `~/extension/settings/functions.json`.

## 18. PopCap PTX ARGB8888 Encode

-   Built-in function: `popcap_texture_encode_argb8888`

-   This function will encode ARGB8888 (0) for you. This is the supported texture format for `PvZ2 iOS & PvZ2 Chinese iOS`.

-   Filter: This current function filter is the extension `.png`, you can make changes in `~/extension/settings/functions.json`.

## 19. PopCap PTX RGB_PVRTC4_A_8 Encode

-   Built-in function: `popcap_texture_encode_pvrtc`

-   This function will encode RGB_PVRTC4_A_8 (30) for you. This is the supported texture format for `PvZ2 iOS & PvZ2 Chinese iOS`.

-   Filter: This current function filter is the extension `.png`, you can make changes in `~/extension/settings/functions.json`.

## 20. PopCap PTX RGB_ETC1_A_8 Encode

-   Built-in function: `popcap_texture_encode_etc1a`

-   This function will encode RGB_ETC1_A_8 (147) for you. This is the supported texture format for `PvZ2 Android`.

-   Filter: This current function filter is the extension `.png`, you can make changes in `~/extension/settings/functions.json`.

## 21. PopCap PTX RGB_ETC1_A_8_Index Encode

-   Built-in function: `popcap_texture_encode_etc1a_index`

-   This function will encode RGB_ETC1_A_8_Index (147) for you. This is the supported texture format for `PvZ2 Chinese Android`.

-   Filter: This current function filter is the extension `.png`, you can make changes in `~/extension/settings/functions.json`.

## 22. PopCap PTX RGBA8888 Decode

-   Built-in function: `popcap_texture_decode_rgba8888`

-   This function will decode RGBA8888 (0) for you. This is the supported texture format for `PvZ2 Android`.

-   Input arguments: `width` & `height`
-   `width` & `height` data can be found in `RSG` or use `PopCap RSG Unpack Simple` to skip this function

-   Filter: This current function filter is the extension `.ptx`, you can make changes in `~/extension/settings/functions.json`.

## 23. PopCap PTX ARGB8888 Decode

-   Built-in function: `popcap_texture_decode_argb8888`

-   This function will decode ARGB8888 (0) for you. This is the supported texture format for `PvZ2 iOS & PvZ2 Chinese iOS`.

-   Input arguments: `width` & `height`
-   `width` & `height` data can be found in `RSG` or use `PopCap RSG Unpack Simple` to skip this function

-   Filter: This current function filter is the extension `.ptx`, you can make changes in `~/extension/settings/functions.json`.

## 24. PopCap PTX RGB_PVRTC4_A_8 Decode

-   Built-in function: `popcap_texture_decode_pvrtc`

-   This function will decode RGB_PVRTC4_A_8 (30) for you. This is the supported texture format for `PvZ2 iOS & PvZ2 Chinese iOS`.

-   Input arguments: `width` & `height`
-   `width` & `height` data can be found in `RSG` or use `PopCap RSG Unpack Simple` to skip this function

-   Filter: This current function filter is the extension `.ptx`, you can make changes in `~/extension/settings/functions.json`.

## 25. PopCap PTX RGB_ETC1_A_8 Decode

-   Built-in function: `popcap_texture_decode_etc1a`

-   This function will decode RGB_ETC1_A_8 (147) for you. This is the supported texture format for `PvZ2 Android`.

-   Input arguments: `width` & `height`
-   `width` & `height` data can be found in `RSG` or use `PopCap RSG Unpack Simple` to skip this function

-   Filter: This current function filter is the extension `.ptx`, you can make changes in `~/extension/settings/functions.json`.

## 26. PopCap PTX RGB_ETC1_A_8_Index Decode

-   Built-in function: `popcap_texture_decode_etc1a_index`

-   This function will decode RGB_ETC1_A_8_Index (147) for you. This is the supported texture format for `PvZ2 Chinese Android`.

-   Input arguments: `width` & `height`
-   `width` & `height` data can be found in `RSG` or use `PopCap RSG Unpack Simple` to skip this function

-   Filter: This current function filter is the extension `.ptx`, you can make changes in `~/extension/settings/functions.json`.

## 27. PopCap Atlas Resize Simple

-   Built-in function: `popcap_texture_resize_atlas_simple`

-   This function will takes sprites folder from `PopCap Atlas Split` and do whole resize pngs inside. You can use this function to: Resize 1536, 768 & 384 (`384` is deprecated since `10.4`, it is not recommended to support `384`)

-   Input arguments: `original` & `modified`
-   `original`: The function will ask for `original` quality you process. These are supported:

```
1536.
768.
384.
```

-   `modified`: The function will ask for `modified` quality you want to get. These are supported:

```
1536.
768.
384.
```

-   Filter: This current function filter is the extension `.spg`, you can make changes in `~/extension/settings/functions.json`.

## 28. PopCap Atlas Resize

-   Built-in function: `popcap_texture_resize_atlas`

-   The same as previous simple except ask more `arguments`.

-   Filter: This current function filter is the extension `.spg`, you can make changes in `~/extension/settings/functions.json`.

## 29. Real-ESRGAN Image Upscaler

-   Built-in function: `real_esrgan_upscaler_image`

-   AI Model for Upscaling Images: [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN)

-   Please see more information at the third party dependencies document. This document will not explain how to use it.

-   Filter: This current function filter are any folder, `.png` or `.jpg`, you can make changes in `~/extension/settings/functions.json`.

## 30. PopCap RSG Unpack

-   Built-in function: `popcap_zlib_rsg_unpack`

-   Provide Tre one `rsg`, `rsgp`, `pgsr` and the tool will unpack it.

-   Filter: This current function filter is the extension `.rsg`, you can make changes in `~/extension/settings/functions.json`.

## 31. PopCap RSG Pack

-   Built-in function: `popcap_zlib_rsg_pack`

-   Provide Tre one `uncompressed rsg folder` and the tool will pack it.

-   Filter: This current function filter is the extension `.packet`, you can make changes in `~/extension/settings/functions.json`.

## 33. PopCap RSB Unpack

-   Built-in function: `popcap_zlib_rsb_unpack`

-   Provide Tre one `rsb` or `obb` and the tool will unpack it. This will be default unpack multiple `subgroups`.

-   Filter: This current function filter are the extension `.rsb` & `.obb`, you can make changes in `~/extension/settings/functions.json`.

## 33. PopCap RSB Pack

-   Built-in function: `popcap_zlib_rsb_pack`

-   Provide Tre one `uncompressed rsb folder` and the tool will pack it into a new `rsb` so the game can process.

-   Filter: This current function filter is the extension `.bundle`, you can make changes in `~/extension/settings/functions.json`.

## 34. PopCap ZLIB Uncompress

-   Built-in function: `popcap_zlib_smf_decompress`

-   Provide Tre any compressed `zlib` file example: `.smf` and the tool will uncompress it.

-   Filter: This current function filter is the extension `.smf`, you can make changes in `~/extension/settings/functions.json`.

## 35. PopCap ZLIB Uncompress

-   Built-in function: `popcap_zlib_smf_decompress`

-   Provide Tre any compressed `zlib` file example: `.smf` and the tool will compress it.

-   Filter: This current function filter are the extension `.rsb` & `.obb`, you can make changes in `~/extension/settings/functions.json`.

## 36. PopCap JSON Split

-   Built-in function: `popcap_game_json_split`

-   Provide Tre any `json` or `rton` inside `PACKAGES` except `localization`, the tool will split it. This function `only` supports `PvZ2 & PvZ2 Chinese`

-   Filter: This current function filter are the extension `.json` & `.rton`, you can make changes in `~/extension/settings/functions.json`.

## 37. PopCap JSON Pack

-   Built-in function: `popcap_game_json_pack`

-   Provide Tre any `extracted jsons` folder, the tool will merge it.

-   Input argument: `encode`

-   `encode`: `?`, `1`, `2`

```
?: The tool will likely to ask this argument
0: The tool will set the default behavior of this function to return the file as .json
1: The tool will set the default behavior of this function to return the file as .rton
```

-   Filter: This current function filter is the extension `.pgj`, you can make changes in `~/extension/settings/functions.json`.

## 38. JSON-Patch

-   Built-in function: `json_patch`

-   Self implement JSON-Patch, based on [this page](https://jsonpatch.com/)

-   Original JSON-Patch:

```
[
  { "op": "replace", "path": "/baz", "value": "boo" },
  { "op": "add", "path": "/hello", "value": ["world"] },
  { "op": "remove", "path": "/foo" }
]
```

-   Self-implement JSON-Patch:

```
[
  { "op": "replace", "path": ["baz"], "value": "boo", },
  { "op": "add", "path": ["hello"], "value": ["world"], },
  { "op": "remove", "path": ["foo"], }
]
```

-   From my self-implement JSON-Patch & current JSON Parsing system of Tre, this function can accept `trailing commas` JSON which does not follows the `JSON Standard`

-   Filter: This current function filter are the extension `.json`, you can make changes in `~/extension/settings/functions.json`.

## 39. JSON-Patch Generate

-   Built-in function: `json_patch_generator`

-   Self implement JSON-Patch Generator, based on [this page](https://jsonpatch.com/)

-   Provide Tre two `json` and the tool will compare and returns you the diff `json` represent for the `patch`.

-   From my self-implement JSON-Patch & current JSON Parsing system of Tre, this function can accept `trailing commas` JSON which does not follows the `JSON Standard`

-   Filter: This current function filter is the extension `.json`, you can make changes in `~/extension/settings/functions.json`.

## 40. PopCap Atlas Cross Resolution Pack

-   Built-in function: `popcap_texture_atlas_pack_cross_resolution`

-   This function is the same as `PopCap Atlas Pack Simple` but except when you declare to pack `1536`, the tool will generates `768` & `384` for you.

-   If you want the tool generates `384`, go to `~/extension/settings/toolkit.json` and set `allow_384` to `true`

-   Here is the completed one, your should look like this if you want to enable pack `384`:

```
"atlas": {
		"cross_resolution": {
			"allow_384": true,
		},
    // other methods
	},
```

-   Filter: This current function filter is the extension `.spg`, you can make changes in `~/extension/settings/functions.json`.
