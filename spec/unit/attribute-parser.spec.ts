import { AttributeParser } from '../../src/attribute-parser';

describe('Attribute parser', () => {

  describe('parse()', () => {
    // class="text lbl" required spellcheck custom='10' custom-again=true
    it('should parse attributes', () => {
      let attrParser = new AttributeParser();
      let tag = "<p class='abc db' aria-label=\"Easy one two\" custom=\"'text'\" val='' required custom-again=true abc-d='1'>";
      console.log(tag);
      let output = attrParser.parse(tag);
      console.log(JSON.stringify(output, null, 2));
      let output2 = attrParser.reverse(output);
      console.log(output2);
    });

  });
});