"use strict";
export enum TexFmt {
    // PvZ2, PvZ2C & PvZFree for Android and iOS
    ARGB8888,
    ABRG8888 = 0,
    RGBA4444,
    RGB565,
    RGBA5551,

    // Unknown
    DXT5_RGBA_MortonBlock = 5,
    RGBA4444_Block = 21,
    RGB565_Block,
    RGBA5551_Block,
    // PvZ2 iOS Exclusive
    PVRTC_4BPP_RGBA = 30,
    // Unknown
    PVRTC_2BPP_RGBA,
    ETC1_RGB,
    ETC2_RGB,
    ETC2_RGBA,
    DXT1_RGB,
    DXT3_RGBA,
    DXT5_RGBA,
    ATITC_RGB,
    ATITC_RGBA,

    // PvZ2 & PvZ2C for Android
    ETC1_RGB_A8 = 147,
    ETC1_RGB_A_Index = 147,


    // Unknown
    PVRTC_4BPP_RGB_A8,
    XRGB8888_A8,
    ETC1_RGB_A_Palette,
}