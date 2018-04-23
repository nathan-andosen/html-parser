import { iHtmlElement, iCleanOptions } from './interfaces';

/**
 * Clean up the array of node elements returned from the HtmlParser.parse()
 * function
 * 
 * @export
 * @class CleanParser
 */
export class CleanParser {
  private removeEmptyTags;
  private removeEmptyTextNodes;


  /**
   * Set the options for the parser
   * 
   * @private
   * @param {iCleanOptions} options 
   * @memberof CleanParser
   */
  private setOptions(options: iCleanOptions) {
    options = options || {};
    this.removeEmptyTags = (typeof options.removeEmptyTags !== 'undefined')
      ? options.removeEmptyTags : true;
    this.removeEmptyTextNodes = 
      (typeof options.removeEmptyTextNodes !== 'undefined')
      ? options.removeEmptyTextNodes : true;
  }


  parse(htmlNodes: iHtmlElement[], options: iCleanOptions) {
    this.setOptions(options);

    
  }
}
