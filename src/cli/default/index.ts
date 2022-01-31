import { blue } from '../../utils/colors';
import Command from '../Command';
import init from '../init';
import add from '../add';
import edit from '../edit';
import publishTypes from '../publishTypes';

import { queryCommand } from './queries';

async function defaultCommand() {
  const action = await queryCommand();

  switch (action) {
    case Command.INIT: await init();
      break;
    case Command.ADD: await add();
      break;
    case Command.EDIT: await edit();
      break;
    case Command.PUBLISH: await publishTypes();
      break;
    default: console.log(`Command ${blue(action)} not supported`);
      break;
  }
}

export default defaultCommand;
