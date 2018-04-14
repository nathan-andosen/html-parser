import { utility } from '../../src/utility';
/**
 * Utility
 */
describe('Utility', () => {
  /**
   * removeWhitespace()
   */
  describe('removeWhitespace()', () => {
    it('should remove all white space', () => {
      let text = utility.removeWhitespace(" nathan\n");
      expect(text).toEqual("nathan");
      text = utility.removeWhitespace(" \u000D\u000Anathan\n");
      expect(text).toEqual("nathan");
      text = utility.removeWhitespace(" \u000D\u000Anat han\n");
      expect(text).toEqual("nathan");
    });
  });
});