#!/usr/bin/env node

import clui from 'clui';
import clear from 'clear';
import figlet from 'figlet';
import chalk from 'chalk';
import { Command } from 'commander';

import { version } from '../package.json';

import generate from './generate';
import all from './all';

const cli = new Command();

cli
  .version(version, '-v, --version')
  .addHelpCommand()
  .allowExcessArguments(false)
  .allowUnknownOption(false);

cli
  .command('default', { hidden: true, isDefault: true })
  .description('List available commands')
  .action(all);

cli
  .command('generate')
  .description('Generate a new API resource')
  .action(generate);

cli.parse();
