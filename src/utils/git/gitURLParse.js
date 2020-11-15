const format = require('string-format');
format.extend(String.prototype, {});
const urlLib = require('url');

const url2http = function (url, https = false) {
  if (typeof url !== 'string') {
    throw new Error('url not string');
  }
  if (url.startsWith('git@')) {
    let split = url.split(':');
    if (split.length > 1) {
      let head = split[0].replace('git@', 'ssh://git@');
      if (split.length === 2) {
        url = '{0}/{1}'.format(head, split[1]);
      }
      if (split.length > 2) {
        url = '{0}:{1}/{2}'.format(head, split[1], split[2]);
      }
    }
  }
  let parse = urlLib.parse(url);
  let out_scheme = https ? 'https' : 'http';
  // console.log('parse', parse, 'out_scheme', out_scheme);
  if (parse.protocol === 'ssh:') {
    if (!parse.port) {
      return '{0}://{1}{2}{3}'.format(
        out_scheme, parse.hostname, parse.path, !parse.hash ? '' : parse.hash);
    }
    return '{0}://{1}:{2}{3}{4}'.format(
      out_scheme, parse.hostname, parse.port, parse.path,
      !parse.hash ? '' : parse.hash);
  }
  return url;
};

const url2ssh = function (url) {
  if (typeof url !== 'string') {
    throw new Error('url not string');
  }
  if (url.startsWith('git@')) {
    let split = url.split(':');
    if (split.length > 1) {
      let head = split[0].replace('git@', 'ssh://git@');
      if (split.length === 2) {
        return '{0}/{1}'.format(head, split[1]);
      }
      if (split.length > 2) {
        return '{0}:{1}/{2}'.format(head, split[1], split[2]);
      }
    }
  }
  let parse = urlLib.parse(url);
  if (parse.protocol === 'https:' || parse.protocol === 'http:') {
    if (!parse.port) {
      return '{0}://{1}@{2}{3}{4}'.format(
        'ssh', 'git', parse.hostname, parse.path, !parse.hash ? '' : parse.hash);
    }
    return '{0}://{1}@{2}:{3}{4}{5}'.format(
      'ssh', 'git', parse.hostname, parse.port, parse.path, !parse.hash ? '' : parse.hash);
  }
};

module.exports = {
  url2http,
  url2ssh
};