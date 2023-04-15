# Tre

## Introduction

Tre is a modding tool for Plants vs. Zombies 2, written in TypeScript and being converted to JavaScript to run in NodeJS. Its goal is to make modding easier for people.

## Features

- Split and Concat PopCap Resources: Allows you to split and concatenate PopCap resources.
- Split and Concat PopCap Atlas: Requires you to split PopCap Resources to get the JSON data. Can also pack very fast from 1536 directly to 768 or 384.
- Encode and Decode PopCap PTX: Currently supports texture formats 0, 30, and 147.
- Unpack and Pack RSGP (PGSR, RSG, etc.).
- Unpack and Pack RSB (OBB, SMF, etc.).
- Split and Concat PopCap JSON: Can also patch JSON and generate the patch for JSONs. Adding diff to compare Localization PopCap Lawnstrings, now the tool can simply diff the json very fast without using WinDiff.
- PopCap RTON ~ JSON Conversion: Can do RTON to JSON, JSON to RTON. Can also support PvZ2C's RTONs and the tool will provide you the key.
- PopCap PAM: Allow the conversion between PAM ~ PAM.JSON, XFLs & Gif to PAM.
- WWise Media Encode: Can decode/encode BNK version 88, 112 & 140. Only support PopCap's PvZ2 WWise version number.

## Third Party Libraries

Tre currently uses the following third-party libraries:

| Name             | Link                                              |
| ---------------- | ------------------------------------------------- |
| Sharp            | https://github.com/lovell/sharp                   |
| Crypto-JS        | https://github.com/brix/crypto-js                 |
| fs-extra         | https://github.com/jprichardson/node-fs-extra     |
| maxrects-packer  | https://github.com/soimy/maxrects-packer          |
| prompt-sync      | https://github.com/heapwolf/prompt-sync           |
| smart-buffer     | https://github.com/JoshGlazebrook/smart-buffer    |
| etcpak           | https://github.com/wolfpld/etcpak                 |
| PVRTexTool-Cli   | https://developer.imaginationtech.com/pvrtextool/ |
| Real_Esrgan      | https://github.com/xinntao/Real-ESRGAN/           |
| cross-path-sort  | https://github.com/mdjermanovic/cross-path-sort   |
| stream-slice     | https://github.com/yorkie/stream-slice            |
| rijndael-js      | https://github.com/Snack-X/rijndael-js            |
| big-varint       | https://www.npmjs.com/package/big-varint          |
| bit-buffer       | https://github.com/inolen/bit-buffer              |
| xml-but-prettier | https://github.com/shockey/xml-but-prettier       |
| xml-mapping      | https://github.com/Inist-CNRS/node-xml-mapping    |
| cli-progress     | https://github.com/npkgz/cli-progress             |
| gif-frames       | https://github.com/benwiley4000/gif-frames        |

## Installation

To use Tre, you need to have [Node.js](https://nodejs.org/) installed on your machine. If you want to compile Tre from TypeScript source code, you can install TypeScript as well. To run Tre, use the launch.cmd script after setting up the environment in "C/Tre.Vietnam/".
If you want a quick setup, we recommend that you check [Releases](https://github.com/Tre-VN/Tre/releases/) to download the full build from the assets.

## Reporting Bugs and Suggesting Features

Please report all bugs related to Tre on [GitHub Issues Page](https://github.com/Tre-VN/Tre/issues/).
If you want to reach the creator, you can do so via

- Gmail harumascaremath@gmail.com
- Discord Haruma-VN#3635.
- Discord server: https://discord.gg/fuJB2vxS

## Building Tre

If you want to make changes to Tre scripts, you must first install TypeScript to your local machine with the following command:

```sh
$npm i -g typescript
```

Then initialise the environment:

```sh
$tsc --init
```

And finally, generate the javascript code:

```sh
$tsc
```

- If you want to run Tre with launch.cmd: use compiler mode "ESNext".
- If you want to make an executable: use compiler mode "commonjs".

## License

- Please note that this tool is licensed under the GNU License. If you want to use Tre, you are free to do so as long as your program has the same license as Tre and its source code is open on GitHub.

- Any violation of the terms and conditions of the GNU License is against the rules. We do not condone or support any unauthorized use, modification, or distribution of this tool.

- Therefore, all users of Tre comply with the terms of the GNU License and use the tool only in accordance with the license and usage guidelines. Thank you for your understanding and cooperation.

## Acknowledgements

I would like to extend my special thanks to the following individuals for their contributions to this project:

- [迎风听雨](https://github.com/YingFengTingYu) for his [PopStudio](https://github.com/YingFengTingYu/PopStudio), from which I adapted many functions.
- [TwinStar](https://github.com/twinkles-twinstar) for his [TwinStar.ToolKit](https://github.com/twinkles-twinstar/TwinStar.ToolKit), which served as the basis for this tool.
- [Nineteendo](https://github.com/Nineteendo) for his invaluable help with implementation and grammar.

My goal is the same as [TwinStar.ToolKit](https://github.com/twinkles-twinstar/TwinStar.ToolKit): to create an open technology project that enables people to use it freely and reduces technological barriers for entry-level modders. Working manually is highly uncreative and unproductive, as it takes too long. I recommend using Tre if you want to enhance productivity and create your own PvZ2-Mod.

**Happy Modding!**
