const fs = require('fs');
const fs_path = require('path');
const nlog = require('./nlog');
const lodash = require('lodash');
const YAML = require('yamljs');

const appendFileSync = function (path, content) {
  if (lodash.isEmpty(path)) {
    nlog.error(`append sync file: ${path} , err: path is empty`);
    return false;
  }
  if (lodash.isEmpty(content)) {
    nlog.error(`append sync file: ${path} , err: content is empty`);
    return false;
  }
  let absPath = fs_path.resolve(path);
  if (!fs.existsSync(absPath)) {
    nlog.error(`append sync file: ${absPath} , err: path not exist`);
    return false;
  }
  try {
    nlog.debug(`start append sync file: ${absPath}`);
    fs.appendFileSync(absPath, content);
    nlog.debug(`finish append sync file: ${absPath}`);
    return true;
  } catch (e) {
    let errMsg = `write file: ${absPath} err: ${e}`;
    nlog.error(errMsg);
    return false;
  }
};

const readFileSyncAsString = function (path, encoding = 'utf-8') {
  if (lodash.isEmpty(path)) {
    nlog.error(`read sync file as string: ${path} , err: path is empty`);
    return false;
  }
  let absPath = fs_path.resolve(path);
  if (!fs.existsSync(absPath)) {
    nlog.error(`read sync file as string: ${absPath} , err: path not exist`);
    return false;
  }
  try {
    nlog.debug(`start read sync file as string: ${absPath}`);
    let readFileSync = fs.readFileSync(absPath, {encoding: encoding, flag: 'r'});
    let res = readFileSync.toString(encoding);
    nlog.debug(`finish read sync file as string: ${absPath}`);
    return res;
  } catch (e) {
    let errMsg = `read sync file as string: ${absPath} err: ${e}`;
    nlog.error(errMsg);
    return '';
  }
};

const readFileSyncAsJson = function (path, encoding = 'utf-8') {
  if (lodash.isEmpty(path)) {
    nlog.error(`read sync file as json: ${path} , err: path is empty`);
    return false;
  }
  let absPath = fs_path.resolve(path);
  if (!fs.existsSync(absPath)) {
    nlog.error(`read sync file as json: ${absPath} , err: path not exist`);
    return false;
  }
  try {
    nlog.debug(`start read sync file as json: ${absPath}`);
    let readFileSync = fs.readFileSync(absPath, {encoding: encoding, flag: 'r'});
    let parse = JSON.parse(readFileSync.toString(encoding));
    nlog.debug(`finish read sync file as json: ${absPath}`);
    return parse;
  } catch (e) {
    let errMsg = `read sync file as json: ${absPath} err: ${e}`;
    nlog.error(errMsg);
    return {};
  }
};

const readFileSyncAsYaml = function (path, encoding = 'utf-8') {
  if (lodash.isEmpty(path)) {
    nlog.error(`read sync file as yaml: ${path} , err: path is empty`);
    return false;
  }
  let absPath = fs_path.resolve(path);
  if (!fs.existsSync(absPath)) {
    nlog.error(`read sync file as yaml: ${absPath} , err: path not exist`);
    return false;
  }
  try {
    nlog.debug(`start read sync file as yaml: ${absPath}`);
    let readFileSync = fs.readFileSync(absPath, {encoding: encoding, flag: 'r'});
    let parse = YAML.parse(readFileSync.toString(encoding));
    nlog.debug(`finish read sync file as yaml: ${absPath}`);
    return parse;
  } catch (e) {
    let errMsg = `read sync file as yaml: ${absPath} err: ${e}`;
    nlog.error(errMsg);
    return {};
  }
};

const writeFileAsync = function (path, content, callback) {
  if (lodash.isEmpty(path)) {
    let errMsg = `write sync path: ${path} , err: path is empty`;
    nlog.error(errMsg);
    callback.onError(errMsg, Error(errMsg));
    return false;
  }
  if (lodash.isEmpty(content)) {
    let errMsg = `write sync path: ${path} , err: content is empty`;
    nlog.error(errMsg);
    callback.onError(errMsg, Error(errMsg));
    return false;
  }
  try {
    let absPath = fs_path.resolve(path);
    let dirname = fs_path.dirname(absPath);
    if (!fs.existsSync(dirname)) {
      nlog.debug(`write async file dirname not exist : ${dirname} , just create`);
      fs_path.mkdir(dirname, function (err) {
        if (err) {
          let errMsg = `write file: ${absPath} err: ${err}`;
          nlog.error(errMsg);
          callback.onError(errMsg, err);
        }
      });
    }
    nlog.debug(`start write async file: ${absPath}`);
    fs.writeFile(absPath, content, function (err) {
      if (err) {
        let errMsg = `write file: ${absPath} err: ${err}`;
        nlog.error(errMsg);
        callback.onError(errMsg, err);
      } else {
        callback.onfinish(`write file finish at: ${absPath}`);
        nlog.debug(`finish write async file: ${absPath}`);
      }
    });
  } catch (e) {
    let errMsg = `write file: ${path} err: ${e}`;
    nlog.error(errMsg);
    callback.onError(errMsg, e);
  }
};

const writeFileSync = function (path, content) {
  try {
    if (lodash.isEmpty(path)) {
      nlog.error(`write sync path: ${path} , err: path is empty`);
      return false;
    }
    if (lodash.isEmpty(content)) {
      nlog.error(`write sync path: ${path} , err: content is empty`);
      return false;
    }
    let absPath = fs_path.resolve(path);
    let dirname = fs_path.dirname(absPath);
    if (!fs.existsSync(dirname)) {
      nlog.debug(`write sync file dirname not exist : ${dirname} , just create`);
      fs_path.mkdir(dirname, function (err) {
        if (err) {
          let errMsg = `write file: ${absPath} err: ${err}`;
          nlog.error(errMsg);
          return false;
        }
      });
    }
    nlog.debug(`start write sync file: ${absPath}`);
    fs.writeFileSync(absPath, content);
    nlog.debug(`finish write sync file: ${absPath}`);
  } catch (e) {
    nlog.error(`write file sync path: ${path} , err: ${e}`);
  }
};

const writeJson2FileSync = function (path, json) {
  if (lodash.isEmpty(path)) {
    nlog.error(`write sync json to file: ${path} , err: path is empty`);
    return false;
  }
  if (lodash.isEmpty(json)) {
    nlog.error(`write sync json to file: ${path} , err: json is empty`);
    return false;
  }
  nlog.debug(`start write sync json to file: ${path}`);
  try {
    let stringify = JSON.stringify(json);
    return writeFileSync(path, stringify);
  } catch (e) {
    nlog.error(`write sync json to file: ${path} , err: ${e}`);
    return false;
  }
};

const writeYaml2FileSync = function (path, yaml) {
  if (lodash.isEmpty(path)) {
    nlog.error(`write sync yaml to file: ${path} , err: path is empty`);
    return false;
  }
  if (lodash.isEmpty(yaml)) {
    nlog.error(`write sync yaml to file: ${path} , err: yaml is empty`);
    return false;
  }
  nlog.debug(`start write sync yaml to file: ${path}`);
  try {
    let stringify = YAML.stringify(yaml);
    return writeFileSync(path, stringify);
  } catch (e) {
    nlog.error(`write sync yaml to file: ${path} , err: ${e}`);
    return false;
  }
};


module.exports = {
  appendFileSync,
  readFileSyncAsString,
  readFileSyncAsJson,
  readFileSyncAsYaml,
  writeFileAsync,
  writeFileSync,
  writeJson2FileSync,
  writeYaml2FileSync,
};