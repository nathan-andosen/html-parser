export interface iHtmlElement {
    type: string;
    tagType?: string;
    data?: string;
    name?: string;
    children?: iHtmlElement[];
    parentElement?: iHtmlElement;
    attributes?: {
        [key: string]: any;
    };
}
export interface iState {
    mode: string;
    html: string;
    currentPos: number;
    output: iHtmlElement[];
}
export interface iSearchTagResult {
    type: string;
    pos?: number;
}
