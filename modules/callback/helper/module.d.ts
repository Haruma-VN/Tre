declare type evaluation_script = {
    notify: boolean,
    modules: Array<tre_evaluation_object>,
}


declare type tre_evaluation_object = {
    func: string,
    notify: null | string,
    path: Array<string>,
}
