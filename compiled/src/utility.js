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
//# sourceMappingURL=utility.js.map