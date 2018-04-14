

const PARSER_MODES = {
  READING_ATTR_NAME: 'reading-attr-name',
  READING_ATTR_VALUE: 'reading-attr-value'
};


export class AttributeParser {
  


  private state: any = {
    text: '',
    currentPos: 0,
    mode: PARSER_MODES.READING_ATTR_NAME,
    attrName: '',
    attrValue: ''
  };


  private isWhitespace(ch: string) {
    var tab = '\u0009';
    var noBreakSpace = '\u00A0';
    var newLine = '\n';
    var CR = '\u000D';
    var LF = '\u000A';
    return (ch === tab) || (ch === ' ') || (ch === noBreakSpace) 
      || (ch === newLine) || (ch === CR) || (ch === LF);
  }


  private reset() {
    this.state = {
      text: '',
      currentPos: 0,
      mode: 'reading-attr-name',
      attrName: '',
      attrValue: ''
    };
  }


  private getNextChar(): string {
    let ch = null;
    if(this.state.currentPos < this.state.text.length) {
      ch = this.state.text.charAt(this.state.currentPos);
      this.state.currentPos++;
    }
    return ch;
  }




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


  private handleReadingAttrName(ch: string, attr) {
    if(ch === '=') {
      // end of the attribute name
      this.state.mode = PARSER_MODES.READING_ATTR_VALUE;
    } else if(this.isWhitespace(ch)) {
      // must be an attribute without a value
      attr[this.state.attrName] = null;
      this.state.attrName = '';
    } else {
      this.state.attrName = this.state.attrName + ch;
    }
  }


  private handleReadingAttrValue(ch: string, attr) {
    if(this.isWhitespace(ch)) {
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




  parse(tag: string) {
    this.reset();
    let attr = {};
    let posOfFirstSpace = tag.indexOf(" ");
    let posOfGreaterThan = tag.indexOf(">");
    if(posOfFirstSpace > -1 && posOfFirstSpace < posOfGreaterThan) {
      // we possibiliy have attributes
      let text = tag.substring(posOfFirstSpace, posOfGreaterThan);
      text = text.trim();
      attr = this._parse(text);
    }
    return attr;
  }

}