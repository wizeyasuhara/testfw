import { isMatch } from '../route';

describe('route module', () => {
  describe('isMatch', () => {
    test('指定配下のパスはすべてマッチする', () => {
      expect(isMatch('/experts', '/experts')).toBe(true);
    });
  });
});
