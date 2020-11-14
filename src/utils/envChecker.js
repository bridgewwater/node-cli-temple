// const os = require('os');
const shell = require('shelljs');

const checkBinaryExits = function (bin_name) {
  return !!shell.which(bin_name);
};

module.exports = {
  checkBinaryExits
};