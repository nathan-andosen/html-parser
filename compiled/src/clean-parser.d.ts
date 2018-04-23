import { iHtmlElement, iCleanOptions } from './interfaces';
export declare class CleanParser {
    private removeEmptyTags;
    private removeEmptyTextNodes;
    private setOptions(options);
    parse(htmlNodes: iHtmlElement[], options: iCleanOptions): void;
}
