import Commands from '../Commands';
import generate from '../generate';
import edit from '../edit';

import { queryAction } from './queries';

async function all() {
  const action = await queryAction();

  switch (action) {
    case Commands.init: console.log('Coming soon !');
      break;
    case Commands.generate: await generate();
      break;
    case Commands.edit: await edit();
      break;
    case Commands.remove: console.log('Coming soon !');
      break;
    // no default
  }
}

export default all;
