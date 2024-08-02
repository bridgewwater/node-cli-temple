const fileScanner = require('../../src/utils/fileScanner');

test('fileScanner readFileSyncAsString', () => {
  let readRes = fileScanner.readFileSyncAsString('package.json');
  expect(readRes).not.toBe(NaN);
});

test('fileScanner readFileSyncAsJson', () => {
  let packageJson = fileScanner.readFileSyncAsJson('package.json');
  expect(packageJson).not.toBe(NaN);
  expect(packageJson.scripts.test).toEqual('npx jest --ci');
});

test('fileScanner readFileSyncAsYaml', () => {
  let asYaml = fileScanner.readFileSyncAsYaml('.github/dependabot.yml');
  expect(asYaml).not.toBe(NaN);
  expect(asYaml.version).toEqual(2);
  expect(asYaml.updates).not.toBe(NaN);
  expect(asYaml.updates.length).toEqual(2);
  expect(asYaml.updates[0]['package-ecosystem']).toEqual('github-actions');
  expect(asYaml.updates[1]['package-ecosystem']).toEqual('npm');
});
