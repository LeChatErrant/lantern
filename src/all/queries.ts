import inquirer from 'inquirer';

import Commands from '../Commands';

export async function queryAction(): Promise<Commands> {
  const { action } = await inquirer.prompt([{
    name: 'action',
    type: 'list',
    message: 'What do you want to do ?',
    choices: Object.values(Commands),
  }]);

  return action;
}
