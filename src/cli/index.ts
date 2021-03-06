import commander from 'commander';

import { version } from '../../package.json';
import { displayCLIBanner } from '../utils/display';

import Command, { CommandsDescription } from './Command';
import defaultCommand from './default';
import init from './init';
import add from './add';
import edit from './edit';
import publishTypes from './publishTypes';

const cli = new commander.Command();

cli
  .version(version, '-v, --version')
  .addHelpCommand()
  .allowExcessArguments(false)
  .allowUnknownOption(false);

cli
  .hook('preAction', () => displayCLIBanner());

cli
  .command(Command.DEFAULT, { hidden: true, isDefault: true })
  .description(CommandsDescription[Command.DEFAULT])
  .action(defaultCommand);

cli
  .command(Command.INIT)
  .description(CommandsDescription[Command.INIT])
  .action(init);

cli
  .command(Command.ADD)
  .description(CommandsDescription[Command.ADD])
  .action(add);

cli
  .command(Command.EDIT)
  .description(CommandsDescription[Command.EDIT])
  .action(edit);

cli
  .command(Command.PUBLISH)
  .description(CommandsDescription[Command.PUBLISH])
  .action(publishTypes);

export default cli;
