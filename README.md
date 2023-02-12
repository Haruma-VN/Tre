# Tre
## _A PvZ2 Tool can do modding tasks. The goal is to make modding easier._


Tre is a tool written in TypeScript and being converted to JavaScript to process in NodeJS. If you want to compile
Tre all you have to do is download the scripts, pkg,... and compile Tre.Modules so you won't have to launch it
with launch.cmd


## Features

- JS Execute (this function will be executing all JavaScript source code, especially you can call Tre functions in the script)
- Split and Concat PopCap Resources (Encode RTON is not working at the moment)
- Split and Concat PopCap Atlas (require you to split PopCap Resources to get the json data)
- Encode and Decode PopCap PTX (Currently support texture format 0, 30 and 147)
- Unpack and Pack RSGP (PGSR, RSG,...)
- Split and Concat PopCap JSON, can also Patch JSON and generate the patch for JSONs.

## Third Party

Tre currently using these tools as Third Party

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
## Installation

Tre requires [Node.js](https://nodejs.org/) to run.

If you want to compile Tre from TypeScript source code you can install TypeScript as well.
Run Tre with launch.cmd after you setup environment in "C/Tre.Vietnam/"
If you want the fast in charge use I recommend you check [Releases](https://github.com/Tre-VN/Tre/releases/) to download the full build from the Assets.
## Bugs Report and Implement Idea

All Bugs related to Tre please report in [GitHub Issues Page](https://github.com/Tre-VN/Tre/issues/).
If you wish to communicate with the creator you can communicate through gmail or discord.
Discord: Haruma-VN#3635,
Gmail: harumascaremath@gmail.com

## Fixing Scripts

Install TypeScript first:

```sh
npm i -g typescript
```
Initialize environment:

```sh
tsc --init
```
Generating your JavaScript scripts after fixing:

```sh
tsc
```


## License

This tool using GNU License, which mean if you want to use Tre you are free to use if your program is the same LICENSE with Tre and open source code on GitHub.

**Happy Modding!**

