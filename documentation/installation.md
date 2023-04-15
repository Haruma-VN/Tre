# Installation

`Tre` is a PvZ2-Modding tool. Its purpose is to simplify tasks and reduce difficulties for entry modders.

- [Platform Support](#Platform-Support)
- [Downloads](#Downloads)
- [Building Tre](#Building-Tre)

## Platform Support

Mainly Support: Windows 10+

For other platforms such as `Macintosh` or `Linux`, you can download the source code from GitHub and rebuild it yourself.

## Downloads

### Installer

You can download the `launcher` from [Distribution Page](https://github.com/Haruma-VN/Tre/releases/tag/installer) and launch it, specify a path to save `Tre` and wait the tool download. The launcher is written in `.NET` is outdated because the majority of people having `.NET 6.0` installed on their machine is limited, it is recommended to use the `launcher` written in Python. This can be used for future updates!

### Traditional download

You can download the `Tre.zip` from [Distribution Page](https://github.com/Haruma-VN/Tre/releases/tag/main), uncompress the zip to a place in your local machine. However, this traditional way takes too long since it requires you to go to GitHub everytime which takes so much time. It is recommended to use the `Launcher` instead.

## Building Tre

Here are the commands you need to do to clone this project:

```
$ git clone https://github.com/Haruma-VN/Tre.git
```

### Launcher

To build the `launcher`, you need to have Python & Requirements installed:

- [Python `3.9+`](https://www.python.org/)
- [ttkthemes](https://ttkthemes.readthedocs.io/en/latest/)
- [Pyinstaller](https://pyinstaller.org/en/stable/)
- [Powershell](https://learn.microsoft.com/en-us/powershell/)

You can use these commands with `powershell` to build Tre:

```
$ cd ./Tre/installer/python/
$ pyinstaller main.py --onefile
```

The later, you can find the python program ready in the `dist` folder. Hope this help you!

### Toolkit

To build `Tre`, you need to have these installed on your machine:

- [NodeJS `18.16.0+`](https://nodejs.org/en)
- [TypeScript `4.8+`](https://www.typescriptlang.org/)
- [Powershell](https://learn.microsoft.com/en-us/powershell/)

You can use these commands with `powershell` to build Tre:

```
$ cd ./Tre/installer/tool/
$ npm install
$ npm run build
$ node build.js
```

The later, you can find the program named `Tre.exe` in the folder. With other platforms, please consider edit the `build.ts` before you using `npm run build`. Hope this help you!

**Happy Modding!**
