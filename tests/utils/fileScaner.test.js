const fileScanner = require('../../src/utils/fileScanner');

test('fileScanner readFileSyncAsString', () => {
  let readRes = fileScanner.readFileSyncAsString('package.json');
  expect(readRes).not.toBe(NaN);
});

test('fileScanner readFileSyncAsJson', () => {
  let packageJson = fileScanner.readFileSyncAsJson('package.json');
  expect(packageJson).not.toBe(NaN);
  expect(packageJson.scripts.test).toEqual('jest');
});

test('fileScanner readFileSyncAsYaml', () => {
  let asYaml = fileScanner.readFileSyncAsYaml('.travis.yml');
  expect(asYaml).not.toBe(NaN);
  expect(asYaml.language).toEqual('node_js');
});