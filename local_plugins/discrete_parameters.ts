
import { MarkdownApplication, MarkdownPageEvent, MarkdownTheme, MarkdownThemeContext } from 'typedoc-plugin-markdown';
import { MyMarkdownTheme } from './MyMarkdownTheme';
import 'typedoc';
import { Models, DefaultTheme } from 'typedoc';

//console.log('loaded');
export function load(app: MarkdownApplication) {
  // app.renderer.on('content.begin', 


  // )
  app.renderer.defineTheme('customTheme', MyMarkdownTheme);
  // app.renderer.on(MarkdownPageEvent.BEGIN, (page: MarkdownPageEvent) => {
  //   //page.contents = page.contents.replace('foo', 'bar');
  //   page.contents.
  //  });
}

