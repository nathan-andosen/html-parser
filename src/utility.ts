/**
 * Utility class
 * 
 * @export
 * @class Utility
 */
export class Utility {

  /**
   * Remove all white space from text
   * 
   * @param {string} text 
   * @returns 
   * @memberof Utility
   */
  public removeWhitespace(text: string) {
    var tab = '\u0009';
    var noBreakSpace = '\u00A0';
    var newLine = '\n';
    var CR = '\u000D';
    var LF = '\u000A';

    text = text.trim();
    text = text.split(' ').join("");
    text = text.split(tab).join("");
    text = text.split(noBreakSpace).join("");
    text = text.split(newLine).join("");
    text = text.split(CR).join("");
    text = text.split(LF).join("");
    return text;
  }


  /**
   * Determine if a character is a letter
   * 
   * @param {string} ch 
   * @returns {boolean} 
   * @memberof Utility
   */
  public isLetter(ch: string): boolean {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
  }

  /**
   * Determine if the two characters are the start a html tag. HTML tags
   * must start like <a <b 
   * 
   * @param {string} ch 
   * @param {string} nextCh 
   * @returns {boolean} 
   * @memberof Utility
   */
  public isStartOfTag(ch: string, nextCh: string): boolean {
    if(!ch || !nextCh) { return false; }
    return (ch === "<" && this.isLetter(nextCh));
  }


  /**
   * Determine if the two characters are the end of a html tag./
   * 
   * @param {string} ch 
   * @param {string} nextCh 
   * @returns {boolean} 
   * @memberof Utility
   */
  public isEndOfTag(ch: string, nextCh: string): boolean {
    if(!ch || !nextCh) { return false; }
    return (ch === "<" && nextCh === "/");
  }


  /**
   * Determine if its the start of a html comment
   * 
   * @param {string} text 
   * @returns {boolean} 
   * @memberof Utility
   */
  public isStartOfComment(text: string): boolean {
    return (text.indexOf('<!--') === 0);
  }
}

// export as singleton
let utility = new Utility();
export { utility };