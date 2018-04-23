"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CleanParser = (function () {
    function CleanParser() {
    }
    CleanParser.prototype.setOptions = function (options) {
        options = options || {};
        this.removeEmptyTags = (typeof options.removeEmptyTags !== 'undefined')
            ? options.removeEmptyTags : true;
        this.removeEmptyTextNodes =
            (typeof options.removeEmptyTextNodes !== 'undefined')
                ? options.removeEmptyTextNodes : true;
    };
    CleanParser.prototype.parse = function (htmlNodes, options) {
        this.setOptions(options);
    };
    return CleanParser;
}());
exports.CleanParser = CleanParser;
//# sourceMappingURL=clean-parser.js.map