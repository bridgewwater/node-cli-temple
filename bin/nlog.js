let chalk = require('chalk');
const _no_color = new chalk.Instance({level: 0});
let is_no_color = false;
let is_no_log_file = true;
const log4js = require('log4js');

const file = function (fileName, level) {
  if (!level) {
    level = 'debug';
  }
  log4js.configure({
    appenders: {
      'node-cli-temple': {type: 'file', filename: fileName}
    },
    categories: {
      default: {
        appenders: ['node-cli-temple'], level: level
      }
    }
  });
  is_no_log_file = false;
};

const _log_file = function () {
  return log4js.getLogger('node-cli-temple');
};

let is_verbose = false;

const open_verbose = function () {
  is_verbose = true;
};

const verbose = function () {
  return is_verbose;
};

const _log = function () {
  if (is_no_color) {
    return _no_color;
  } else {
    return chalk;
  }
};

const change_no_color = function () {
  is_no_color = true;
};

const info = function (message) {
  console.log(_log().green(message));
  if (!is_no_log_file) {
    _log_file().info(message);
  }
};

const debug = function (message) {
  if (is_verbose) {
    console.log(_log().blue(message));
    if (!is_no_log_file) {
      _log_file().debug(message);
    }
  }
};

const warning = function (message) {
  console.log(_log().keyword('orange')(message));
  if (!is_no_log_file) {
    _log_file().warn(message);
  }
};

const error = function (message) {
  console.log(_log().bold.red(message));
  if (!is_no_log_file) {
    _log_file().error(message);
  }
};

module.exports = {
  file,
  no_color: change_no_color,
  open_verbose, verbose,
  info, debug, warning, error
};