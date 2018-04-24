export declare class Utility {
    removeWhitespace(text: string): string;
    isWhitespace(ch: string): boolean;
    textOnlyContainsWhitespace(text: string): boolean;
    isLetter(ch: string): boolean;
    isStartOfTag(ch: string, nextCh: string): boolean;
    isEndOfTag(ch: string, nextCh: string): boolean;
    isStartOfComment(text: string): boolean;
}
declare let utility: Utility;
export { utility };
