const gitURLParse = require('../../../src/utils/git/gitURLParse');

const test_http_url = 'https://github.com/python/python-tools.git#v1.0.0';
const test_git_url = 'git@github.com:python/python-tools.git#v1.0.0';
const test_ssh_url = 'ssh://git@github.com/python/python-tools.git#v1.0.0';

test('gitURLParse.test url2http', () => {
  // mock
  let urlGit2http = gitURLParse.url2http(test_git_url, true);
  // console.log('urlGit2http', urlGit2http);
  // verify
  expect(urlGit2http).not.toBe(null);
  expect(urlGit2http).toEqual(test_http_url);
  let urlSSH2http = gitURLParse.url2http(test_ssh_url, true);
  expect(urlSSH2http).toEqual(test_http_url);
});