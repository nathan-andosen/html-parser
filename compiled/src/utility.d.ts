export declare class Utility {
    removeWhitespace(text: string): string;
    isLetter(ch: string): boolean;
    isStartOfTag(ch: string, nextCh: string): boolean;
    isEndOfTag(ch: string, nextCh: string): boolean;
    isStartOfComment(text: string): boolean;
}
declare let utility: Utility;
export { utility };
