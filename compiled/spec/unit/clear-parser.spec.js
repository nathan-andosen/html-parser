"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clean_parser_1 = require("../../src/clean-parser");
var src_1 = require("../../src");
describe('CleanParser', function () {
    var htmlParser = new src_1.HtmlParser();
    var cleanParser = new clean_parser_1.CleanParser();
    describe('parse()', function () {
        it('should remove empty tags (basic)', function () {
            var html = "<div>hi <div><span></span></div></div>";
            var output = htmlParser.parse(html);
            output = cleanParser.parse(output, {
                removeEmptyTextNodes: false
            });
            var expectedResult = "<div>hi </div>";
            expect(htmlParser.reverse(output)).toEqual(expectedResult);
        });
        it('should remove empty tags', function () {
            var html = "<div>hi <span></span> there, <br /> how are you<p></p></div>";
            var output = htmlParser.parse(html);
            output = cleanParser.parse(output, {
                removeEmptyTextNodes: false
            });
            var expectedResult = "<div>hi  there, <br /> how are you</div>";
            expect(htmlParser.reverse(output)).toEqual(expectedResult);
        });
        it('should remove empty text nodes', function () {
            var html = "<div><span></span>hi<span> </span> </div>";
            var output = htmlParser.parse(html);
            output = cleanParser.parse(output, {
                removeEmptyTags: false
            });
            var expectedResult = "<div><span></span>hi<span></span></div>";
            expect(htmlParser.reverse(output)).toEqual(expectedResult);
        });
    });
});
//# sourceMappingURL=clear-parser.spec.js.map