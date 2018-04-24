import { iHtmlElement, iCleanOptions } from './interfaces';
import { ELEMENT_TYPES, TAG_TYPES } from './constants';
import { utility } from './utility';

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


  /**
   * Remove text nodes that only contain whitespace
   * 
   * @private
   * @param {number} index 
   * @param {iHtmlElement[]} nodes 
   * @returns {void} 
   * @memberof CleanParser
   */
  private parseAndRemoveEmptyText(index: number, nodes: iHtmlElement[]): void {
    if(index >= nodes.length) {
      return;
    }
    let node = nodes[index];
    if(node.type === ELEMENT_TYPES.TEXT 
    && utility.textOnlyContainsWhitespace(node.data)) {
      nodes.splice(index, 1);
      index--;
    } else if(node.type === ELEMENT_TYPES.TAG && node.children
    && node.children.length > 0) {
      this.parseAndRemoveEmptyText(0, node.children);
    }
    this.parseAndRemoveEmptyText(++index, nodes);
  }


  /**
   * Remove tag elements that are empty
   * 
   * @private
   * @param {number} index 
   * @param {iHtmlElement[]} nodes 
   * @returns {void} 
   * @memberof CleanParser
   */
  private parseAndRemoveEmptyTags(index: number, nodes: iHtmlElement[]): void {
    if(index >= nodes.length) {
      return;
    }
    let node = nodes[index];
    if(node.type === ELEMENT_TYPES.TAG) {
      if(node.children && node.children.length > 0) {
        this.parseAndRemoveEmptyTags(0, node.children);
      } 
      let noChildern = (!node.children || node.children.length <= 0);
      if(node.tagType === TAG_TYPES.DEFAULT && noChildern) {
        nodes.splice(index, 1);
        index--;
      }
    }
    this.parseAndRemoveEmptyTags(++index, nodes);
  }


  /**
   * Parse html element nodes to clean and remove unwanted tags
   * 
   * @param {iHtmlElement[]} htmlNodes 
   * @param {iCleanOptions} [options] 
   * @returns {iHtmlElement[]} 
   * @memberof CleanParser
   */
  parse(htmlNodes: iHtmlElement[], options?: iCleanOptions): iHtmlElement[] {
    this.setOptions(options);
    if(this.removeEmptyTextNodes) {
      this.parseAndRemoveEmptyText(0, htmlNodes);
    }
    if(this.removeEmptyTags) {
      this.parseAndRemoveEmptyTags(0, htmlNodes);
    }
    return htmlNodes;
  }
}
