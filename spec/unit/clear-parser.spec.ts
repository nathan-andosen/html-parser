import { CleanParser } from '../../src/clean-parser';
import { HtmlParser } from '../../src';
import { iCleanOptions } from '../../src/interfaces';

/**
 * CleanParser service
 */
describe('CleanParser', () => {
  let htmlParser = new HtmlParser();
  let cleanParser = new CleanParser();


  /**
   * parse()
   */
  describe('parse()', () => {
    it('should remove empty tags (basic)', () => {
      let html = "<div>hi <div><span></span></div></div>";
      let output = htmlParser.parse(html);
      output = cleanParser.parse(output, {
        removeEmptyTextNodes: false
      });
      let expectedResult = "<div>hi </div>";
      expect(htmlParser.reverse(output)).toEqual(expectedResult);
    });

    it('should remove empty tags', () => {
      let html = "<div>hi <span></span> there, <br /> how are you<p></p></div>";
      let output = htmlParser.parse(html);
      output = cleanParser.parse(output, {
        removeEmptyTextNodes: false
      });
      let expectedResult = "<div>hi  there, <br /> how are you</div>";
      expect(htmlParser.reverse(output)).toEqual(expectedResult);
    });

    it('should remove empty text nodes', () => {
      let html = "<div><span></span>hi<span> </span> </div>";
      let output = htmlParser.parse(html);
      output = cleanParser.parse(output, {
        removeEmptyTags: false
      });
      let expectedResult = "<div><span></span>hi<span></span></div>";
      expect(htmlParser.reverse(output)).toEqual(expectedResult);
    });
  });
});