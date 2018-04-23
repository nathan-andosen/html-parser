import { AttributeParser } from '../../src/attribute-parser';

/**
 * Attribute parser
 */
describe('Attribute parser', () => {
  let attrParser = new AttributeParser();

  /**
   * parse()
   */
  describe('parse()', () => {
    it('should parse attributes with double quotes', () => {
      let tag = '<p class="class-one" custom-attr="one two" txt="\'one\'">';
      let expectedResult = {"class":"\"class-one\"","custom-attr":"\"one two\"","txt":"\"'one'\""};
      let output = attrParser.parse(tag);
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    it('should work with single quotes', () => {
      let tag = "<span class='cls' cus-attr='one two'>";
      let expectedResult = {"class":"'cls'","cus-attr":"'one two'"};
      let output = attrParser.parse(tag);
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    it('should handle values with no quotes', () => {
      let tag = "<div show=true hide=false>";
      let expectedResult = {"show":"true","hide":"false"};
      let output = attrParser.parse(tag);
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    it('should work with attributes with no values', () => {
      let tag = "<input required cus='one' />";
      let expectedResult = {"required":null,"cus":"'one'"};
      let output = attrParser.parse(tag);
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    it('should handle no attributes', () => {
      let tag = "<div>";
      let output = attrParser.parse(tag);
      expect(JSON.stringify(output)).toEqual("{}");
      tag = "<br/>";
      output = attrParser.parse(tag);
      expect(JSON.stringify(output)).toEqual("{}");
      tag = "<br />";
      output = attrParser.parse(tag);
      expect(JSON.stringify(output)).toEqual("{}");
    });

    it('should parse complex attributes', () => {
      let attrParser = new AttributeParser();
      let tag = "<p class='abc db' aria-label=\"Easy one two\" custom=\"'text'\" val='' required custom-again=true abc-d='1'>";
      let expectedResult = {"class":"'abc db'","aria-label":"\"Easy one two\"","custom":"\"'text'\"","val":"''","required":null,"custom-again":"true","abc-d":"'1'"};
      let output = attrParser.parse(tag);
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    it('should parse attributes over different lines', () => {
      let tag = `<p class="hi"
        custom='123' required 
        cust=true >`;
      let expectedResult = {"class":"\"hi\"","custom":"'123'","required":null,"cust":"true"};
      let output = attrParser.parse(tag);
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });

    it('should parse attributes with greater than symbol in attribute text', () => {
      let tag = "<img alt='5>6' custom='d<f' />";
      let output = attrParser.parse(tag);
      let expectedResult = {"alt":"'5>6'","custom":"'d<f'"};
      expect(JSON.stringify(output)).toEqual(JSON.stringify(expectedResult));
    });
  });



  /**
   * reverse()
   */
  describe('reverse()', () => {
    it('should reverse attributes object returned from parse function', () => {
      let tag = "<p class='one two' required custom=\"hi\">";
      let expectedResult = "class='one two' required custom=\"hi\"";
      let output = attrParser.parse(tag);
      let textAttr = attrParser.reverse(output);
      expect(textAttr).toEqual(expectedResult);
    });
  });
});