window.Thenja = window.Thenja || {}, window.Thenja =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ELEMENT_TYPES = {
    TAG: "tag",
    TEXT: "text",
    COMMENT: "comment"
};
exports.EMPTY_TAGS = {
    "area": 1,
    "base": 1,
    "basefont": 1,
    "br": 1,
    "col": 1,
    "frame": 1,
    "hr": 1,
    "img": 1,
    "input": 1,
    "isindex": 1,
    "link": 1,
    "meta": 1,
    "param": 1,
    "embed": 1
};
exports.MODE_TYPES = {
    TEXT: 'text',
    TAG: 'tag',
    STYLE: 'style',
    SCRIPT: 'script'
};
exports.TAG_TYPES = {
    EMPTY: 'empty',
    DEFAULT: 'default',
    SCRIPT: 'script',
    STYLE: 'style',
    COMMENT: 'comment'
};
exports.QUOTE_TYPES = {
    SINGLE: 1,
    DOUBLE: 2
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utility = (function () {
    function Utility() {
    }
    Utility.prototype.removeWhitespace = function (text) {
        var tab = '\u0009';
        var noBreakSpace = '\u00A0';
        var newLine = '\n';
        var CR = '\u000D';
        var LF = '\u000A';
        text = text.trim();
        text = text.split(' ').join("");
        text = text.split(tab).join("");
        text = text.split(noBreakSpace).join("");
        text = text.split(newLine).join("");
        text = text.split(CR).join("");
        text = text.split(LF).join("");
        return text;
    };
    Utility.prototype.isWhitespace = function (ch) {
        var tab = '\u0009';
        var noBreakSpace = '\u00A0';
        var newLine = '\n';
        var CR = '\u000D';
        var LF = '\u000A';
        return (ch === tab) || (ch === ' ') || (ch === noBreakSpace)
            || (ch === newLine) || (ch === CR) || (ch === LF);
    };
    Utility.prototype.textOnlyContainsWhitespace = function (text) {
        var isOnlyWhitespace = true;
        if (!text) {
            return isOnlyWhitespace;
        }
        for (var i = 0; i < text.length; i++) {
            if (!this.isWhitespace(text[i])) {
                isOnlyWhitespace = false;
                break;
            }
        }
        return isOnlyWhitespace;
    };
    Utility.prototype.isLetter = function (ch) {
        return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
    };
    Utility.prototype.isStartOfTag = function (ch, nextCh) {
        if (!ch || !nextCh) {
            return false;
        }
        return (ch === "<" && this.isLetter(nextCh));
    };
    Utility.prototype.isEndOfTag = function (ch, nextCh) {
        if (!ch || !nextCh) {
            return false;
        }
        return (ch === "<" && nextCh === "/");
    };
    Utility.prototype.isStartOfComment = function (text) {
        return (text.indexOf('<!--') === 0);
    };
    return Utility;
}());
exports.Utility = Utility;
var utility = new Utility();
exports.utility = utility;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(0);
exports.ELEMENT_TYPES = constants_1.ELEMENT_TYPES;
exports.TAG_TYPES = constants_1.TAG_TYPES;
var html_parser_1 = __webpack_require__(3);
exports.HtmlParser = html_parser_1.HtmlParser;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utility_1 = __webpack_require__(1);
var constants_1 = __webpack_require__(0);
var attribute_parser_1 = __webpack_require__(4);
var clean_parser_1 = __webpack_require__(5);
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utility_1 = __webpack_require__(1);
var PARSER_MODES = {
    READING_ATTR_NAME: 'reading-attr-name',
    READING_ATTR_VALUE: 'reading-attr-value'
};
var AttributeParser = (function () {
    function AttributeParser() {
        this.state = {
            text: '',
            currentPos: 0,
            mode: PARSER_MODES.READING_ATTR_NAME,
            attrName: '',
            attrValue: ''
        };
    }
    AttributeParser.prototype.reset = function () {
        this.state = {
            text: '',
            currentPos: 0,
            mode: 'reading-attr-name',
            attrName: '',
            attrValue: ''
        };
    };
    AttributeParser.prototype.getNextChar = function () {
        var ch = null;
        if (this.state.currentPos < this.state.text.length) {
            ch = this.state.text.charAt(this.state.currentPos);
            this.state.currentPos++;
        }
        return ch;
    };
    AttributeParser.prototype._parse = function (text) {
        var attr = {};
        this.state.text = text;
        while (true) {
            var ch = this.getNextChar();
            if (ch === null) {
                if (this.state.attrName) {
                    attr[this.state.attrName] = (this.state.attrValue)
                        ? this.state.attrValue : null;
                }
                break;
            }
            if (this.state.mode === PARSER_MODES.READING_ATTR_NAME) {
                this.handleReadingAttrName(ch, attr);
            }
            else if (this.state.mode === PARSER_MODES.READING_ATTR_VALUE) {
                this.handleReadingAttrValue(ch, attr);
            }
        }
        return attr;
    };
    AttributeParser.prototype.handleReadingAttrName = function (ch, attr) {
        if (ch === '=') {
            this.state.mode = PARSER_MODES.READING_ATTR_VALUE;
        }
        else if (ch === '/') {
        }
        else if (utility_1.utility.isWhitespace(ch)) {
            if (this.state.attrName) {
                attr[this.state.attrName] = null;
                this.state.attrName = '';
            }
        }
        else {
            this.state.attrName = this.state.attrName + ch;
        }
    };
    AttributeParser.prototype.handleReadingAttrValue = function (ch, attr) {
        if (utility_1.utility.isWhitespace(ch)) {
            var firstCh = this.state.attrValue[0];
            var lastCh = this.state.attrValue[this.state.attrValue.length - 1];
            if ((firstCh === "'" || firstCh === '"') && firstCh !== lastCh) {
                this.state.attrValue = this.state.attrValue + ch;
            }
            else {
                attr[this.state.attrName] = this.state.attrValue;
                this.state.mode = PARSER_MODES.READING_ATTR_NAME;
                this.state.attrName = '';
                this.state.attrValue = '';
            }
        }
        else {
            this.state.attrValue = this.state.attrValue + ch;
        }
    };
    AttributeParser.prototype.parse = function (tag) {
        this.reset();
        var attr = {};
        var posOfFirstSpace = tag.indexOf(" ");
        var posOfGreaterThan = tag.lastIndexOf(">");
        if (posOfFirstSpace > -1 && posOfFirstSpace < posOfGreaterThan) {
            var text = tag.substring(posOfFirstSpace, posOfGreaterThan);
            text = text.trim();
            attr = this._parse(text);
        }
        return attr;
    };
    AttributeParser.prototype.reverse = function (attributes) {
        var textAttr = '';
        for (var key in attributes) {
            if (attributes[key] === null) {
                textAttr += ' ' + key;
            }
            else {
                textAttr += ' ' + key + '=' + attributes[key];
            }
        }
        return textAttr.trim();
    };
    return AttributeParser;
}());
exports.AttributeParser = AttributeParser;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(0);
var utility_1 = __webpack_require__(1);
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


/***/ })
/******/ ]);
//# sourceMappingURL=thenja-html-parser-window.js.map