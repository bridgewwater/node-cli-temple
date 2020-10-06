let chalk = require('chalk');
const _no_color = new chalk.Instance({level: 0});
let is_no_color = false;

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
};

const debug = function (message) {
  console.log(_log().blue(message));
};

const error = function (message) {
  console.log(_log().bold.red(message));
};
const warning = function (message) {
  console.log(_log().keyword('orange')(message));
};

module.exports = {no_color: change_no_color, info, debug, warning, error};