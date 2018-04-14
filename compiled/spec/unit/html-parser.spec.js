"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../src");
describe('HtmlParser', function () {
    describe('parse()', function () {
        it('should parse basic tag', function () {
            var html = "<p class=\"hey you\">hi \"bye\"</p>";
            var htmlParser = new src_1.HtmlParser();
            var output = htmlParser.parse(html);
            console.log(JSON.stringify(output, null, 2));
        });
    });
});
//# sourceMappingURL=html-parser.spec.js.map