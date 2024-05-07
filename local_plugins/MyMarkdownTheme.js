"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.do_parametersTable = exports.MyMarkdownTheme = void 0;
const typedoc_plugin_markdown_1 = require("typedoc-plugin-markdown");
const resources_1 = require("../node_modules/typedoc-plugin-markdown/dist/theme/resources");
const markdown_1 = require("../node_modules/typedoc-plugin-markdown/dist/libs/markdown");
const utils_1 = require("../node_modules/typedoc-plugin-markdown/dist/libs/utils");
const typedoc_1 = require("typedoc");
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
/**
 * @category Member Partials
 */
function do_parametersTable(model) {
    const parseParams = (current, acc) => {
        const shouldFlatten = current.type?.declaration?.kind === typedoc_1.ReflectionKind.TypeLiteral &&
            current.type?.declaration?.children;
        return shouldFlatten
            ? [...acc, current, ...flattenParams(current)]
            : [...acc, current];
    };
    const flattenParams = (current) => {
        return current.type?.declaration?.children?.reduce((acc, child) => {
            const childObj = {
                ...child,
                name: `${current.name}.${child.name}`,
            };
            return parseParams(childObj, acc);
        }, []);
    };
    const showDefaults = hasDefaultValues(model);
    const parsedParams = model.reduce((acc, current) => parseParams(current, acc), []);
    const hasComments = parsedParams.some((param) => Boolean(param.comment));
    const headers = [
        this.getText('kind.parameter.singular'),
        this.getText('label.type'),
    ];
    if (showDefaults) {
        headers.push(this.getText('label.defaultValue'));
    }
    if (hasComments) {
        headers.push(this.getText('label.description'));
    }
    const firstOptionalParamIndex = model.findIndex((parameter) => parameter.flags.isOptional);
    const rows = [];
    parsedParams.forEach((parameter, i) => {
        const row = [];
        const isOptional = parameter.flags.isOptional ||
            (firstOptionalParamIndex !== -1 && i > firstOptionalParamIndex);
        const rest = parameter.flags.isRest ? '...' : '';
        const optional = isOptional ? '?' : '';
        row.push(`${rest}${(0, markdown_1.backTicks)(parameter.name)}${optional}`);
        if (parameter.type) {
            const displayType = parameter.type instanceof typedoc_1.ReflectionType
                ? this.partials.reflectionType(parameter.type, {
                    foreCollpase: true,
                })
                : this.partials.someType(parameter.type);
            row.push((0, utils_1.removeLineBreaks)(displayType));
        }
        if (showDefaults) {
            row.push((0, markdown_1.backTicks)(this.helpers.getParameterDefaultValue(parameter)));
        }
        if (hasComments) {
            if (parameter.comment) {
                row.push(this.partials.comment(parameter.comment, { isTableColumn: true }));
            }
            else {
                row.push('-');
            }
        }
        rows.push(row);
    });
    return '<details><summary>parameters</summary>  \n\n' + (0, markdown_1.table)(headers, rows) + '  \n\n</details';
}
exports.do_parametersTable = do_parametersTable;
function hasDefaultValues(parameters) {
    const defaultValues = parameters.map((param) => param.defaultValue !== '{}' &&
        param.defaultValue !== '...' &&
        !!param.defaultValue);
    return !defaultValues.every((value) => !value);
}
