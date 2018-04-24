import { iHtmlElement, iCleanOptions } from './interfaces';
export declare class CleanParser {
    private removeEmptyTags;
    private removeEmptyTextNodes;
    private setOptions(options);
    private parseAndRemoveEmptyText(index, nodes);
    private parseAndRemoveEmptyTags(index, nodes);
    parse(htmlNodes: iHtmlElement[], options?: iCleanOptions): iHtmlElement[];
}
