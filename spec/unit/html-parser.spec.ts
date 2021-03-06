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

    // style tag
    it('should parse style tag', () => {
      let html = "<body><style>body > p {}</style></body>";
      let output = htmlParser.parse(html);
      let expectedResult = [{"type":"tag","tagType":"default","name":"body","attributes":{},"children":[{"type":"tag","tagType":"style","name":"style","attributes":{},"children":[{"type":"text","data":"body > p {}"}]}]}];
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    // nested tags
    it('should parse nested tags', () => {
      let html = "<div><div><p> hi<span> there</span></p></div></div>";
      let output = htmlParser.parse(html);
      let expectedResult = [{"type":"tag","tagType":"default","name":"div","attributes":{},"children":[{"type":"tag","tagType":"default","name":"div","attributes":{},"children":[{"type":"tag","tagType":"default","name":"p","attributes":{},"children":[{"type":"text","data":" hi"},{"type":"tag","tagType":"default","name":"span","attributes":{},"children":[{"type":"text","data":" there"}]}]}]}]}];
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    // tags with attributes
    it('should parse tags with attributes', () => {
      let html = "<div class='one'><input required /></div>";
      let output = htmlParser.parse(html);
      let expectedResult = [{"type":"tag","tagType":"default","name":"div","attributes":{"class":"'one'"},"children":[{"type":"tag","tagType":"empty","name":"input","attributes":{"required":null},"children":[]}]}];
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    // invliad html
    it('should pass error for invalid html', () => {
      let html = "<div><p>hi</div>";
      let errorCalled = 0;
      let output = htmlParser.parse(html, (err) => {
        errorCalled++;
      });
      expect(errorCalled).toBeGreaterThan(0);
    });

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

    // handle greater or less than symbols in attribute values
    it('should handle greater than symbol in attribute', () => {
      let html = "<img alt='5>6' custom='d<f' /><span class=d>f>hi</span>";
      let output = htmlParser.parse(html);
      let expectedResult = [{"type":"tag","tagType":"empty","name":"img","attributes":{"alt":"'5>6'","custom":"'d<f'"},"children":[]},{"type":"tag","tagType":"default","name":"span","attributes":{"class":"d"},"children":[{"type":"text","data":"f>hi"}]}];
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    // TODO: fix parser to handle this
    it('should handle quotes in attributes', () => {
      let html = "<p custom=\"This's there ' s\"><span tag='\"hi there\"'></span></p>";
      let output = htmlParser.parse(html);
      let expectedResult = [{"type":"tag","tagType":"default","name":"p","attributes":{"custom":"\"This's there ' s\""},"children":[{"type":"tag","tagType":"default","name":"span","attributes":{"tag":"'\"hi there\"'"},"children":[]}]}];
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


    it('should fire event each time a node is added', () => {
      let html = "<p class='one'>My <span>name is <strong>Nathan</strong></span></p>";
      let cnt = 0;
      let output = htmlParser.parse(html, null, (node, parentNode) => {
        cnt++;
      });
      expect(cnt).toEqual(6);
    });
  });




  /**
   * reverse()
   */
  describe('reverse()', () => {
    it('should reverse output from the parse function back into html', () => {
      let html = "<div class='one'><p>hi <span>there</span></p><br /></div>";
      let output = htmlParser.parse(html);
      let reversedHtml = htmlParser.reverse(output);
      expect(reversedHtml).toEqual(html);
    });

    it('should fire event each time a node is stringified', () => {
      let html = "<p class='one'>My <span>name is <strong>Nathan</strong></span></p>";
      let output = htmlParser.parse(html);
      let newHtml = htmlParser.reverse(output, (node) => {
        if(node.name === 'p') {
          node.attributes['class'] = "'onne'";
        }
      });
      expect(newHtml).toEqual("<p class='onne'>My <span>name is <strong>Nathan</strong></span></p>");
    });
  });



  /**
   * clean()
   */
  describe('clean()', () => {
    it('should clean and remove unwanted html', () => {
      let html = "<div>\n<p>\n</p><p> Hello</p>\n <div><span></span>\n</div>\n<div>hi <br><span></span>\n</div><div><p><span> </span></p></div></div>";
      let output = htmlParser.parse(html);
      output = htmlParser.clean(output);
      let expectedResult = "<div><p> Hello</p><div>hi <br /></div></div>";
      expect(htmlParser.reverse(output)).toEqual(expectedResult);
    });
  });
});