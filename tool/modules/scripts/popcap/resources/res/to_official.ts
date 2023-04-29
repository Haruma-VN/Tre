"use strict";
import check_resource from "./check.js";
import fs_js from "../../../../library/fs/implement.js";

class to_official extends check_resource {
    /**
     *
     * @param packet - Pass packet here
     * @param subgroup_parent_name - Pass "id", example "_1536", "_768"
     * @param subgroup_default_parent - Pass default parent which contains whole subgroups
     * @returns
     */
    private static convert_img<Template extends packet_data>(
        packet: Template,
        subgroup_parent_name: string,
        subgroup_default_parent: string,
        res_type: resolution,
        expand_path_for_array: boolean,
    ): resource_atlas_and_sprites {
        const manifest_group_for_atlas_and_sprite: resource_atlas_and_sprites = {
            id: subgroup_parent_name,
            parent: subgroup_default_parent,
            res: res_type as string,
            resources: [],
            type: "simple",
        };
        const resource_atlas_parent: Array<string> = Object.keys(packet.packet);
        for (let index: number = 0; index < resource_atlas_parent.length; ++index) {
            const resource_atlas_children_sprites_id: Array<string> = Object.keys(
                packet.packet[resource_atlas_parent[index]].data,
            );
            manifest_group_for_atlas_and_sprite.resources.push({
                slot: 0,
                id: resource_atlas_parent[index],
                path: expand_path_for_array
                    ? packet.packet[resource_atlas_parent[index]].path
                    : ((packet.packet[resource_atlas_parent[index]].path as Array<string> & any).join("\\") as string &
                          any),
                type: (packet.packet[resource_atlas_parent[index]] as any).type,
                atlas: true,
                width: (packet.packet[resource_atlas_parent[index]].dimension as any).width,
                height: (packet.packet[resource_atlas_parent[index]].dimension as any).height,
                runtime: true,
            });
            for (let j_index: number = 0; j_index < resource_atlas_children_sprites_id.length; ++j_index) {
                this.check_integer_number(
                    (packet.packet[resource_atlas_parent[index]].data as any)[
                        resource_atlas_children_sprites_id[j_index]
                    ].default.ax,
                );
                this.check_integer_number(
                    (packet.packet[resource_atlas_parent[index]].data as any)[
                        resource_atlas_children_sprites_id[j_index]
                    ].default.ay,
                );
                this.check_integer_number(
                    (packet.packet[resource_atlas_parent[index]].data as any)[
                        resource_atlas_children_sprites_id[j_index]
                    ].default.ah,
                );
                this.check_integer_number(
                    (packet.packet[resource_atlas_parent[index]].data as any)[
                        resource_atlas_children_sprites_id[j_index]
                    ].default.aw,
                );
                manifest_group_for_atlas_and_sprite.resources.push(
                    (packet.packet[resource_atlas_parent[index]].data as any)[
                        resource_atlas_children_sprites_id[j_index]
                    ].default.cols !== undefined &&
                        (packet.packet[resource_atlas_parent[index]].data as any)[
                            resource_atlas_children_sprites_id[j_index]
                        ].default.cols !== null &&
                        (packet.packet[resource_atlas_parent[index]].data as any)[
                            resource_atlas_children_sprites_id[j_index]
                        ].default.cols !== void 0 &&
                        this.check_integer_number(
                            (packet.packet[resource_atlas_parent[index]].data as any)[
                                resource_atlas_children_sprites_id[j_index]
                            ].default.cols,
                        )
                        ? {
                              slot: 0,
                              id: resource_atlas_children_sprites_id[j_index],
                              path: expand_path_for_array
                                  ? (packet.packet[resource_atlas_parent[index]].data as any)[
                                        resource_atlas_children_sprites_id[j_index]
                                    ].path
                                  : ((packet.packet[resource_atlas_parent[index]].data as any)[
                                        resource_atlas_children_sprites_id[j_index]
                                    ].path.join("\\") as string & any),
                              type: (packet.packet[resource_atlas_parent[index]].data as any)[
                                  resource_atlas_children_sprites_id[j_index]
                              ].type,
                              parent: resource_atlas_parent[index],
                              ax:
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ax !== undefined &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ax !== null &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ax !== void 0 &&
                                  this.check_integer_number(
                                      (packet.packet[resource_atlas_parent[index]] as any).data[
                                          resource_atlas_children_sprites_id[j_index]
                                      ].default.ax,
                                  ) &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ax > 0
                                      ? (packet.packet[resource_atlas_parent[index]] as any).data[
                                            resource_atlas_children_sprites_id[j_index]
                                        ].default.ax
                                      : Math.abs(
                                            (packet.packet[resource_atlas_parent[index]] as any).data[
                                                resource_atlas_children_sprites_id[j_index]
                                            ].default.ax,
                                        ),
                              ay:
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ay !== undefined &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ay !== null &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ay !== void 0 &&
                                  this.check_integer_number(
                                      (packet.packet[resource_atlas_parent[index]] as any).data[
                                          resource_atlas_children_sprites_id[j_index]
                                      ].default.ay,
                                  ) &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ay > 0
                                      ? (packet.packet[resource_atlas_parent[index]] as any).data[
                                            resource_atlas_children_sprites_id[j_index]
                                        ].default.ay
                                      : Math.abs(
                                            (packet.packet[resource_atlas_parent[index]] as any).data[
                                                resource_atlas_children_sprites_id[j_index]
                                            ].default.ay,
                                        ),
                              aw:
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.aw !== undefined &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.aw !== null &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.aw !== void 0 &&
                                  this.check_integer_number(
                                      (packet.packet[resource_atlas_parent[index]] as any).data[
                                          resource_atlas_children_sprites_id[j_index]
                                      ].default.aw,
                                  ) &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.aw > 0
                                      ? (packet.packet[resource_atlas_parent[index]] as any).data[
                                            resource_atlas_children_sprites_id[j_index]
                                        ].default.aw
                                      : Math.abs(
                                            (packet.packet[resource_atlas_parent[index]] as any).data[
                                                resource_atlas_children_sprites_id[j_index]
                                            ].default.aw,
                                        ),
                              ah:
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ah !== undefined &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ah !== null &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ah !== void 0 &&
                                  this.check_integer_number(
                                      (packet.packet[resource_atlas_parent[index]] as any).data[
                                          resource_atlas_children_sprites_id[j_index]
                                      ].default.ah,
                                  ) &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ah > 0
                                      ? (packet.packet[resource_atlas_parent[index]] as any).data[
                                            resource_atlas_children_sprites_id[j_index]
                                        ].default.ah
                                      : Math.abs(
                                            (packet.packet[resource_atlas_parent[index]] as any).data[
                                                resource_atlas_children_sprites_id[j_index]
                                            ].default.ah,
                                        ),
                              x:
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.x !== undefined &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.x !== null &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.x !== void 0 &&
                                  this.check_integer_number(
                                      (packet.packet[resource_atlas_parent[index]] as any).data[
                                          resource_atlas_children_sprites_id[j_index]
                                      ].default.x,
                                  )
                                      ? (packet.packet[resource_atlas_parent[index]] as any).data[
                                            resource_atlas_children_sprites_id[j_index]
                                        ].default.x
                                      : 0,
                              y:
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.y !== undefined &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.y !== null &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.y !== void 0 &&
                                  this.check_integer_number(
                                      (packet.packet[resource_atlas_parent[index]] as any).data[
                                          resource_atlas_children_sprites_id[j_index]
                                      ].default.y,
                                  )
                                      ? (packet.packet[resource_atlas_parent[index]] as any).data[
                                            resource_atlas_children_sprites_id[j_index]
                                        ].default.y
                                      : 0,
                              cols: (packet.packet[resource_atlas_parent[index]].data as any)[
                                  resource_atlas_children_sprites_id[j_index]
                              ].default.cols,
                          }
                        : {
                              slot: 0,
                              id: resource_atlas_children_sprites_id[j_index],
                              path: expand_path_for_array
                                  ? (packet.packet[resource_atlas_parent[index]].data as any)[
                                        resource_atlas_children_sprites_id[j_index]
                                    ].path
                                  : ((packet.packet[resource_atlas_parent[index]].data as any)[
                                        resource_atlas_children_sprites_id[j_index]
                                    ].path.join("\\") as string & any),
                              type: (packet.packet[resource_atlas_parent[index]].data as any)[
                                  resource_atlas_children_sprites_id[j_index]
                              ].type,
                              parent: resource_atlas_parent[index],
                              ax:
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ax !== undefined &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ax !== null &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ax !== void 0 &&
                                  this.check_integer_number(
                                      (packet.packet[resource_atlas_parent[index]] as any).data[
                                          resource_atlas_children_sprites_id[j_index]
                                      ].default.ax,
                                  ) &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ax > 0
                                      ? (packet.packet[resource_atlas_parent[index]] as any).data[
                                            resource_atlas_children_sprites_id[j_index]
                                        ].default.ax
                                      : Math.abs(
                                            (packet.packet[resource_atlas_parent[index]] as any).data[
                                                resource_atlas_children_sprites_id[j_index]
                                            ].default.ax,
                                        ),
                              ay:
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ay !== undefined &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ay !== null &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ay !== void 0 &&
                                  this.check_integer_number(
                                      (packet.packet[resource_atlas_parent[index]] as any).data[
                                          resource_atlas_children_sprites_id[j_index]
                                      ].default.ay,
                                  ) &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ay > 0
                                      ? (packet.packet[resource_atlas_parent[index]] as any).data[
                                            resource_atlas_children_sprites_id[j_index]
                                        ].default.ay
                                      : Math.abs(
                                            (packet.packet[resource_atlas_parent[index]] as any).data[
                                                resource_atlas_children_sprites_id[j_index]
                                            ].default.ay,
                                        ),
                              aw:
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.aw !== undefined &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.aw !== null &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.aw !== void 0 &&
                                  this.check_integer_number(
                                      (packet.packet[resource_atlas_parent[index]] as any).data[
                                          resource_atlas_children_sprites_id[j_index]
                                      ].default.aw,
                                  ) &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.aw > 0
                                      ? (packet.packet[resource_atlas_parent[index]] as any).data[
                                            resource_atlas_children_sprites_id[j_index]
                                        ].default.aw
                                      : Math.abs(
                                            (packet.packet[resource_atlas_parent[index]] as any).data[
                                                resource_atlas_children_sprites_id[j_index]
                                            ].default.aw,
                                        ),
                              ah:
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ah !== undefined &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ah !== null &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ah !== void 0 &&
                                  this.check_integer_number(
                                      (packet.packet[resource_atlas_parent[index]] as any).data[
                                          resource_atlas_children_sprites_id[j_index]
                                      ].default.ah,
                                  ) &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.ah > 0
                                      ? (packet.packet[resource_atlas_parent[index]] as any).data[
                                            resource_atlas_children_sprites_id[j_index]
                                        ].default.ah
                                      : Math.abs(
                                            (packet.packet[resource_atlas_parent[index]] as any).data[
                                                resource_atlas_children_sprites_id[j_index]
                                            ].default.ah,
                                        ),
                              x:
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.x !== undefined &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.x !== null &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.x !== void 0 &&
                                  this.check_integer_number(
                                      (packet.packet[resource_atlas_parent[index]] as any).data[
                                          resource_atlas_children_sprites_id[j_index]
                                      ].default.x,
                                  )
                                      ? (packet.packet[resource_atlas_parent[index]] as any).data[
                                            resource_atlas_children_sprites_id[j_index]
                                        ].default.x
                                      : 0,
                              y:
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.y !== undefined &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.y !== null &&
                                  (packet.packet[resource_atlas_parent[index]] as any).data[
                                      resource_atlas_children_sprites_id[j_index]
                                  ].default.y !== void 0 &&
                                  this.check_integer_number(
                                      (packet.packet[resource_atlas_parent[index]] as any).data[
                                          resource_atlas_children_sprites_id[j_index]
                                      ].default.y,
                                  )
                                      ? (packet.packet[resource_atlas_parent[index]] as any).data[
                                            resource_atlas_children_sprites_id[j_index]
                                        ].default.y
                                      : 0,
                          },
                );
            }
        }
        return manifest_group_for_atlas_and_sprite;
    }
    private static convert_file<Template extends packet_data, Value_Return extends Resource_File_Bundle>(
        res_subgroup_children: Template,
        subgroup_id: string,
        expand_path_for_array: boolean,
        subgroup_parent?: string,
    ): Value_Return | Resource_File_Bundle {
        const template_resource_build: Value_Return | Resource_File_Bundle = subgroup_parent
            ? {
                  id: subgroup_id,
                  parent: subgroup_parent,
                  resources: [],
                  type: "simple",
              }
            : {
                  id: subgroup_id,
                  resources: [],
                  type: "simple",
              };
        const resource_data: Array<string> = Object.keys((res_subgroup_children as any).packet.data);
        for (let index: number = 0; index < resource_data.length; ++index) {
            this.check_string((res_subgroup_children.packet.data as any)[resource_data[index]].type as string & any);
            template_resource_build.resources.push(
                (res_subgroup_children.packet.data as any)[resource_data[index]].srcpath !== undefined &&
                    (res_subgroup_children.packet.data as any)[resource_data[index]].srcpath !== null &&
                    (res_subgroup_children.packet.data as any)[resource_data[index]].srcpath !== void 0 &&
                    Array.isArray((res_subgroup_children.packet.data as any)[resource_data[index]].srcpath)
                    ? {
                          slot: 0,
                          id: resource_data[index],
                          path: expand_path_for_array
                              ? (res_subgroup_children.packet.data as any)[resource_data[index]].path
                              : ((
                                    (res_subgroup_children.packet.data as any)[resource_data[index]]
                                        .path as Array<string> & any
                                ).join("\\") as string & any),
                          type: (res_subgroup_children.packet.data as any)[resource_data[index]].type as string & any,
                          forceOriginalVectorSymbolSize: (res_subgroup_children.packet.data as any)[
                              resource_data[index]
                          ].forceOriginalVectorSymbolSize,
                          srcpath: expand_path_for_array
                              ? (res_subgroup_children.packet.data as any)[resource_data[index]].srcpath
                              : ((
                                    (res_subgroup_children.packet.data as any)[resource_data[index]]
                                        .srcpath as Array<string> & any
                                ).join("\\") as string & any),
                      }
                    : {
                          slot: 0,
                          id: resource_data[index],
                          path: expand_path_for_array
                              ? (res_subgroup_children.packet.data as any)[resource_data[index]].path
                              : ((
                                    (res_subgroup_children.packet.data as any)[resource_data[index]]
                                        .path as Array<string> & any
                                ).join("\\") as string & any),
                          type: (res_subgroup_children.packet.data as any)[resource_data[index]].type as string & any,
                          forceOriginalVectorSymbolSize: (res_subgroup_children.packet.data as any)[
                              resource_data[index]
                          ].forceOriginalVectorSymbolSize,
                      },
            );
        }
        return template_resource_build;
    }
    private static generate_composite<Template extends subgroup_children>(
        subgroup: Template,
        subgroup_parent: string,
    ): composite_object {
        const composite_object: composite_object = {
            id: subgroup_parent,
            subgroups: [],
            type: "composite",
        };
        const subgroups_keys: Array<string> = Object.keys(subgroup);
        for (let index: number = 0; index < subgroups_keys.length; ++index) {
            composite_object.subgroups.push(
                subgroup[subgroups_keys[index]].type !== undefined &&
                    subgroup[subgroups_keys[index]].type !== null &&
                    subgroup[subgroups_keys[index]].type !== void 0 &&
                    this.check_string(subgroup[subgroups_keys[index]].type)
                    ? {
                          id: subgroups_keys[index],
                          res: subgroup[subgroups_keys[index]].type,
                      }
                    : ({
                          id: subgroups_keys[index],
                      } as any),
            );
        }
        return composite_object;
    }
    public static do_process_whole<
        Res_Json_Template extends res_json,
        Resource_json_Template extends Resources_Group_Structure_Template,
    >(res_json: Res_Json_Template): Resource_json_Template {
        this.check_res_json(res_json);
        const resources_json: Resource_json_Template = {
            version: 1,
            content_version: 1,
            slot_count: 0,
            groups: [],
        } as any & Resource_json_Template;
        const res_json_groups: subgroup_parent = res_json.groups;
        const subgroups_key: Array<string> = Object.keys(res_json_groups);
        for (let index: number = 0; index < subgroups_key.length; ++index) {
            if (res_json.groups[subgroups_key[index]].is_composite === true) {
                const create_subgroup_placeholder: Array<string> = Object.keys(
                    res_json.groups[subgroups_key[index]].subgroup,
                );
                (resources_json as any).groups.push(
                    this.generate_composite<subgroup_children>(
                        res_json.groups[subgroups_key[index]].subgroup,
                        subgroups_key[index],
                    ),
                );
                for (let j_index: number = 0; j_index < create_subgroup_placeholder.length; ++j_index) {
                    if (
                        res_json.groups[subgroups_key[index]].subgroup[create_subgroup_placeholder[j_index]].type !==
                            null &&
                        res_json.groups[subgroups_key[index]].subgroup[create_subgroup_placeholder[j_index]].type !==
                            undefined &&
                        res_json.groups[subgroups_key[index]].subgroup[create_subgroup_placeholder[j_index]].type !==
                            void 0 &&
                        this.check_string(
                            res_json.groups[subgroups_key[index]].subgroup[create_subgroup_placeholder[j_index]].type,
                        )
                    ) {
                        (resources_json as any).groups.push(
                            this.convert_img<packet_data>(
                                res_json.groups[subgroups_key[index]].subgroup[
                                    create_subgroup_placeholder[j_index]
                                ] as any,
                                create_subgroup_placeholder[j_index],
                                subgroups_key[index],
                                res_json.groups[subgroups_key[index]].subgroup[create_subgroup_placeholder[j_index]]
                                    .type as resolution & any,
                                res_json.expand_path === "array",
                            ),
                        );
                    } else {
                        (resources_json as any).groups.push(
                            this.convert_file<packet_data, Resource_File_Bundle>(
                                res_json.groups[subgroups_key[index]].subgroup[
                                    create_subgroup_placeholder[j_index]
                                ] as any,
                                create_subgroup_placeholder[j_index],
                                res_json.expand_path === "array",
                                subgroups_key[index],
                            ),
                        );
                    }
                }
            } else {
                const create_subgroup_placeholder: Array<string> = Object.keys(
                    res_json.groups[subgroups_key[index]].subgroup,
                );
                for (let j_index: number = 0; j_index < create_subgroup_placeholder.length; ++j_index) {
                    (resources_json as any).groups.push(
                        this.convert_file<packet_data, Resource_File_Bundle>(
                            res_json.groups[subgroups_key[index]].subgroup[create_subgroup_placeholder[j_index]] as any,
                            create_subgroup_placeholder[j_index],
                            res_json.expand_path === "array",
                        ),
                    );
                }
            }
        }
        ((resources_json as any).groups satisfies Array<resource_atlas_and_sprites>).forEach(
            (element: resource_atlas_and_sprites, k_lambda_index: number) => {
                if ("resources" in element) {
                    ((resources_json as any).groups[k_lambda_index].resources as Array<blank_slot>).forEach(
                        (resource_element: blank_slot, lambda_index: number) => {
                            ((resources_json as any).groups[k_lambda_index].resources as Array<blank_slot>)[
                                lambda_index
                            ].slot = (resources_json as any).slot_count;
                            (resources_json as any).slot_count++;
                        },
                    );
                }
            },
        );
        return resources_json;
    }
    public static create_conversion(file_input: string, output_file: string = `${file_input}/../RESOURCES.json`): void {
        const res_json: res_json = fs_js.read_json(file_input) as res_json;
        fs_js.write_json(output_file, this.do_process_whole<res_json, Resources_Group_Structure_Template>(res_json));
        fs_js.execution_out(output_file);
    }
}

export default to_official;
