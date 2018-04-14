import { iHtmlElement } from './interfaces';
export declare class HtmlParser {
    private state;
    private reset();
    private addNodeElement(newNode, currentElement);
    private createTextNode(text);
    private createCommentNode(comment);
    private createTagNode(tag);
    private getTagType(name);
    private getNextTag(text);
    private parseText(currentElement);
    private handleStartTagInText(tagResult, nextText, currentElement);
    private handleEndTagInText(tagResult, nextText, currentElement);
    private handleCommentInText(tagResult, nextText, currentElement);
    private parseTag(currentElement);
    private parseAttributes(tag);
    private parseScript(currentElement, endTag);
    private _parse(currentElement);
    parse(html: string): iHtmlElement[];
}
