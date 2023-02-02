"use strict";
export var TexFmt;
(function (TexFmt) {
    // PvZ2, PvZ2C & PvZFree for Android and iOS
    TexFmt[TexFmt["ARGB8888"] = 0] = "ARGB8888";
    TexFmt[TexFmt["ABRG8888"] = 0] = "ABRG8888";
    TexFmt[TexFmt["RGBA4444"] = 1] = "RGBA4444";
    TexFmt[TexFmt["RGB565"] = 2] = "RGB565";
    TexFmt[TexFmt["RGBA5551"] = 3] = "RGBA5551";
    // Unknown
    TexFmt[TexFmt["DXT5_RGBA_MortonBlock"] = 5] = "DXT5_RGBA_MortonBlock";
    TexFmt[TexFmt["RGBA4444_Block"] = 21] = "RGBA4444_Block";
    TexFmt[TexFmt["RGB565_Block"] = 22] = "RGB565_Block";
    TexFmt[TexFmt["RGBA5551_Block"] = 23] = "RGBA5551_Block";
    // PvZ2 iOS Exclusive
    TexFmt[TexFmt["PVRTC_4BPP_RGBA"] = 30] = "PVRTC_4BPP_RGBA";
    // Unknown
    TexFmt[TexFmt["PVRTC_2BPP_RGBA"] = 31] = "PVRTC_2BPP_RGBA";
    TexFmt[TexFmt["ETC1_RGB"] = 32] = "ETC1_RGB";
    TexFmt[TexFmt["ETC2_RGB"] = 33] = "ETC2_RGB";
    TexFmt[TexFmt["ETC2_RGBA"] = 34] = "ETC2_RGBA";
    TexFmt[TexFmt["DXT1_RGB"] = 35] = "DXT1_RGB";
    TexFmt[TexFmt["DXT3_RGBA"] = 36] = "DXT3_RGBA";
    TexFmt[TexFmt["DXT5_RGBA"] = 37] = "DXT5_RGBA";
    TexFmt[TexFmt["ATITC_RGB"] = 38] = "ATITC_RGB";
    TexFmt[TexFmt["ATITC_RGBA"] = 39] = "ATITC_RGBA";
    // PvZ2 & PvZ2C for Android
    TexFmt[TexFmt["ETC1_RGB_A8"] = 147] = "ETC1_RGB_A8";
    TexFmt[TexFmt["ETC1_RGB_A_Index"] = 147] = "ETC1_RGB_A_Index";
    // Unknown
    TexFmt[TexFmt["PVRTC_4BPP_RGB_A8"] = 148] = "PVRTC_4BPP_RGB_A8";
    TexFmt[TexFmt["XRGB8888_A8"] = 149] = "XRGB8888_A8";
    TexFmt[TexFmt["ETC1_RGB_A_Palette"] = 150] = "ETC1_RGB_A_Palette";
})(TexFmt || (TexFmt = {}));
