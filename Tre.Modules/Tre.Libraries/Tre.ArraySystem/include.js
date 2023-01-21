'use strict';
const Tre = new Object();
Tre.Include = new Array();
Tre.Include.push(
    {
        children: "./Libraries/Tre.StrictMode.js",
        parent: "Tre.ArraySystem.js"
    },
    {
        children: "./Libraries/TreChecker.js",
        parent: "Tre.ArraySystem.js"
    },
    {
        children: "./Libraries/TreLoop.js",
        parent: "Tre.ArraySystem.js"
    },
    {
        children: "./Libraries/TreFilter.js",
        parent: "Tre.ArraySystem.js"
    });