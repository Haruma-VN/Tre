declare type js_void = {
    [x: string]: render_toolkit_expression,
}

declare type render_toolkit_expression = {
    filter: Array<string>,
    allow: boolean,
    option: number,
}