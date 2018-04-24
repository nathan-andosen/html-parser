import { iHtmlElement, iCleanOptions } from './interfaces';
export declare class HtmlParser {
    private state;
    private errorCb;
    private addNodeCb;
    private stringifyNodeCb;
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
    private findPositionOfClosingTag(text);
    private parseAttributes(tag);
    private parseScript(currentElement, endTag);
    private _parse(currentElement);
    parse(html: string, errorCb?: (err: Error) => void, addNodeCb?: (nodeBeingAdded: iHtmlElement, parentElement: iHtmlElement) => void): iHtmlElement[];
    reverse(htmlNodes: iHtmlElement[], stringifyNodeCb?: (node: iHtmlElement) => void): string;
    private reverseNodes(index, htmlNodes, html);
    clean(nodes: iHtmlElement[], options?: iCleanOptions): iHtmlElement[];
}
