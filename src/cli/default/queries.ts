import inquirer from 'inquirer';

import Command, { CommandsDescription } from '../Command';

export async function queryCommand(): Promise<Command> {
  const { action } = await inquirer.prompt([{
    name: 'action',
    type: 'list',
    message: 'How can I help you?',
    choices: Object
      .values(Command)
      .filter((command: Command) => command !== Command.DEFAULT)
      .map((command: Command) => ({
        name: CommandsDescription[command],
        value: command,
      })),
  }]);

  return action;
}
