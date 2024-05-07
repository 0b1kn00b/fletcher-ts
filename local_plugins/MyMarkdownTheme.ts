import { Models, Options, Reflection } from "typedoc";

import { MarkdownPageEvent, MarkdownRenderer, MarkdownTheme, MarkdownThemeContext } from "typedoc-plugin-markdown";

import { partials } from '../node_modules/typedoc-plugin-markdown/dist/theme/resources';
import { backTicks, table } from '../node_modules/typedoc-plugin-markdown/dist/libs/markdown';
import { removeLineBreaks } from '../node_modules/typedoc-plugin-markdown/dist/libs/utils';
import { MarkdownThemeContext as LocalMarkdonThemeContext } from '../node_modules/typedoc-plugin-markdown/dist/theme';
import { ParameterReflection, ReflectionKind, ReflectionType } from 'typedoc';

function new_partials(self){
  const next_partials = partials(self);
  const old_parametersTable = next_partials.parametersTable;
  function do_new_parametersTable(model){
    return '<details>  \n\n' + old_parametersTable(model) + '  \n\n</details';
  }
  next_partials.parametersTable = do_new_parametersTable;
  const old_typeParametersTable = next_partials.typeParametersTable;
  function do_new_typeParametersTable(model){
    return '<details>  \n\n' + old_typeParametersTable(model) + '  \n\n</details';
  }
  next_partials.typeParametersTable = do_new_typeParametersTable;
  return next_partials;
}
export class MyMarkdownTheme extends MarkdownTheme {
  constructor(renderer:MarkdownRenderer){
    super(renderer);
  }
  getRenderContext(page) {
    //return new MyMarkdownThemeContext(this,page,this.application.options);
    return new MyMarkdownThemeContext(this,page,this.application.options);
  }
}
class MyMarkdownThemeContext extends MarkdownThemeContext {
  partials = new_partials(this)

  // constructor(theme: MarkdownTheme, page: MarkdownPageEvent<Reflection>, options: Options){
  //   super(theme,page,options);
  //   const { parametersTable, ...params} = this.partials;
  //     }
}
/**
 * @category Member Partials
 */
export function do_parametersTable(
  this: LocalMarkdonThemeContext,
  model: ParameterReflection[],
): string {
  const parseParams = (current: any, acc: any) => {
    const shouldFlatten =
      current.type?.declaration?.kind === ReflectionKind.TypeLiteral &&
      current.type?.declaration?.children;
    return shouldFlatten
      ? [...acc, current, ...flattenParams(current)]
      : [...acc, current];
  };

  const flattenParams = (current: any) => {
    return current.type?.declaration?.children?.reduce(
      (acc: any, child: any) => {
        const childObj = {
          ...child,
          name: `${current.name}.${child.name}`,
        };
        return parseParams(childObj, acc);
      },
      [],
    );
  };

  const showDefaults = hasDefaultValues(model);

  const parsedParams = model.reduce(
    (acc: any, current: any) => parseParams(current, acc),
    [],
  );

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

  const firstOptionalParamIndex = model.findIndex(
    (parameter) => parameter.flags.isOptional,
  );

  const rows: string[][] = [];

  parsedParams.forEach((parameter, i) => {
    const row: string[] = [];

    const isOptional =
      parameter.flags.isOptional ||
      (firstOptionalParamIndex !== -1 && i > firstOptionalParamIndex);

    const rest = parameter.flags.isRest ? '...' : '';

    const optional = isOptional ? '?' : '';

    row.push(`${rest}${backTicks(parameter.name)}${optional}`);

    if (parameter.type) {
      const displayType =
        parameter.type instanceof ReflectionType
          ? this.partials.reflectionType(parameter.type, {
              foreCollpase: true,
            })
          : this.partials.someType(parameter.type);
      row.push(removeLineBreaks(displayType));
    }

    if (showDefaults) {
      row.push(backTicks(this.helpers.getParameterDefaultValue(parameter)));
    }

    if (hasComments) {
      if (parameter.comment) {
        row.push(
          this.partials.comment(parameter.comment, { isTableColumn: true }),
        );
      } else {
        row.push('-');
      }
    }
    rows.push(row);
  });

  return '<details><summary>parameters</summary>  \n\n' + table(headers, rows) + '  \n\n</details';
}

function hasDefaultValues(parameters: ParameterReflection[]) {
  const defaultValues = (parameters as ParameterReflection[]).map(
    (param) =>
      param.defaultValue !== '{}' &&
      param.defaultValue !== '...' &&
      !!param.defaultValue,
  );

  return !defaultValues.every((value) => !value);
}