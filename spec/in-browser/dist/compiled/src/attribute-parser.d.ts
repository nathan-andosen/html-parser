export declare class AttributeParser {
    private state;
    private isWhitespace(ch);
    private reset();
    private getNextChar();
    private _parse(text);
    private handleReadingAttrName(ch, attr);
    private handleReadingAttrValue(ch, attr);
    parse(tag: string): {};
}
