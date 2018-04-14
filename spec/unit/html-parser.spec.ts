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

    // script tag
    it('should parse script tag', () => {
      let html = "<body><script type=\"javascript/text\">var a = ( 5 > 2) ? 3 : 3;</script></body>";
      let output = htmlParser.parse(html);
      let expectedResult = [{"type":"tag","tagType":"default","name":"body","attributes":{},"children":[{"type":"tag","tagType":"script","name":"script","attributes":{"type":"\"javascript/text\""},"children":[{"type":"text","data":"var a = ( 5 > 2) ? 3 : 3;"}]}]}];
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    // TODO: style tag

    // TODO: nested tags

    // TODO: tags with attributes

    // TODO: invliad html

    // tags in capital letter
    it('should parse tags with capital letters', () => {
      let html = "<SPAN><p>hi</P> there</SPAN>";
      let expectedResult = [{"type":"tag","tagType":"default","name":"SPAN","attributes":{},"children":[{"type":"tag","tagType":"default","name":"p","attributes":{},"children":[{"type":"text","data":"hi"}]},{"type":"text","data":" there"}]}];
      let output = htmlParser.parse(html);
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    // custom tags, like: <cust-tag>Hello</cust-tag>
    it('should parse custom tags', () => {
      let html = "<cust-tag>hello</cust-tag>";
      let output = htmlParser.parse(html);
      let expectedResult = [{"type":"tag","tagType":"default","name":"cust-tag","attributes":{},"children":[{"type":"text","data":"hello"}]}];
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    // text with < or > signs in it, like: <p> 5 > 3 </p>
    it('should parse text content that has less than or greater than symbols', () => {
      let html = "<p> 5 > 3 and 2 < 4 </p>";
      let expectedResult = [{"type":"tag","tagType":"default","name":"p","attributes":{},"children":[{"type":"text","data":" 5 > 3 and 2 < 4 "}]}];
      let output = htmlParser.parse(html);
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });


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