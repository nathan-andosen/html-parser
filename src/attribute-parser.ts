import { utility } from './utility';

const PARSER_MODES = {
  READING_ATTR_NAME: 'reading-attr-name',
  READING_ATTR_VALUE: 'reading-attr-value'
};

/**
 * Parse attributes in a html tag
 * 
 * @export
 * @class AttributeParser
 */
export class AttributeParser {
  
  // the state when parsing
  private state: any = {
    text: '',
    currentPos: 0,
    mode: PARSER_MODES.READING_ATTR_NAME,
    attrName: '',
    attrValue: ''
  };


  /**
   * Reset the parser
   * 
   * @private
   * @memberof AttributeParser
   */
  private reset() {
    this.state = {
      text: '',
      currentPos: 0,
      mode: 'reading-attr-name',
      attrName: '',
      attrValue: ''
    };
  }


  /**
   * Get the next character in the text string
   * 
   * @private
   * @returns {string} 
   * @memberof AttributeParser
   */
  private getNextChar(): string {
    let ch = null;
    if(this.state.currentPos < this.state.text.length) {
      ch = this.state.text.charAt(this.state.currentPos);
      this.state.currentPos++;
    }
    return ch;
  }


  /**
   * Parse the text of attributes
   * 
   * @private
   * @param {string} text 
   * @returns {{ [key: string]: any }} 
   * @memberof AttributeParser
   */
  private _parse(text: string): { [key: string]: any } {
    let attr = {};
    this.state.text = text;
    while(true) {
      let ch = this.getNextChar();
      if(ch === null) { 
        if(this.state.attrName) {
          attr[this.state.attrName] = (this.state.attrValue)
            ? this.state.attrValue : null;
        }
        break; 
      }
      if(this.state.mode === PARSER_MODES.READING_ATTR_NAME) {
        this.handleReadingAttrName(ch, attr);
      } else if(this.state.mode === PARSER_MODES.READING_ATTR_VALUE) {
        this.handleReadingAttrValue(ch, attr);
      }
    }
    return attr;
  }


  /**
   * Handle getting the next character when reading the attribute name
   * 
   * @private
   * @param {string} ch 
   * @param {any} attr 
   * @memberof AttributeParser
   */
  private handleReadingAttrName(ch: string, attr) {
    if(ch === '=') {
      // end of the attribute name
      this.state.mode = PARSER_MODES.READING_ATTR_VALUE;
    } else if(ch === '/') {
      // not an attribute, probably just an end tag, like <input />
      // do nothing
    } else if(utility.isWhitespace(ch)) {
      // possibily be an attribute without a value
      if(this.state.attrName) {
        attr[this.state.attrName] = null;
        this.state.attrName = '';
      }
    } else {
      this.state.attrName = this.state.attrName + ch;
    }
  }


  /**
   * Handle getting the next character when reading the attribute value
   * 
   * @private
   * @param {string} ch 
   * @param {any} attr 
   * @memberof AttributeParser
   */
  private handleReadingAttrValue(ch: string, attr) {
    if(utility.isWhitespace(ch)) {
      let firstCh = this.state.attrValue[0];
      let lastCh = this.state.attrValue[this.state.attrValue.length - 1];
      if((firstCh === "'" || firstCh === '"') && firstCh !== lastCh) {
        // we must be dealing with a whitespace in a string, something like
        // class="one two"
        this.state.attrValue = this.state.attrValue + ch;
      } else {
        attr[this.state.attrName] = this.state.attrValue;
        this.state.mode = PARSER_MODES.READING_ATTR_NAME;
        this.state.attrName = '';
        this.state.attrValue = '';
      }
    } else {
      this.state.attrValue = this.state.attrValue + ch;
    }
  }


  /**
   * Parse a html tag for attributes
   * 
   * @param {string} tag 
   * @returns 
   * @memberof AttributeParser
   */
  public parse(tag: string) {
    this.reset();
    let attr = {};
    let posOfFirstSpace = tag.indexOf(" ");
    let posOfGreaterThan = tag.lastIndexOf(">");
    if(posOfFirstSpace > -1 && posOfFirstSpace < posOfGreaterThan) {
      // we possibiliy have attributes
      let text = tag.substring(posOfFirstSpace, posOfGreaterThan);
      text = text.trim();
      attr = this._parse(text);
    }
    return attr;
  }


  /**
   * Reverse the output of the parse function back to a string of attributes
   * 
   * @param {{ [key: string]: any}} attributes 
   * @returns {string} 
   * @memberof AttributeParser
   */
  public reverse(attributes: { [key: string]: any}): string {
    let textAttr = '';
    for(let key in attributes) {
      if(attributes[key] === null) {
        textAttr += ' ' + key;
      } else {
        textAttr += ' ' + key + '=' + attributes[key];
      }
    }
    return textAttr.trim();
  }
}