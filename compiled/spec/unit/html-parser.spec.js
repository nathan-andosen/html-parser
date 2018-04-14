"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../src");
describe('HtmlParser', function () {
    var htmlParser = new src_1.HtmlParser();
    describe('parse()', function () {
        it('should parse plain text', function () {
            var html = "plain text ";
            var expectedResult = [{ "type": "text", "data": "plain text " }];
            var output = htmlParser.parse(html);
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should parse plain text with tag', function () {
            var html = "plain text <br />";
            var expectedResult = [{ "type": "text", "data": "plain text " }, { "type": "tag", "tagType": "empty", "name": "br", "attributes": {}, "children": [] }];
            var output = htmlParser.parse(html);
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should handle html comment', function () {
            var html = "<div><!--This is not seen-->Hello world!</div>";
            var expectedResult = [{ "type": "tag", "tagType": "default", "name": "div", "attributes": {}, "children": [{ "type": "comment", "data": "This is not seen" }, { "type": "text", "data": "Hello world!" }] }];
            var output = htmlParser.parse(html);
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should parse tag split over lines', function () {
            var html = "hi\n<p\n  class=\"one\">\n  a paragraph\n</p>";
            var expectedResult = [{ "type": "text", "data": "hi\n" }, { "type": "tag", "tagType": "default", "name": "p", "attributes": { "class": "\"one\"" }, "children": [{ "type": "text", "data": "\n  a paragraph\n" }] }];
            var output = htmlParser.parse(html);
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
    });
});
//# sourceMappingURL=html-parser.spec.js.map