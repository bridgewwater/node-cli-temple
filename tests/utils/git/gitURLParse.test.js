const gitURLParse = require('../../../src/utils/git/gitURLParse');

const test_http_url = 'https://github.com/python/python-tools.git#v1.0.0';
const test_git_url = 'git@github.com:python/python-tools.git#v1.0.0';
const test_ssh_url = 'ssh://git@github.com/python/python-tools.git#v1.0.0';

const test_http_port_url = 'https://github.com:443/python/python-tools.git#v1.0.0';
const test_git_port_url = 'git@github.com:443:python/python-tools.git#v1.0.0';
const test_ssh_port_url = 'ssh://git@github.com:443/python/python-tools.git#v1.0.0';

test('gitURLParse.test url2http', () => {
  // mock
  let urlGit2http = gitURLParse.url2http(test_git_url, true);
  // console.log('urlGit2http', urlGit2http);
  // verify
  expect(urlGit2http).not.toBe(null);
  expect(urlGit2http).toEqual(test_http_url);
  let urlSSH2http = gitURLParse.url2http(test_ssh_url, true);
  expect(urlSSH2http).toEqual(test_http_url);
  
  let urlGitPort2http = gitURLParse.url2http(test_git_port_url, true);
  expect(urlGitPort2http).toEqual(test_http_port_url);
  
  let urlSSHPort2http = gitURLParse.url2http(test_ssh_port_url, true);
  expect(urlSSHPort2http).toEqual(test_http_port_url);
});

test('gitURLParse.test url2ssh', () => {
  // mock
  let urlGit2ssh = gitURLParse.url2ssh(test_git_url);
  let urlGitPort2ssh = gitURLParse.url2ssh(test_git_port_url);
  let urlHttp2ssh = gitURLParse.url2ssh(test_http_url);
  let urlHttpPort2ssh = gitURLParse.url2ssh(test_http_port_url);
  // verify
  expect(urlGit2ssh).toEqual(test_ssh_url);
  expect(urlGitPort2ssh).toEqual(test_ssh_port_url);
  expect(urlHttp2ssh).toEqual(test_ssh_url);
  expect(urlHttpPort2ssh).toEqual(test_ssh_port_url);
});