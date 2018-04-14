import {
  HtmlParser,
  ELEMENT_TYPES,
  iHtmlElement
} from '../../src';

/**
 * HtmlParser
 */
describe('HtmlParser', () => {
  let htmlParser = new HtmlParser();

  /**
   * parse()
   */
  describe('parse()', () => {
    
    // plain text
    it('should parse plain text', () => {
      let html = "plain text ";
      let expectedResult = [{"type":"text","data":"plain text "}];
      let output = htmlParser.parse(html);
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    // plain text with tag
    it('should parse plain text with tag', () => {
      let html = "plain text <br />";
      let expectedResult = [{"type":"text","data":"plain text "},{"type":"tag","tagType":"empty","name":"br","attributes":{},"children":[]}];
      let output = htmlParser.parse(html);
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    // html comment
    it('should handle html comment', () => {
      let html = "<div><!--This is not seen-->Hello world!</div>";
      let expectedResult = [{"type":"tag","tagType":"default","name":"div","attributes":{},"children":[{"type":"comment","data":"This is not seen"},{"type":"text","data":"Hello world!"}]}];
      let output = htmlParser.parse(html);
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    // TODO: script tag

    // TODO: style tag

    // TODO: nested tags

    // TODO: tags with attributes

    // TODO: invliad html

    // TODO: tags in capital letter



    it('should parse tag split over lines', () => {
      let html = `hi
<p
  class="one">
  a paragraph
</p>`;
      let expectedResult = [{"type":"text","data":"hi\n"},{"type":"tag","tagType":"default","name":"p","attributes":{"class":"\"one\""},"children":[{"type":"text","data":"\n  a paragraph\n"}]}];
      let output = htmlParser.parse(html);
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });
  });
});