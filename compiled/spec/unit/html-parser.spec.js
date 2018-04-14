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
        it('should parse script tag', function () {
            var html = "<body><script type=\"javascript/text\">var a = ( 5 > 2) ? 3 : 3;</script></body>";
            var output = htmlParser.parse(html);
            var expectedResult = [{ "type": "tag", "tagType": "default", "name": "body", "attributes": {}, "children": [{ "type": "tag", "tagType": "script", "name": "script", "attributes": { "type": "\"javascript/text\"" }, "children": [{ "type": "text", "data": "var a = ( 5 > 2) ? 3 : 3;" }] }] }];
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should parse tags with capital letters', function () {
            var html = "<SPAN><p>hi</P> there</SPAN>";
            var expectedResult = [{ "type": "tag", "tagType": "default", "name": "SPAN", "attributes": {}, "children": [{ "type": "tag", "tagType": "default", "name": "p", "attributes": {}, "children": [{ "type": "text", "data": "hi" }] }, { "type": "text", "data": " there" }] }];
            var output = htmlParser.parse(html);
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should parse custom tags', function () {
            var html = "<cust-tag>hello</cust-tag>";
            var output = htmlParser.parse(html);
            var expectedResult = [{ "type": "tag", "tagType": "default", "name": "cust-tag", "attributes": {}, "children": [{ "type": "text", "data": "hello" }] }];
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should parse text content that has less than or greater than symbols', function () {
            var html = "<p> 5 > 3 and 2 < 4 </p>";
            var expectedResult = [{ "type": "tag", "tagType": "default", "name": "p", "attributes": {}, "children": [{ "type": "text", "data": " 5 > 3 and 2 < 4 " }] }];
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