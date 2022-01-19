import commander from 'commander';

import { version } from '../../package.json';

import Command, { CommandsDescription } from './Command';
import defaultCommand from './default';
import create from './create';
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
  .command(Command.CREATE)
  .description(CommandsDescription[Command.CREATE])
  .action(create);

cli
  .command(Command.EDIT)
  .description(CommandsDescription[Command.EDIT])
  .action(edit);

cli
  .command(Command.PUBLISH)
  .description(CommandsDescription[Command.PUBLISH])
  .action(publishTypes);

export default cli;
