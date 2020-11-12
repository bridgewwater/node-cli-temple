const semver = require('semver');

test('semver.test valid', () => {
  let baseVersion = semver.valid('1.2.3');
  // console.log('baseVersion', baseVersion);
  expect(baseVersion).not.toBe(null);
  expect(baseVersion).toEqual('1.2.3');
  let errorVersion = semver.valid('a.b.c');
  expect(errorVersion).toBe(null);
});

// https://www.npmjs.com/package/semver#clean
test('semver.test clean', () => {
  let cleanVersion = semver.clean('  =v1.2.3   ');
  expect(cleanVersion).toEqual('1.2.3');
  let cleanLoose = semver.clean(' = v 2.1.5foo', {loose: true});
  expect(cleanLoose).toEqual('2.1.5-foo');
  let cleanNoLoose = semver.clean(' = v 2.1.5-foo');
  expect(cleanNoLoose).toEqual(null);
  let cleanSpace = semver.clean(' 2.1.5 ');
  expect(cleanSpace).toEqual('2.1.5');
  let cleanRange = semver.clean('~1.0.0');
  expect(cleanRange).toEqual(null);
  let cleanRangeLoose = semver.clean('~1.0.0', {loose: true});
  expect(cleanRangeLoose).toEqual(null);
});

test('semver.test inc', () => {
  // mock
  let incPreMajor = semver.inc('1.2.3', 'premajor', 'alpha');
  expect(incPreMajor).toEqual('2.0.0-alpha.0');
  let incMajor = semver.inc('1.2.3', 'major', 'alpha');
  expect(incMajor).toEqual('2.0.0');
  
  let incPreMinor = semver.inc('1.2.3', 'preminor', 'alpha');
  expect(incPreMinor).toEqual('1.3.0-alpha.0');
  let incMinor = semver.inc('1.2.3', 'minor', 'alpha');
  expect(incMinor).toEqual('1.3.0');
  
  let incPrePatch = semver.inc('1.2.3', 'prepatch', 'alpha');
  expect(incPrePatch).toEqual('1.2.4-alpha.0');
  let incPatch = semver.inc('1.2.3', 'patch', 'alpha');
  expect(incPatch).toEqual('1.2.4');
  
  let incBeta = semver.inc('1.2.3', 'prerelease', 'beta');
  expect(incBeta).toEqual('1.2.4-beta.0');
  let incRc = semver.inc('1.2.3', 'prerelease', 'rc');
  expect(incRc).toEqual('1.2.4-rc.0');
  
  let incPreRc = semver.inc('1.2.3', 'pre', 'rc');
  expect(incPreRc).toEqual('1.2.3-rc.0');
  let incPreRcNext = semver.inc('1.2.3-rc.0', 'pre', 'rc');
  expect(incPreRcNext).toEqual('1.2.3-rc.1');
});

// https://www.npmjs.com/package/semver#comparison
test('server.test compare', () => {
  expect(semver.gt('1.2.3', '9.8.7')).toBe(false);
  expect(semver.lt('5.6.7', '5.6.8')).toBe(true);
});

// https://www.npmjs.com/package/semver#ranges-1
test('semver.test minVersion', () => {
  let minVersion = semver.minVersion('>=1.1.0');
  expect(minVersion.version).toEqual('1.1.0');
});

// https://www.npmjs.com/package/semver#coercion
test('semver.test coerce', () => {
  let coerceV2 = semver.valid(semver.coerce('v2'));
  expect(coerceV2).toEqual('2.0.0');
  let moreVersion = semver.valid(semver.coerce('42.8.7.9.3-alpha'));
  expect(moreVersion).toEqual('42.8.7');
});