"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = void 0;
const MyMarkdownTheme_1 = require("./MyMarkdownTheme");
require("typedoc");
//console.log('loaded');
function load(app) {
    // app.renderer.on('content.begin', 
    // )
    app.renderer.defineTheme('customTheme', MyMarkdownTheme_1.MyMarkdownTheme);
    // app.renderer.on(MarkdownPageEvent.BEGIN, (page: MarkdownPageEvent) => {
    //   //page.contents = page.contents.replace('foo', 'bar');
    //   page.contents.
    //  });
}
exports.load = load;
