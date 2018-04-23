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
        it('should parse style tag', function () {
            var html = "<body><style>body > p {}</style></body>";
            var output = htmlParser.parse(html);
            var expectedResult = [{ "type": "tag", "tagType": "default", "name": "body", "attributes": {}, "children": [{ "type": "tag", "tagType": "style", "name": "style", "attributes": {}, "children": [{ "type": "text", "data": "body > p {}" }] }] }];
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should parse nested tags', function () {
            var html = "<div><div><p> hi<span> there</span></p></div></div>";
            var output = htmlParser.parse(html);
            var expectedResult = [{ "type": "tag", "tagType": "default", "name": "div", "attributes": {}, "children": [{ "type": "tag", "tagType": "default", "name": "div", "attributes": {}, "children": [{ "type": "tag", "tagType": "default", "name": "p", "attributes": {}, "children": [{ "type": "text", "data": " hi" }, { "type": "tag", "tagType": "default", "name": "span", "attributes": {}, "children": [{ "type": "text", "data": " there" }] }] }] }] }];
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should parse tags with attributes', function () {
            var html = "<div class='one'><input required /></div>";
            var output = htmlParser.parse(html);
            var expectedResult = [{ "type": "tag", "tagType": "default", "name": "div", "attributes": { "class": "'one'" }, "children": [{ "type": "tag", "tagType": "empty", "name": "input", "attributes": { "required": null }, "children": [] }] }];
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should pass error for invalid html', function () {
            var html = "<div><p>hi</div>";
            var errorCalled = 0;
            var output = htmlParser.parse(html, function (err) {
                errorCalled++;
            });
            expect(errorCalled).toBeGreaterThan(0);
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
        it('should handle greater than symbol in attribute', function () {
            var html = "<img alt='5>6' custom='d<f' /><span class=d>f>hi</span>";
            var output = htmlParser.parse(html);
            var expectedResult = [{ "type": "tag", "tagType": "empty", "name": "img", "attributes": { "alt": "'5>6'", "custom": "'d<f'" }, "children": [] }, { "type": "tag", "tagType": "default", "name": "span", "attributes": { "class": "d" }, "children": [{ "type": "text", "data": "f>hi" }] }];
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should handle quotes in attributes', function () {
            var html = "<p custom=\"This's there ' s\"><span tag='\"hi there\"'></span></p>";
            var output = htmlParser.parse(html);
            var expectedResult = [{ "type": "tag", "tagType": "default", "name": "p", "attributes": { "custom": "\"This's there ' s\"" }, "children": [{ "type": "tag", "tagType": "default", "name": "span", "attributes": { "tag": "'\"hi there\"'" }, "children": [] }] }];
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should parse tag split over lines', function () {
            var html = "hi\n<p\n  class=\"one\">\n  a paragraph\n</p>";
            var expectedResult = [{ "type": "text", "data": "hi\n" }, { "type": "tag", "tagType": "default", "name": "p", "attributes": { "class": "\"one\"" }, "children": [{ "type": "text", "data": "\n  a paragraph\n" }] }];
            var output = htmlParser.parse(html);
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
    });
    describe('reverse()', function () {
        it('should reverse output from the parse function back into html', function () {
            var html = "<div class='one'><p>hi <span>there</span></p><br /></div>";
            var output = htmlParser.parse(html);
            var reversedHtml = htmlParser.reverse(output);
            expect(reversedHtml).toEqual(html);
        });
    });
});
//# sourceMappingURL=html-parser.spec.js.map