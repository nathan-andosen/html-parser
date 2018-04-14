"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var attribute_parser_1 = require("../../src/attribute-parser");
describe('Attribute parser', function () {
    describe('parse()', function () {
        it('should parse attributes', function () {
            var attrParser = new attribute_parser_1.AttributeParser();
            var tag = "<p class='abc db' aria-label=\"Easy one two\" custom=\"'text'\" val='' required custom-again=true abc-d='1'></p>";
            var output = attrParser.parse(tag);
            console.log(JSON.stringify(output, null, 2));
        });
    });
});
//# sourceMappingURL=attribute-parser.spec.js.map