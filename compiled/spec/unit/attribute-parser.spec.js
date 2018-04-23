"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attribute_parser_1 = require("../../src/attribute-parser");
describe('Attribute parser', function () {
    var attrParser = new attribute_parser_1.AttributeParser();
    describe('parse()', function () {
        it('should parse attributes with double quotes', function () {
            var tag = '<p class="class-one" custom-attr="one two" txt="\'one\'">';
            var expectedResult = { "class": "\"class-one\"", "custom-attr": "\"one two\"", "txt": "\"'one'\"" };
            var output = attrParser.parse(tag);
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should work with single quotes', function () {
            var tag = "<span class='cls' cus-attr='one two'>";
            var expectedResult = { "class": "'cls'", "cus-attr": "'one two'" };
            var output = attrParser.parse(tag);
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should handle values with no quotes', function () {
            var tag = "<div show=true hide=false>";
            var expectedResult = { "show": "true", "hide": "false" };
            var output = attrParser.parse(tag);
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should work with attributes with no values', function () {
            var tag = "<input required cus='one' />";
            var expectedResult = { "required": null, "cus": "'one'" };
            var output = attrParser.parse(tag);
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should handle no attributes', function () {
            var tag = "<div>";
            var output = attrParser.parse(tag);
            expect(JSON.stringify(output)).toEqual("{}");
            tag = "<br/>";
            output = attrParser.parse(tag);
            expect(JSON.stringify(output)).toEqual("{}");
            tag = "<br />";
            output = attrParser.parse(tag);
            expect(JSON.stringify(output)).toEqual("{}");
        });
        it('should parse complex attributes', function () {
            var attrParser = new attribute_parser_1.AttributeParser();
            var tag = "<p class='abc db' aria-label=\"Easy one two\" custom=\"'text'\" val='' required custom-again=true abc-d='1'>";
            var expectedResult = { "class": "'abc db'", "aria-label": "\"Easy one two\"", "custom": "\"'text'\"", "val": "''", "required": null, "custom-again": "true", "abc-d": "'1'" };
            var output = attrParser.parse(tag);
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should parse attributes over different lines', function () {
            var tag = "<p class=\"hi\"\n        custom='123' required \n        cust=true >";
            var expectedResult = { "class": "\"hi\"", "custom": "'123'", "required": null, "cust": "true" };
            var output = attrParser.parse(tag);
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
        it('should parse attributes with greater than symbol in attribute text', function () {
            var tag = "<img alt='5>6' custom='d<f' />";
            var output = attrParser.parse(tag);
            var expectedResult = { "alt": "'5>6'", "custom": "'d<f'" };
            expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
        });
    });
    describe('reverse()', function () {
        it('should reverse attributes object returned from parse function', function () {
            var tag = "<p class='one two' required custom=\"hi\">";
            var expectedResult = "class='one two' required custom=\"hi\"";
            var output = attrParser.parse(tag);
            var textAttr = attrParser.reverse(output);
            expect(textAttr).toEqual(expectedResult);
        });
    });
});
//# sourceMappingURL=attribute-parser.spec.js.map