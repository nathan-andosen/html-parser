"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var utility_1 = require("./utility");
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
    CleanParser.prototype.parseAndRemoveEmptyText = function (index, nodes) {
        if (index >= nodes.length) {
            return;
        }
        var node = nodes[index];
        if (node.type === constants_1.ELEMENT_TYPES.TEXT
            && utility_1.utility.textOnlyContainsWhitespace(node.data)) {
            nodes.splice(index, 1);
            index--;
        }
        else if (node.type === constants_1.ELEMENT_TYPES.TAG && node.children
            && node.children.length > 0) {
            this.parseAndRemoveEmptyText(0, node.children);
        }
        this.parseAndRemoveEmptyText(++index, nodes);
    };
    CleanParser.prototype.parseAndRemoveEmptyTags = function (index, nodes) {
        if (index >= nodes.length) {
            return;
        }
        var node = nodes[index];
        if (node.type === constants_1.ELEMENT_TYPES.TAG) {
            if (node.children && node.children.length > 0) {
                this.parseAndRemoveEmptyTags(0, node.children);
            }
            var noChildern = (!node.children || node.children.length <= 0);
            if (node.tagType === constants_1.TAG_TYPES.DEFAULT && noChildern) {
                nodes.splice(index, 1);
                index--;
            }
        }
        this.parseAndRemoveEmptyTags(++index, nodes);
    };
    CleanParser.prototype.parse = function (htmlNodes, options) {
        this.setOptions(options);
        if (this.removeEmptyTextNodes) {
            this.parseAndRemoveEmptyText(0, htmlNodes);
        }
        if (this.removeEmptyTags) {
            this.parseAndRemoveEmptyTags(0, htmlNodes);
        }
        return htmlNodes;
    };
    return CleanParser;
}());
exports.CleanParser = CleanParser;
//# sourceMappingURL=clean-parser.js.map