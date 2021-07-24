// const os = require('os');
const shell = require('shelljs');

/**
 * check CLI can use as binary
 * @param bin_name
 * @returns {boolean}
 */
const checkBinaryExits = function (bin_name) {
  return !!shell.which(bin_name);
};

module.exports = {
  checkBinaryExits
};