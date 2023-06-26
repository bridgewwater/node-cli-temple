const envChecker = require('../../src/utils/envChecker');

test('envChecker.test checkBinaryExits', () => {
  // mock
  let binaryExitsGit = envChecker.checkBinaryExits('git');
  // verify
  expect(binaryExitsGit).toEqual(true);

  let binaryExitsGat = envChecker.checkBinaryExits('gat');
  expect(binaryExitsGat).toEqual(false);
});
