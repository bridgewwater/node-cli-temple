let chalk = require('chalk');
const _no_color = new chalk.Instance({level: 0});
let is_no_color = false;
const log4js = require('log4js');

const _log = function () {
  if (is_no_color) {
    return _no_color;
  } else {
    return chalk;
  }
};

const _log_file = function () {
  return log4js.getLogger('nlog');
};

const change_no_color = function () {
  is_no_color = true;
};

const info = function (message) {
  console.log(_log().green(message));
  _log_file().info(message);
};

const debug = function (message) {
  console.log(_log().blue(message));
  _log_file().debug(message);
};

const warning = function (message) {
  console.log(_log().keyword('orange')(message));
  _log_file().warn(message);
};

const error = function (message) {
  console.log(_log().bold.red(message));
  _log_file().error(message);
};

const file = function (fileName, level) {
  if (!level) {
    level = 'debug';
  }
  log4js.configure({
    appenders: {nlog: {type: 'file', filename: fileName}},
    categories: {
      default: {
        appenders: ['nlog'],
        level: level
      }
    }
  });
};

module.exports = {no_color: change_no_color, info, debug, warning, error, file};