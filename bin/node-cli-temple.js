#! /usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const moment = require('moment');
const shell = require('shelljs');
const nlog = require('../src/utils/nlog');
const config = require('../src/config');
const {pkgInfo, binName} = require('../src/utils/pkgInfo');

// program.version(pkgInfo.version, '--version', 'output the current version');
program
  .name(binName)
  .version(pkgInfo.version);

program.option('-v, --verbose', '[-|+] see verbose', false)
  .on('option:verbose', function () {
    nlog.open_verbose();
  });
program.option('--log', '[-|+] open log file out put', false)
  .on('option:log', function () {
    nlog.file(`logs/${binName()}-${moment(new Date(), moment.defaultFormat).format('YYYY-MM-DD-HH-mm')}.log`);
  });
program.option('-f, --force', '[-|+] force mode', false)
  .on('option:force', function () {
    config.open_force();
    nlog.warning('! now in force mode');
  });
program.option('--no-color', '[+|-] close color cli out put', false)
  .on('option:no-color', function () {
    nlog.debug('option:no-color');
    nlog.no_color();
  });

// check args input
// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
  nlog.error(`cli [ ${binName()} ] must has args, please check or use: ${binName()} --help`);
  shell.exit(1);
}

program
  .command('check')
  .description('check current work directory')
  .option('-n, --number <number>', 'the number of safety branch', 3)
  .action((opts) => {
    const {
      number
    } = opts;
    nlog.debug(`action check number ${number}`);
    // checkCwd({ ...program.opts(), number });
  });

// https://github.com/tj/commander.js
program.name(binName()).usage('[command] [options] ');
// eslint-disable-next-line no-undef
program.parse(process.argv);
