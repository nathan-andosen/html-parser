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
//# sourceMappingURL=utility.js.map