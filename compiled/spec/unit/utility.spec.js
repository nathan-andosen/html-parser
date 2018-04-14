"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utility_1 = require("../../src/utility");
describe('Utility', function () {
    describe('removeWhitespace()', function () {
        it('should remove all white space', function () {
            var text = utility_1.utility.removeWhitespace(" nathan\n");
            expect(text).toEqual("nathan");
            text = utility_1.utility.removeWhitespace(" \u000D\u000Anathan\n");
            expect(text).toEqual("nathan");
            text = utility_1.utility.removeWhitespace(" \u000D\u000Anat han\n");
            expect(text).toEqual("nathan");
        });
    });
});
//# sourceMappingURL=utility.spec.js.map