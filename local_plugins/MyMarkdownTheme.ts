import { Models, Options, Reflection } from "typedoc";

import { MarkdownPageEvent, MarkdownRenderer, MarkdownTheme, MarkdownThemeContext } from "typedoc-plugin-markdown";

import { partials } from '../node_modules/typedoc-plugin-markdown/dist/theme/resources';

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
}