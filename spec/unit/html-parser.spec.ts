import {
  HtmlParser,
  ELEMENT_TYPES,
  iHtmlElement
} from '../../src';

/**
 * HtmlParser
 */
describe('HtmlParser', () => {

  /**
   * parse()
   */
  describe('parse()', () => {
    
    // // plain text
    // it('should parse plain text', () => {
    //   let html = "plain text ";
    //   let htmlParser = new HtmlParser();
    //   let output = htmlParser.parse(html);
    //   expect(output[0].type).toEqual(ELEMENT_TYPES.TEXT);
    //   expect(output[0].data).toEqual("plain text ");
    //   console.log(JSON.stringify(output, null, 2));
    // });

    // // plain text with tag
    // it('should parse plain text with tag', () => {
    //   let html = "plain text <br />";
    //   let htmlParser = new HtmlParser();
    //   let output = htmlParser.parse(html);
    //   expect(output[0].type).toEqual(ELEMENT_TYPES.TEXT);
    //   expect(output[0].data).toEqual("plain text ");
    //   expect(output[1].name).toEqual("br");
    //   console.log(JSON.stringify(output, null, 2));
    // });

    // <p>basic</p>
    fit('should parse basic tag', () => {
      let html = "<p class='a'>hi <!-- comment --><br></p>";
      // let html = "<p>hi <span>there</span></p> bye";
      // let html = "<body><p>hi</p><script type=\"text/javascript\">var a = '<div></div>';</script></body>";
      // let html = "<p><!-- This is a comment -->Hello world!</p>";
      console.log(html);
      let htmlParser = new HtmlParser();
      let output = htmlParser.parse(html);
      console.log(JSON.stringify(output, null, 2));
      let htmlOutput = htmlParser.reverse(output);
      console.log(htmlOutput);
    });
  });
});