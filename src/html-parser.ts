import { utility } from './utility';
import {
  ELEMENT_TYPES,
  EMPTY_TAGS,
  MODE_TYPES,
  TAG_TYPES 
} from './constants';
import { iHtmlElement, iSearchTagResult, iState } from './interfaces';
import { AttributeParser } from './attribute-parser';

/**
  SPECIAL TAGS:
  -----------
  <style></style>
  <script></script>
  <!-- A Comment -->
  CDATA (We wont care about this)

  TODO:
  ----------
  - (DONE) parse style tags
  - (DONE) parse script tags
  - (DONE) parse comment tags
  - parse attributes
  - add callback error handling and done handling


 */





/**
 * Parse html string into an array of json objects that represent html elements
 * 
 * @export
 * @class HtmlParser
 */
export class HtmlParser {

  // the state when parsing
  private state: iState;
  

  /**
   * Reset the parser
   * 
   * @private
   * @memberof HtmlParser
   */
  private reset() {
    this.state = {
      mode: MODE_TYPES.TEXT,
      html: '',
      currentPos: 0,
      output: []
    };
  }


  /**
   * Add a html node element to our output object
   * 
   * @private
   * @param {iHtmlElement} newNode 
   * @param {iHtmlElement} currentElement 
   * @memberof HtmlParser
   */
  private addNodeElement(newNode: iHtmlElement, currentElement: iHtmlElement) {
    if(currentElement) {
      if(!currentElement.children) { currentElement.children = []; }
      currentElement.children.push(newNode);
    } else {
      this.state.output.push(newNode);
    }
  }


  /**
   * Create a text node
   * 
   * @private
   * @param {string} text 
   * @returns {iHtmlElement} 
   * @memberof HtmlParser
   */
  private createTextNode(text: string): iHtmlElement {
    return {
      type: ELEMENT_TYPES.TEXT,
      data: text
    };
  }


  private createCommentNode(comment: string): iHtmlElement {
    return {
      type: ELEMENT_TYPES.COMMENT,
      data: comment
    };
  }


  /**
   * Create a tag node
   * 
   * @private
   * @param {string} tag 
   * @returns {iHtmlElement} 
   * @memberof HtmlParser
   */
  private createTagNode(tag: string): iHtmlElement {
    let posOfFirstSpace = tag.indexOf(" ");
    let posOfGreaterThan = tag.indexOf(">");
    let endIndex = (posOfFirstSpace > -1 && posOfFirstSpace < posOfGreaterThan)
      ? posOfFirstSpace : posOfGreaterThan;
    let name = tag.substring(1, endIndex);
    // TODO: get attributes of element
    return {
      type: ELEMENT_TYPES.TAG,
      tagType: this.getTagType(name),
      name: name,
      attributes: this.parseAttributes(tag),
      children: [] 
    };
  }


  /**
   * Get the type of tag
   * 
   * @private
   * @param {string} name 
   * @returns {string} 
   * @memberof HtmlParser
   */
  private getTagType(name: string): string {
    name = name.toLowerCase();
    if(EMPTY_TAGS[name]) {
      return TAG_TYPES.EMPTY;
    } else if(name === TAG_TYPES.STYLE) {
      return TAG_TYPES.STYLE;
    } else if(name === TAG_TYPES.SCRIPT) {
      return TAG_TYPES.SCRIPT;
    } else if(name === TAG_TYPES.COMMENT) {
      return TAG_TYPES.COMMENT;
    }
    return TAG_TYPES.DEFAULT;
  }


  /**
   * Get the next tag from a text string, it could be a start or end tag
   * 
   * @private
   * @param {string} text 
   * @returns {iSearchTagResult} 
   * @memberof HtmlParser
   */
  private getNextTag(text: string): iSearchTagResult {
    let pos = 0;
    while(pos < text.length) {
      if(utility.isStartOfTag(text[pos], text[pos + 1])) {
        return {
          type: 'start',
          pos: pos 
        };
      } else if(utility.isEndOfTag(text[pos], text[pos + 1])) {
        return {
          type: 'end',
          pos: pos
        }
      } else if(utility.isStartOfComment(text.substr(pos))) {
        return {
          type: 'comment',
          pos: pos
        }
      }
      pos++;
    }
    return { type: 'no-tag' };
  }





  private parseText(currentElement: iHtmlElement) {
    let nextText = this.state.html.substring(this.state.currentPos);
    let tagResult = this.getNextTag(nextText);
    if(tagResult.type === 'start') {
      this.handleStartTagInText(tagResult, nextText, currentElement);
    } else if(tagResult.type === 'end') {
      this.handleEndTagInText(tagResult, nextText, currentElement);
    } else if(tagResult.type === 'comment') {
      this.handleCommentInText(tagResult, nextText, currentElement);
    }else {
      // no tag found
      if(nextText.length > 0) {
        let textNode = this.createTextNode(nextText);
        this.addNodeElement(textNode, currentElement);
      }
    }
  }


  private handleStartTagInText(tagResult: iSearchTagResult, 
  nextText: string, currentElement: iHtmlElement): void {
    if(tagResult.pos > 0) {
      // there must be text before our html start tag
      let text = nextText.substring(0, tagResult.pos);
      let textNode = this.createTextNode(text);
      this.addNodeElement(textNode, currentElement);
    }
    // need to now parse the html tag
    this.state.mode = MODE_TYPES.TAG;
    this.state.currentPos = this.state.currentPos + tagResult.pos;
    this._parse(currentElement);
  }



  private handleEndTagInText(tagResult: iSearchTagResult, 
  nextText: string, currentElement: iHtmlElement): void {
    if(tagResult.pos > 0) {
      // there must be text before our html end tag
      let text = nextText.substring(0, tagResult.pos);
      let textNode = this.createTextNode(text);
      this.addNodeElement(textNode, currentElement);
    }
    // validate the end tag is correct
    let posEndTag = nextText.indexOf('>');
    posEndTag++;
    let tagText = nextText.substring(tagResult.pos, posEndTag);
    let tagName = tagText.replace("</", "").replace(">", "");
    if(!currentElement) {
      throw new Error('No start tag for end tag: ' + tagName);
    }
    if(currentElement.name.toLowerCase() !== tagName.toLowerCase()) {
      throw new Error('Start tag (' + currentElement.name + ') and end tag '
      + '(' + tagName + ') do not match');
    }
    this.state.mode = MODE_TYPES.TEXT;
    this.state.currentPos = this.state.currentPos + posEndTag;
    let parentElement = currentElement.parentElement;
    delete currentElement.parentElement;
    this._parse(parentElement);
  }


  private handleCommentInText(tagResult: iSearchTagResult, 
  nextText: string, currentElement: iHtmlElement) {
    if(tagResult.pos > 0) {
      // there must be text before our html end tag
      let text = nextText.substring(0, tagResult.pos);
      let textNode = this.createTextNode(text);
      this.addNodeElement(textNode, currentElement);
    }
    let posEndCommentTag = nextText.indexOf('-->');
    if(!posEndCommentTag) {
      throw new Error('Comment does not have an end tag');
    }
    let commentText = nextText.substring(tagResult.pos + 4, posEndCommentTag);
    let commentNode = this.createCommentNode(commentText);
    this.addNodeElement(commentNode, currentElement);
    this.state.mode = MODE_TYPES.TEXT;
    this.state.currentPos = this.state.currentPos + (posEndCommentTag + 3);
    this._parse(currentElement);
  }

  


  


  private parseTag(currentElement: iHtmlElement) {
    let nextText = this.state.html.substring(this.state.currentPos);
    let posEndTag = nextText.indexOf('>');
    posEndTag++;
    let tagText = nextText.substring(0, posEndTag);
    let tagNode = this.createTagNode(tagText);

    // move to the end of our start tag
    this.state.currentPos = this.state.currentPos + posEndTag;
    this.addNodeElement(tagNode, currentElement);
    // this.state.output.push(tagNode);
    this.state.mode = MODE_TYPES.TEXT;
    if(tagNode.tagType === TAG_TYPES.EMPTY) {
      // empty tags can not have children
      this._parse(currentElement);
    } else if(tagNode.tagType === TAG_TYPES.STYLE) {
      this.state.mode = MODE_TYPES.STYLE;
      tagNode.parentElement = currentElement;
      this._parse(tagNode);
    } else if(tagNode.tagType === TAG_TYPES.SCRIPT) {
      this.state.mode = MODE_TYPES.SCRIPT;
      tagNode.parentElement = currentElement;
      this._parse(tagNode);
    } else {
      tagNode.parentElement = currentElement;
      this._parse(tagNode);
    }
  }


  private parseAttributes(tag: string): { [key: string]: any } {
    let attrParser = new AttributeParser();
    return attrParser.parse(tag);
  }


  private parseScript(currentElement: iHtmlElement, endTag: string) {
    let nextText = this.state.html.substring(this.state.currentPos);
    let posOfEndTag = nextText.indexOf(endTag);
    if(posOfEndTag < 0) {
      throw new Error('Script (' + currentElement.name + ' ) does not have ' +
      'an end tag');
    }
    let scriptContent = nextText.substring(0, posOfEndTag);
    let textNode = this.createTextNode(scriptContent);
    this.addNodeElement(textNode, currentElement);
    this.state.currentPos = this.state.currentPos 
      + (posOfEndTag + endTag.length);
    this.state.mode = MODE_TYPES.TEXT;
    let parentElement = currentElement.parentElement;
    delete currentElement.parentElement;
    this._parse(parentElement);
  }


  private _parse(currentElement: iHtmlElement) {
    switch(this.state.mode) {
      case MODE_TYPES.TEXT:
        this.parseText(currentElement);
        break;
      case MODE_TYPES.TAG:
        this.parseTag(currentElement);
        break;
      case MODE_TYPES.STYLE:
        this.parseScript(currentElement, "</style>");
        break;
      case MODE_TYPES.SCRIPT:
        this.parseScript(currentElement, "</script>");
        break;
    }
  }


  public parse(html: string):iHtmlElement [] {
    this.reset();
    this.state.html = html;
    this._parse(null);
    return this.state.output;
  }


}