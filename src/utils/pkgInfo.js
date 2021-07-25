// Copyright sinlov


const pkgInfo = require('../../package.json');

let cacheBinName = '';
const binName = () => {
  if (!cacheBinName || cacheBinName === '') {
    cacheBinName = Object.keys(pkgInfo.bin)[0];
  }
  return cacheBinName;
};

module.exports = {
  pkgInfo,
  binName
};
