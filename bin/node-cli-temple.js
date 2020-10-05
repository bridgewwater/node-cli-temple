#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const shell = require('shelljs');

const app = require('../package.json');

program.version(app.version, '-v, --version');

program.option('-f, --force', 'force to delete', false);

program
  .command('check')
  .description('check current work dirctory')
  .option('-n, --number <number>', 'the number of safety branchs', 3)
  .action((opts) => {
    const {
      number
    } = opts;
    // checkCwd({ ...program.opts(), number });
  });

// https://github.com/duziten/neater/blob/master/bin/index.js
program.name(app.name).usage('[command] [options] ');
program.parse(process.argv);