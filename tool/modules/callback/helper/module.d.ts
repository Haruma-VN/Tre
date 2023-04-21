declare type evaluate_script = {
    notify: boolean;
    modules: Array<tre_evaluate_object>;
};

declare type tre_evaluate_object = {
    func: string | null;
    notify: null | string;
    entry: Array<string> | null;
};

declare type SystemError = NodeJS.ErrnoException | string;
