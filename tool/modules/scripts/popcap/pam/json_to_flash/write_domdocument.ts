"use strict";
export default function (pam_json: any) {
  let prev_end = {
    flow: -1,
    command: -1,
  };
  let flow_node: any = { DOMFrame: [] };
  let command_node:any = { DOMFrame: [] };
  pam_json.main_sprite.frame.map(function (frame: any, frame_index: any) {
    if (frame.label != null || frame.stop) {
      if (prev_end.flow + 1 < frame_index) {
        flow_node.DOMFrame.push({
          index: prev_end.flow + 1,
          duration: frame_index - (prev_end.flow + 1),
          elements: {},
        });
      }
      let node_element: any = new Object();
      if (frame.label != null) {
        node_element.index = frame_index;
        node_element.name = frame.label;
        node_element.labelType = "name";
        node_element.elements = {};
      }
      if (frame.stop) {
        node_element.index = frame_index;
        node_element.Actionscript = {
          script: {
            $cd: "stop();",
          },
        };
        node_element.elements = {};
      }
      flow_node.DOMFrame.push(node_element);
      prev_end.flow = frame_index;
    }
    if (frame.command.length > 0) {
      if (prev_end.command + 1 < frame_index) {
        command_node.DOMFrame.push({
          index: prev_end.command + 1,
          duration: frame_index - (prev_end.command + 1),
        });
      }
      let commands = new Array();
      frame.command.map(function (item: any) {
        commands.push(`fscommand(\"${item.command}\", \"${item.parameter}\");`);
      });
      const new_command = commands.join("\n\t\t\t\t\t\t\t\t\t");
      command_node.DOMFrame.push({
        index: frame_index,
        Actionscript: {
          script: {
            $cd: new_command,
          },
        },
      });
      prev_end.command = frame_index;
    }
  });
  if (prev_end.flow + 1 < pam_json.main_sprite.frame.length) {
    flow_node.DOMFrame.push({
      index: prev_end.flow + 1,
      duration: pam_json.main_sprite.frame.length - (prev_end.flow + 1),
    });
  }
  if (prev_end.command + 1 < pam_json.main_sprite.frame.length) {
    command_node.DOMFrame.push({
      index: prev_end.command + 1,
      duration: pam_json.main_sprite.frame.length - (prev_end.command + 1),
    });
  }
  const DOMBitmapItem = new Array();
  const IncludeSource = new Array();
  const IncludeImage = new Array();
  const IncludeSprite = new Array();
  pam_json.image.map(function (item: any, index: number) {
    DOMBitmapItem.push({
      name: `media/${item.name.split("|")[0]}`,
      href: `media/${item.name.split("|")[0]}.png`,
    });
    IncludeSource.push({
      href: `source/source_${index + 1}.xml`,
    });
    IncludeImage.push({
      href: `image/image_${index + 1}.xml`,
    });
  });
  pam_json.sprite.map(function (name: string, index: number) {
    IncludeSprite.push({
      href: `sprite/sprite_${index + 1}.xml`,
    });
  });
  const Include = [
    ...IncludeSource,
    ...IncludeImage,
    ...IncludeSprite,
    ...[{ href: "main_sprite.xml" }],
  ];
  const dom_document = {
    DOMDocument: {
      xmlns$xsi: "http://www.w3.org/2001/XMLSchema-instance",
      frameRate: pam_json.main_sprite.frame_rate,
      width: pam_json.size[0],
      height: pam_json.size[1],
      xflVersion: "2.971",
      xmlns: "http://ns.adobe.com/xfl/2008/",
      folders: {
        DOMFolderItem: [
          {
            name: "media",
            isExpanded: "true",
          },
          {
            name: "source",
            isExpanded: "true",
          },
          {
            name: "image",
            isExpanded: "true",
          },
          {
            name: "sprite",
            isExpanded: "true",
          },
        ],
      },
      media: { DOMBitmapItem },
      symbols: { Include },
      timelines: {
        DOMTimeline: {
          name: "animation",
          layers: {
            DOMLayer: [
              {
                name: "flow",
                frames: flow_node,
              },
              {
                name: "command",
                frames: command_node,
              },
              {
                name: "sprite",
                frames: {
                  DOMFrame: {
                    index: "0",
                    duration: pam_json.main_sprite.frame.length,
                    elements: {
                      DOMSymbolInstance: {
                        libraryItemName: "main_sprite",
                        symbolType: "graphic",
                        loop: "loop",
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  };
  return dom_document;
}
