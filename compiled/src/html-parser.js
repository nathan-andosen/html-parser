"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utility_1 = require("./utility");
var constants_1 = require("./constants");
var attribute_parser_1 = require("./attribute-parser");
var clean_parser_1 = require("./clean-parser");
var HtmlParser = (function () {
    function HtmlParser() {
        this.errorCb = null;
        this.addNodeCb = null;
        this.stringifyNodeCb = null;
    }
    HtmlParser.prototype.reset = function () {
        this.state = {
            mode: constants_1.MODE_TYPES.TEXT,
            html: '',
            currentPos: 0,
            output: []
        };
    };
    HtmlParser.prototype.addNodeElement = function (newNode, currentElement) {
        if (this.addNodeCb) {
            this.addNodeCb(newNode, currentElement);
        }
        if (currentElement) {
            if (!currentElement.children) {
                currentElement.children = [];
            }
            currentElement.children.push(newNode);
        }
        else {
            this.state.output.push(newNode);
        }
    };
    HtmlParser.prototype.createTextNode = function (text) {
        return {
            type: constants_1.ELEMENT_TYPES.TEXT,
            data: text
        };
    };
    HtmlParser.prototype.createCommentNode = function (comment) {
        return {
            type: constants_1.ELEMENT_TYPES.COMMENT,
            data: comment
        };
    };
    HtmlParser.prototype.createTagNode = function (tag) {
        var posOfFirstSpace = tag.indexOf(" ");
        var posOfGreaterThan = tag.indexOf(">");
        var endIndex = (posOfFirstSpace > -1 && posOfFirstSpace < posOfGreaterThan)
            ? posOfFirstSpace : posOfGreaterThan;
        var name = tag.substring(1, endIndex);
        name = utility_1.utility.removeWhitespace(name);
        return {
            type: constants_1.ELEMENT_TYPES.TAG,
            tagType: this.getTagType(name),
            name: name,
            attributes: this.parseAttributes(tag),
            children: []
        };
    };
    HtmlParser.prototype.getTagType = function (name) {
        name = name.toLowerCase();
        if (constants_1.EMPTY_TAGS[name]) {
            return constants_1.TAG_TYPES.EMPTY;
        }
        else if (name === constants_1.TAG_TYPES.STYLE) {
            return constants_1.TAG_TYPES.STYLE;
        }
        else if (name === constants_1.TAG_TYPES.SCRIPT) {
            return constants_1.TAG_TYPES.SCRIPT;
        }
        else if (name === constants_1.TAG_TYPES.COMMENT) {
            return constants_1.TAG_TYPES.COMMENT;
        }
        return constants_1.TAG_TYPES.DEFAULT;
    };
    HtmlParser.prototype.getNextTag = function (text) {
        var pos = 0;
        while (pos < text.length) {
            if (utility_1.utility.isStartOfTag(text[pos], text[pos + 1])) {
                return {
                    type: 'start',
                    pos: pos
                };
            }
            else if (utility_1.utility.isEndOfTag(text[pos], text[pos + 1])) {
                return {
                    type: 'end',
                    pos: pos
                };
            }
            else if (utility_1.utility.isStartOfComment(text.substr(pos))) {
                return {
                    type: 'comment',
                    pos: pos
                };
            }
            pos++;
        }
        return { type: 'no-tag' };
    };
    HtmlParser.prototype.parseText = function (currentElement) {
        var nextText = this.state.html.substring(this.state.currentPos);
        var tagResult = this.getNextTag(nextText);
        if (tagResult.type === 'start') {
            this.handleStartTagInText(tagResult, nextText, currentElement);
        }
        else if (tagResult.type === 'end') {
            this.handleEndTagInText(tagResult, nextText, currentElement);
        }
        else if (tagResult.type === 'comment') {
            this.handleCommentInText(tagResult, nextText, currentElement);
        }
        else {
            if (nextText.length > 0) {
                var textNode = this.createTextNode(nextText);
                this.addNodeElement(textNode, currentElement);
            }
        }
    };
    HtmlParser.prototype.handleStartTagInText = function (tagResult, nextText, currentElement) {
        if (tagResult.pos > 0) {
            var text = nextText.substring(0, tagResult.pos);
            var textNode = this.createTextNode(text);
            this.addNodeElement(textNode, currentElement);
        }
        this.state.mode = constants_1.MODE_TYPES.TAG;
        this.state.currentPos = this.state.currentPos + tagResult.pos;
        this._parse(currentElement);
    };
    HtmlParser.prototype.handleEndTagInText = function (tagResult, nextText, currentElement) {
        if (tagResult.pos > 0) {
            var text = nextText.substring(0, tagResult.pos);
            var textNode = this.createTextNode(text);
            this.addNodeElement(textNode, currentElement);
        }
        var posEndTag = nextText.indexOf('>', tagResult.pos) + 1;
        var tagText = nextText.substring(tagResult.pos, posEndTag);
        var tagName = tagText.replace("</", "").replace(">", "");
        if (!currentElement) {
            var err = new Error('No start tag for end tag: ' + tagName);
            if (this.errorCb) {
                this.errorCb(err);
            }
        }
        if (currentElement.name.toLowerCase() !== tagName.toLowerCase()) {
            var err = Error('Start tag (' + currentElement.name + ') and end tag '
                + '(' + tagName + ') do not match');
            if (this.errorCb) {
                this.errorCb(err);
            }
        }
        this.state.mode = constants_1.MODE_TYPES.TEXT;
        this.state.currentPos = this.state.currentPos + posEndTag;
        var parentElement = currentElement.parentElement;
        delete currentElement.parentElement;
        this._parse(parentElement);
    };
    HtmlParser.prototype.handleCommentInText = function (tagResult, nextText, currentElement) {
        if (tagResult.pos > 0) {
            var text = nextText.substring(0, tagResult.pos);
            var textNode = this.createTextNode(text);
            this.addNodeElement(textNode, currentElement);
        }
        var posEndCommentTag = nextText.indexOf('-->');
        if (!posEndCommentTag) {
            var err = new Error('Comment does not have an end tag');
            if (this.errorCb) {
                this.errorCb(err);
            }
        }
        var commentText = nextText.substring(tagResult.pos + 4, posEndCommentTag);
        var commentNode = this.createCommentNode(commentText);
        this.addNodeElement(commentNode, currentElement);
        this.state.mode = constants_1.MODE_TYPES.TEXT;
        this.state.currentPos = this.state.currentPos + (posEndCommentTag + 3);
        this._parse(currentElement);
    };
    HtmlParser.prototype.parseTag = function (currentElement) {
        var nextText = this.state.html.substring(this.state.currentPos);
        var posEndTag = this.findPositionOfClosingTag(nextText) + 1;
        var tagText = nextText.substring(0, posEndTag);
        var tagNode = this.createTagNode(tagText);
        this.state.currentPos = this.state.currentPos + posEndTag;
        this.addNodeElement(tagNode, currentElement);
        this.state.mode = constants_1.MODE_TYPES.TEXT;
        if (tagNode.tagType === constants_1.TAG_TYPES.EMPTY) {
            this._parse(currentElement);
        }
        else if (tagNode.tagType === constants_1.TAG_TYPES.STYLE) {
            this.state.mode = constants_1.MODE_TYPES.STYLE;
            tagNode.parentElement = currentElement;
            this._parse(tagNode);
        }
        else if (tagNode.tagType === constants_1.TAG_TYPES.SCRIPT) {
            this.state.mode = constants_1.MODE_TYPES.SCRIPT;
            tagNode.parentElement = currentElement;
            this._parse(tagNode);
        }
        else {
            tagNode.parentElement = currentElement;
            this._parse(tagNode);
        }
    };
    HtmlParser.prototype.findPositionOfClosingTag = function (text) {
        var posOfFirstSpace = text.indexOf(" ");
        var pos = (posOfFirstSpace > -1) ? posOfFirstSpace + 1 : 0;
        var posOfGreaterThan = text.indexOf(">");
        if (posOfGreaterThan < pos) {
            return posOfGreaterThan;
        }
        var quoteType = null;
        var insideQuote = false;
        while (true) {
            var ch = (pos < text.length) ? text[pos] : null;
            if (ch === '>' && !insideQuote) {
                return pos;
            }
            else if (ch === "'") {
                if (insideQuote && quoteType === constants_1.QUOTE_TYPES.SINGLE) {
                    insideQuote = false;
                }
                else if (!insideQuote) {
                    insideQuote = true;
                    quoteType = constants_1.QUOTE_TYPES.SINGLE;
                }
            }
            else if (ch === '"') {
                if (insideQuote && quoteType === constants_1.QUOTE_TYPES.DOUBLE) {
                    insideQuote = false;
                }
                else if (!insideQuote) {
                    insideQuote = true;
                    quoteType = constants_1.QUOTE_TYPES.DOUBLE;
                }
            }
            else if (ch === null) {
                break;
            }
            pos++;
        }
        return text.length - 1;
    };
    HtmlParser.prototype.parseAttributes = function (tag) {
        var attrParser = new attribute_parser_1.AttributeParser();
        return attrParser.parse(tag);
    };
    HtmlParser.prototype.parseScript = function (currentElement, endTag) {
        var nextText = this.state.html.substring(this.state.currentPos);
        var posOfEndTag = nextText.indexOf(endTag);
        if (posOfEndTag < 0) {
            var err = new Error('Script (' + currentElement.name + ' ) does not have ' +
                'an end tag');
            if (this.errorCb) {
                this.errorCb(err);
            }
        }
        var scriptContent = nextText.substring(0, posOfEndTag);
        var textNode = this.createTextNode(scriptContent);
        this.addNodeElement(textNode, currentElement);
        this.state.currentPos = this.state.currentPos
            + (posOfEndTag + endTag.length);
        this.state.mode = constants_1.MODE_TYPES.TEXT;
        var parentElement = currentElement.parentElement;
        delete currentElement.parentElement;
        this._parse(parentElement);
    };
    HtmlParser.prototype._parse = function (currentElement) {
        switch (this.state.mode) {
            case constants_1.MODE_TYPES.TEXT:
                this.parseText(currentElement);
                break;
            case constants_1.MODE_TYPES.TAG:
                this.parseTag(currentElement);
                break;
            case constants_1.MODE_TYPES.STYLE:
                this.parseScript(currentElement, "</style>");
                break;
            case constants_1.MODE_TYPES.SCRIPT:
                this.parseScript(currentElement, "</script>");
                break;
        }
    };
    HtmlParser.prototype.parse = function (html, errorCb, addNodeCb) {
        this.errorCb = (errorCb) ? errorCb : null;
        this.addNodeCb = (addNodeCb) ? addNodeCb : null;
        this.reset();
        this.state.html = html;
        this._parse(null);
        return this.state.output;
    };
    HtmlParser.prototype.reverse = function (htmlNodes, stringifyNodeCb) {
        this.stringifyNodeCb = (stringifyNodeCb) ? stringifyNodeCb : null;
        return this.reverseNodes(0, htmlNodes, '');
    };
    HtmlParser.prototype.reverseNodes = function (index, htmlNodes, html) {
        if (index >= htmlNodes.length) {
            return html;
        }
        var node = htmlNodes[index];
        if (this.stringifyNodeCb) {
            this.stringifyNodeCb(node);
        }
        if (node.type === constants_1.ELEMENT_TYPES.TEXT) {
            html += node.data;
        }
        else if (node.type === constants_1.ELEMENT_TYPES.COMMENT) {
            html += '<!--' + node.data + '-->';
        }
        else {
            var attrParser = new attribute_parser_1.AttributeParser();
            var textAttr = attrParser.reverse(node.attributes);
            textAttr = (textAttr.length > 0) ? ' ' + textAttr : textAttr;
            if (node.tagType === constants_1.TAG_TYPES.EMPTY) {
                html += '<' + node.name + textAttr + ' />';
            }
            else {
                html += '<' + node.name + textAttr + '>';
                if (node.children && node.children.length > 0) {
                    var newHtml = this.reverseNodes(0, node.children, '');
                    html += newHtml;
                }
                html += '</' + node.name + '>';
            }
        }
        index++;
        return this.reverseNodes(index, htmlNodes, html);
    };
    HtmlParser.prototype.clean = function (nodes, options) {
        var cleanParser = new clean_parser_1.CleanParser();
        return cleanParser.parse(nodes, options);
    };
    return HtmlParser;
}());
exports.HtmlParser = HtmlParser;
//# sourceMappingURL=html-parser.js.map