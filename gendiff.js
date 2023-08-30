#!/usr/bin/env node

import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1');

program
  .argument('<filepath1>')
  .argument('<filepath2>');

program
  .option('-f, --format [type]', 'output format');

program.parse();
