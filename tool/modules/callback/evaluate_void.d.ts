declare type js_void = {
    [x: string]: render_toolkit_expression;
};

declare type render_toolkit_expression = {
    filter: Array<string>;
    allow: boolean;
    option: number;
};

declare type assertation_argument = string | Array<string>;

declare type popcap_game_edit_method = string;

declare type js_evaluate = string;

declare type evaluate_method = number;

declare type evaluate_error = string;
