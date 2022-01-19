import commander from 'commander';

import { version } from '../../package.json';
import logger from '../utils/logger';

import Command, { CommandsDescription } from './Command';
import defaultCommand from './default';
import create from './create';
import edit from './edit';
import publishTypes from './publishTypes';
import { displayCLIBanner } from '../utils/display';

const cli = new commander.Command();

cli
  .version(version, '-v, --version')
  .addHelpCommand()
  .option('--verbose', 'Enable all logs', false)
  .allowExcessArguments(false)
  .allowUnknownOption(false);

cli
  .hook('preAction', () => {
    const { verbose } = cli.opts();
    if (!verbose) logger.setSilent();

    displayCLIBanner();
  });

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
