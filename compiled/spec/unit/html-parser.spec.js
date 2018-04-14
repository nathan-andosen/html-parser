"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../src");
describe('HtmlParser', function () {
    describe('parse()', function () {
        fit('should parse basic tag', function () {
            var html = "<p class='a'>hi <!-- comment --><br></p>";
            console.log(html);
            var htmlParser = new src_1.HtmlParser();
            var output = htmlParser.parse(html);
            console.log(JSON.stringify(output, null, 2));
            var htmlOutput = htmlParser.reverse(output);
            console.log(htmlOutput);
        });
    });
});
//# sourceMappingURL=html-parser.spec.js.map