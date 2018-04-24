export declare class AttributeParser {
    private state;
    private reset();
    private getNextChar();
    private _parse(text);
    private handleReadingAttrName(ch, attr);
    private handleReadingAttrValue(ch, attr);
    parse(tag: string): {};
    reverse(attributes: {
        [key: string]: any;
    }): string;
}
