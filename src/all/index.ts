import inquirer from 'inquirer';

import { displayCLIBanner } from '../utils';

async function all() {
  displayCLIBanner();

  const { action } = await inquirer.prompt([{
    name: 'action',
    type: 'list',
    message: 'What do you want to do ?',
    choices: [
      'Init a new project',
      'Generate an API resource',
      'Edit an API resource',
      'Remove an API resource',
    ],
  }]);
  console.log(action);
}

export default all;
