declare type evaluation_script = {
    notify: boolean,
    modules: Array<tre_evaluation_object>,
}


declare type tre_evaluation_object = {
    func: string | null,
    notify: null | string,
    entry: Array<string> | null,
}


declare type SystemError = NodeJS.ErrnoException | string;