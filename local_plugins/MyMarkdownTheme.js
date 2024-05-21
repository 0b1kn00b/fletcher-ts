"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyMarkdownTheme = void 0;
const typedoc_plugin_markdown_1 = require("typedoc-plugin-markdown");
const resources_1 = require("../node_modules/typedoc-plugin-markdown/dist/theme/resources");
function new_partials(self) {
    const next_partials = (0, resources_1.partials)(self);
    const old_parametersTable = next_partials.parametersTable;
    function do_new_parametersTable(model) {
        return '<details>  \n\n' + old_parametersTable(model) + '  \n\n</details';
    }
    next_partials.parametersTable = do_new_parametersTable;
    const old_typeParametersTable = next_partials.typeParametersTable;
    function do_new_typeParametersTable(model) {
        return '<details>  \n\n' + old_typeParametersTable(model) + '  \n\n</details';
    }
    next_partials.typeParametersTable = do_new_typeParametersTable;
    return next_partials;
}
class MyMarkdownTheme extends typedoc_plugin_markdown_1.MarkdownTheme {
    constructor(renderer) {
        super(renderer);
    }
    getRenderContext(page) {
        //return new MyMarkdownThemeContext(this,page,this.application.options);
        return new MyMarkdownThemeContext(this, page, this.application.options);
    }
}
exports.MyMarkdownTheme = MyMarkdownTheme;
class MyMarkdownThemeContext extends typedoc_plugin_markdown_1.MarkdownThemeContext {
    partials = new_partials(this);
}
