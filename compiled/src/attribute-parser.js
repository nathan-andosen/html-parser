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
        else if (ch === '/') {
        }
        else if (this.isWhitespace(ch)) {
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
//# sourceMappingURL=attribute-parser.js.map