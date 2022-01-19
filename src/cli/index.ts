#!/usr/bin/env node

import commander from 'commander';

import { version } from '../../package.json';

import Command, { CommandsDescription } from './Command';
import defaultCommand from './default';
import generate from './generate';
import edit from './edit';
import publishTypes from './publishTypes';

const cli = new commander.Command();

cli
  .version(version, '-v, --version')
  .addHelpCommand()
  .allowExcessArguments(false)
  .allowUnknownOption(false);

cli
  .command(Command.DEFAULT, { hidden: true, isDefault: true })
  .description(CommandsDescription[Command.DEFAULT])
  .action(defaultCommand);

cli
  .command(Command.GENERATE)
  .description(CommandsDescription[Command.GENERATE])
  .action(generate);

cli
  .command(Command.EDIT)
  .description(CommandsDescription[Command.EDIT])
  .action(edit);

cli
  .command(Command.PUBLISH)
  .description(CommandsDescription[Command.PUBLISH])
  .action(publishTypes);

cli.parse();
