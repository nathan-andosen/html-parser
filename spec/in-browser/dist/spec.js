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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/dist/";
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
    AttributeParser.prototype.isWhitespace = function (ch) {
        var tab = '\u0009';
        var noBreakSpace = '\u00A0';
        var newLine = '\n';
        var CR = '\u000D';
        var LF = '\u000A';
        return (ch === tab) || (ch === ' ') || (ch === noBreakSpace)
            || (ch === newLine) || (ch === CR) || (ch === LF);
    };
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
        else if (this.isWhitespace(ch)) {
            attr[this.state.attrName] = null;
            this.state.attrName = '';
        }
        else {
            this.state.attrName = this.state.attrName + ch;
        }
    };
    AttributeParser.prototype.handleReadingAttrValue = function (ch, attr) {
        if (this.isWhitespace(ch)) {
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
        var posOfGreaterThan = tag.indexOf(">");
        if (posOfFirstSpace > -1 && posOfFirstSpace < posOfGreaterThan) {
            var text = tag.substring(posOfFirstSpace, posOfGreaterThan);
            text = text.trim();
            attr = this._parse(text);
        }
        return attr;
    };
    return AttributeParser;
}());
exports.AttributeParser = AttributeParser;


/***/ }),
/* 1 */
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


// Our webpack.unit.tests.config.js file uses this to require all unit test files
// so they can be tested in a browser for debugging

// require all test files
var testsContext = __webpack_require__(3);
testsContext.keys().forEach(testsContext);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./attribute-parser.spec": 4,
	"./html-parser.spec": 5
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 3;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var attribute_parser_1 = __webpack_require__(0);
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __webpack_require__(6);
describe('HtmlParser', function () {
    describe('parse()', function () {
        it('should parse basic tag', function () {
            var html = "<p class=\"hey you\">hi \"bye\"</p>";
            var htmlParser = new src_1.HtmlParser();
            var output = htmlParser.parse(html);
            console.log(JSON.stringify(output, null, 2));
        });
    });
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1));
__export(__webpack_require__(7));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utility_1 = __webpack_require__(8);
var constants_1 = __webpack_require__(1);
var attribute_parser_1 = __webpack_require__(0);
var HtmlParser = (function () {
    function HtmlParser() {
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
        var posEndTag = nextText.indexOf('>');
        posEndTag++;
        var tagText = nextText.substring(tagResult.pos, posEndTag);
        var tagName = tagText.replace("</", "").replace(">", "");
        if (!currentElement) {
            throw new Error('No start tag for end tag: ' + tagName);
        }
        if (currentElement.name.toLowerCase() !== tagName.toLowerCase()) {
            throw new Error('Start tag (' + currentElement.name + ') and end tag '
                + '(' + tagName + ') do not match');
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
            throw new Error('Comment does not have an end tag');
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
        var posEndTag = nextText.indexOf('>');
        posEndTag++;
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
    HtmlParser.prototype.parseAttributes = function (tag) {
        var attrParser = new attribute_parser_1.AttributeParser();
        return attrParser.parse(tag);
    };
    HtmlParser.prototype.parseScript = function (currentElement, endTag) {
        var nextText = this.state.html.substring(this.state.currentPos);
        var posOfEndTag = nextText.indexOf(endTag);
        if (posOfEndTag < 0) {
            throw new Error('Script (' + currentElement.name + ' ) does not have ' +
                'an end tag');
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
    HtmlParser.prototype.parse = function (html) {
        this.reset();
        this.state.html = html;
        this._parse(null);
        return this.state.output;
    };
    return HtmlParser;
}());
exports.HtmlParser = HtmlParser;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utility = (function () {
    function Utility() {
    }
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


/***/ })
/******/ ]);
//# sourceMappingURL=spec.js.map