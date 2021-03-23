#!/usr/bin/env node

import clui from 'clui';
import clear from 'clear';
import figlet from 'figlet';
import chalk from 'chalk';
import commander from 'commander';

import { version } from '../package.json';

import Commands from './Commands';
import generate from './generate';
import all from './all';

const cli = new commander.Command();

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
  .description(Commands.generate)
  .action(generate);

cli.parse();
