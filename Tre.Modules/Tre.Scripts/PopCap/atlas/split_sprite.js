"use strict";
import split_atlas from '../../../Tre.Libraries/Tre.Images/Utilities/split.js';
import readline from '../../../Tre.Progress/Readline/number.js';
import split_sprite from '../../../Tre.Progress/Timer/Tre.Timer.ReadLine.js';
export default function () {
    split_sprite(readline(1, 2), split_atlas);
};