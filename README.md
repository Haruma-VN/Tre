# Tre
## Introduction


Tre is a modding tool for Plants vs. Zombies 2, written in TypeScript and being converted to JavaScript to run in NodeJS. Its goal is to make modding easier for people.


## Features

- JavaScript void Execute: This function executes all JavaScript source code, and allows you to call Tre functions in the script.
- Split and Concat PopCap Resources: Allows you to split and concatenate PopCap resources (RTON encoding is not currently supported).
- Split and Concat PopCap Atlas: Requires you to split PopCap Resources to get the JSON data. Can also pack very fast from 1536 directly to 768.
- Encode and Decode PopCap PTX: Currently supports texture formats 0, 30, and 147.
- Unpack and Pack RSGP (PGSR, RSG, etc.).
- Unpack and Pack RSB (OBB, SMF, etc.).
- Split and Concat PopCap JSON: Can also patch JSON and generate the patch for JSONs.

## Third Party Libraries

Tre currently uses the following third-party libraries:

| Name | Link |
| ------ | ------ |
| JSONC | https://github.com/onury/jsonc |
| Sharp | https://github.com/lovell/sharp |
| Crypto-JS | https://github.com/brix/crypto-js |
| fs-extra | https://github.com/jprichardson/node-fs-extra|
| maxrects-packer | https://github.com/soimy/maxrects-packer|
| readline-sync | https://github.com/anseki/readline-sync |
| smart-buffer | https://github.com/JoshGlazebrook/smart-buffer |
| etcpak | https://github.com/wolfpld/etcpak |
| PVRTexTool-Cli | https://developer.imaginationtech.com/pvrtextool/ |
| Real_Esrgan | https://github.com/xinntao/Real-ESRGAN/ |
| Real_Esrgan | https://github.com/xinntao/Real-ESRGAN/ |
| cross-path-sort | https://www.npmjs.com/package/cross-path-sort |
## Installation

To use Tre, you need to have [Node.js](https://nodejs.org/) installed on your machine. If you want to compile Tre from TypeScript source code, you can install TypeScript as well. To run Tre, use the launch.cmd script after setting up the environment in "C/Tre.Vietnam/".
If you want a quick setup, we recommend that you check [Releases](https://github.com/Tre-VN/Tre/releases/) to download the full build from the assets.
## Reporting Bugs and Suggesting Features

Please report all bugs related to Tre in the [GitHub Issues Page](https://github.com/Tre-VN/Tre/issues/).
If you wish to communicate with the creator, you can contact me through Gmail or Discord.
- Discord: Haruma-VN#3635
- Gmail: harumascaremath@gmail.com
- Discord server: https://discord.gg/fuJB2vxS

## Building Scripts

If you need to fix any scripts in Tre, you can install TypeScript using the following command:

```sh
$npm i -g typescript
```
Initialize the environment with the following command:

```sh
$tsc --init
```
fter making changes, generate the JavaScript scripts with the following command:

```sh
$tsc
```


## License

This tool is licensed under the GNU License. If you want to use Tre, you are free to do so as long as your program has the same license as Tre and its source code is open on GitHub.

## Acknowledgements

I would like to extend my special thanks to the following individuals for their contributions to this project:

- [TwinStar](https://github.com/twinkles-twinstar) for his [TwinStar.ToolKit](https://github.com/twinkles-twinstar/TwinStar.ToolKit), which served as the basis for this tool.
- [迎风听雨](https://github.com/YingFengTingYu) for his [PopStudio](https://github.com/YingFengTingYu/PopStudio), from which we adapted many functions.
- [Nineteendo](https://github.com/Nineteendo) for his invaluable help with implementation and grammar.

**Happy Modding!**

