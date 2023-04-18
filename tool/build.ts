"use strict";
import path from "node:path";
import exe from "@angablue/exe";

const create_data_view_config = {
    entry: "./main.js",
    out: "./Tre.exe",
    pkg: ["-C", "GZip"],
    version: "3.0.0 public beta",
    target: "latest-win-x64",
    icon: "./extension/appicon/icon.ico",
    properties: {
        FileDescription: "Tre",
        ProductName: "Tre",
        LegalCopyright: "Copyright © 2023 Haruma-VN",
        OriginalFilename: "Tre.exe",
    },
    files: ["./Tre.exe", "./node_modules/**/*"],
    optimization: {
        minimize: true,
    },
};
const build = exe(create_data_view_config);

build.then(() => {
    console.log(
        `\x1b[32m◉ NodeJS Application: ${create_data_view_config.properties.ProductName}\x1b[0m`
    );
    console.log(`\x1b[32m◉ Version: ${create_data_view_config.version}\x1b[0m`);
    console.log(
        `\x1b[32m◉ Entry: ${path.resolve(create_data_view_config.entry)}\x1b[0m`
    );
    console.log(
        `\x1b[32m◉ Build: ${path.resolve(create_data_view_config.out)}\x1b[0m`
    );
    console.log(`\x1b[32m◉ Target: ${create_data_view_config.target}!\x1b[0m`);
    if (create_data_view_config.pkg.includes("GZip")) {
        console.log(`\x1b[32m◉ Compression Method: GZip\x1b[0m`);
    }
    console.log(`\x1b[32m◉ Finished build!\x1b[0m`);
});
