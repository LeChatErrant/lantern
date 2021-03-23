#!/usr/bin/env node

import commander from 'commander';

import { version } from '../package.json';

import Commands from './Commands';
import all from './all';
import generate from './generate';
import edit from './edit';

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

cli
  .command('edit')
  .description(Commands.edit)
  .action(edit);

cli.parse();
