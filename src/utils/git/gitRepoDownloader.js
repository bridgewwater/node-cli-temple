// Copyright sinlov

'use strict';
const lodash = require('lodash');
const gitURLParse = require('./gitURLParse');
const urlLib = require('url');
const format = require('string-format');
format.extend(String.prototype, {});

// eslint-disable-next-line no-undef
options.gitlabAccessToken = undefined;
// eslint-disable-next-line no-undef
options.https = false;

/**
 *
 * @param repo {string} repo name of
 * @param url {string} ${protocol}://${host}:${port}/${group}/${repo}#${hash}
 * @param options
 * @returns {string}
 */
const parseCloneCMD = function (repo, url, options) {
  if (!lodash.isEmpty(options)) {
    if (!lodash.isEmpty(options.gitlabAccessToken)) {
      let url2http = gitURLParse.url2http(url, options.https);
      let parse = urlLib.parse(url);
      if (lodash.isEmpty(parse.hash)) {
        return url2http.replace('{0}//'.format(parse.protocol),
          '{0}//oauth2:{1}@'.format(parse.protocol, options.gitlabAccessToken));
      }
      return '{0}//oauth2:{1}@{2}{3}'.format(
        parse.protocol, options.gitlabAccessToken, parse.hostname, parse.path);
    }
  }
  let split = url.split('#');
  if (split.length > 1) {
    return 'git clone {0} -b {1} --depth=1 {2}'.format(split[0], split[1], repo);
  }
};

/**
 * download by URL
 * @param repo {string} repo name of
 * @param url {string} ${protocol}://${host}:${port}/${group}/${repo}#${hash}
 * @param options
 */
const byURL = function (repo, url, options) {
  parseCloneCMD(repo, url, options);
};

module.exports = {
  parseCloneCMD: parseCloneCMD,
  byURL: byURL
};