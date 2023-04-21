declare type dom_document = {
    DOMDocument: DOMDocument;
};

declare type DOMDocument = {
    xmlns$xsi: string;
    frameRate: string;
    width: string;
    height: string;
    xflVersion: string;
    xmlns: string;
    folders: Folders;
    media: Media;
    symbols: Symbols;
    timelines: Timelines;
};

declare type Folders = {
    DOMFolderItem: DOMFolderItem[];
};

declare type DOMFolderItem = {
    name: string;
    isExpanded: string;
};

declare type Media = {
    DOMBitmapItem: DOMBitmapItem[];
};

declare type DOMBitmapItem = {
    name: string;
    href: string;
};

declare type Symbols = {
    Include: Include[];
};

declare type Include = {
    href: string;
};

declare type Timelines = {
    DOMTimeline: DOMTimeline;
};

declare type DOMTimeline = {
    name: string;
    layers: Layers;
};

declare type Layers = {
    DOMLayer: DOMLayer[];
};

declare type DOMLayer = {
    name: string;
    frames: Frames;
};

declare type Frames = {
    DOMFrame: DOMFrame[];
};

declare type DOMFrame = {
    index: string;
    name?: string;
    labelType?: string;
    duration?: string;
    Actionscript?: Actionscript;
    elements?: Elements;
};

declare type Actionscript = {
    script: {
        $cd: string;
    };
};

declare type Elements = {
    [key: string]: any;
};
