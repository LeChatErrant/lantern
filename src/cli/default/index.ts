import colors from 'colors';

import Command from '../Command';
import generate from '../generate';
import edit from '../edit';
import publishTypes from '../publishTypes';

import { queryCommand } from './queries';

async function defaultCommand() {
  const action = await queryCommand();

  switch (action) {
    case Command.INIT: console.log('Coming soon !');
      break;
    case Command.GENERATE: await generate();
      break;
    case Command.EDIT: await edit();
      break;
    case Command.PUBLISH: await publishTypes();
      break;
    default: console.log(`Command ${colors.blue(action)} not supported`);
      break;
  }
}

export default defaultCommand;
